export interface AIStreamMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface StreamChatOptions {
  messages: AIStreamMessage[];
  locale: string;
  maxTokens?: number;
  temperature?: number;
  onDelta: (accumulatedText: string) => void;
}

/**
 * Calls /api/chat with streaming enabled and reassembles the response text,
 * invoking onDelta with the accumulated text as each chunk arrives.
 *
 * SSE events ("data: {...}" lines) can be split across two separate
 * reader.read() calls at an arbitrary byte offset - this buffers whatever's
 * left after the last complete line instead of discarding it, or partial
 * content (including multi-byte AZ/RU characters split mid-line) silently
 * disappears from the output.
 */
export async function streamChatCompletion({
  messages,
  locale,
  maxTokens = 700,
  temperature = 0.7,
  onDelta,
}: StreamChatOptions): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
      locale,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let accumulated = '';

  if (!reader) return accumulated;

  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? ''; // keep the last (possibly incomplete) line

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6);
      if (data === '[DONE]') continue;

      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          accumulated += content;
          onDelta(accumulated);
        }
      } catch {
        // Incomplete/invalid JSON for this line - skip it, buffer above
        // already protects against the common "split mid-line" case.
        continue;
      }
    }
  }

  return accumulated;
}
