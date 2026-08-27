import { NextRequest, NextResponse } from "next/server";

// Deepseek API Key - prioritize environment variables
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// IP rate limiting storage.
// NOTE: this in-memory Map only limits requests within a single serverless
// instance. On Vercel/serverless platforms each instance (and each cold
// start) has its own memory, so this does NOT provide a reliable global
// rate limit in production. For real protection, replace with a shared
// store (e.g. Upstash Redis / Vercel KV) keyed by IP.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up expired rate limit records
const cleanupRateLimit = () => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
};

// Check IP rate limit
const checkRateLimit = (ip: string): boolean => {
  cleanupRateLimit();

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10; // Maximum 10 requests per minute

  const current = rateLimitMap.get(ip);

  if (!current) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
};

type Locale = "az" | "ru";

const MESSAGES: Record<Locale, Record<string, string>> = {
  az: {
    rateLimited: "Sorğular çox tez-tez göndərilir, zəhmət olmasa bir az sonra yenidən cəhd edin.",
    configError: "AI təhlil funksiyası müvəqqəti mövcud deyil, xidməti konfiqurasiya edirik.",
    badRequest: "Sorğu məlumatının formatı yanlışdır.",
    quotaExceeded: "AI təhlil funksiyası müvəqqəti mövcud deyil, xidmət tutumunu artırırıq.",
    upstreamError: "AI xidməti müvəqqəti mövcud deyil, zəhmət olmasa bir az sonra yenidən cəhd edin.",
    internalError: "AI xidmətində daxili xəta baş verdi, zəhmət olmasa bir az sonra yenidən cəhd edin.",
    invalidMessages: "Mesajların formatı yanlışdır.",
  },
  ru: {
    rateLimited: "Слишком частые запросы, пожалуйста, повторите попытку немного позже.",
    configError: "Функция ИИ-анализа временно недоступна, мы настраиваем сервис.",
    badRequest: "Неверный формат данных запроса.",
    quotaExceeded: "Функция ИИ-анализа временно недоступна, мы увеличиваем мощность сервиса.",
    upstreamError: "Сервис ИИ временно недоступен, пожалуйста, повторите попытку немного позже.",
    internalError: "Во внутренней работе сервиса ИИ произошла ошибка, пожалуйста, повторите попытку немного позже.",
    invalidMessages: "Неверный формат сообщений.",
  },
};

function getMessages(locale: unknown): Record<string, string> {
  return locale === "ru" ? MESSAGES.ru : MESSAGES.az;
}

// Basic shape/size validation for the chat history the client sends us.
// This is not a substitute for a real rate limiter, but it stops the most
// obvious abuse of this endpoint as a free-form proxy to the upstream API.
function sanitizeMessages(rawMessages: unknown): { role: string; content: string }[] | null {
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) return null;

  const maxMessages = 20;
  const maxContentLength = 4000; // per message
  const allowedRoles = new Set(["system", "user", "assistant"]);

  const trimmed = rawMessages.slice(-maxMessages);
  const cleaned: { role: string; content: string }[] = [];

  for (const m of trimmed) {
    if (
      typeof m !== "object" ||
      m === null ||
      typeof (m as { role?: unknown }).role !== "string" ||
      typeof (m as { content?: unknown }).content !== "string"
    ) {
      return null;
    }
    const role = (m as { role: string }).role;
    const content = (m as { content: string }).content;
    if (!allowedRoles.has(role)) return null;
    if (content.length === 0) continue;
    cleaned.push({ role, content: content.slice(0, maxContentLength) });
  }

  return cleaned.length > 0 ? cleaned : null;
}

export async function POST(request: NextRequest) {
  let locale: unknown = "az";
  try {
    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0] : realIp || "unknown";

    // Check IP rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: getMessages(locale).rateLimited,
        },
        { status: 429 }
      );
    }

    // Check if API key is available
    if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === "your-api-key-here") {
      return NextResponse.json(
        {
          error: "AI service configuration error",
          message: getMessages(locale).configError,
        },
        { status: 503 }
      );
    }

    // Get message data from the request
    const requestData = await request.json();
    locale = requestData?.locale;

    // Validate request data
    const messages = sanitizeMessages(requestData.messages);
    if (!messages) {
      return NextResponse.json(
        {
          error: "Invalid request",
          message: getMessages(locale).invalidMessages,
        },
        { status: 400 }
      );
    }

    // Call Deepseek API
    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat", // fixed — do not let the client choose an arbitrary upstream model
          messages,
          temperature: typeof requestData.temperature === "number" ? requestData.temperature : 0.7,
          max_tokens: Math.min(requestData.max_tokens || 300, 500), // Limit maximum token count
          stream: requestData.stream === true, // Support streaming requests
        }),
      }
    );

    // Handle different error states
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      // Special handling for 402 payment error
      if (response.status === 402) {
        return NextResponse.json(
          {
            error: "Quota exceeded",
            message: getMessages(locale).quotaExceeded,
            details: errorData,
          },
          { status: 402 }
        );
      }

      // Handle other API errors
      return NextResponse.json(
        {
          error: `API error: ${response.status}`,
          message: getMessages(locale).upstreamError,
          details: errorData,
        },
        { status: response.status }
      );
    }

    // If it's a streaming request, return streaming response directly
    if (requestData.stream) {
      // Return streaming response
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Return API response
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: getMessages(locale).internalError,
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
