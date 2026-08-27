'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import useGetLang from '@/hooks/useGetLang';
import { streamChatCompletion } from '@/lib/aiStream';
import { ChevronDown, ChevronRight, Stethoscope } from 'lucide-react';

interface SpecialistGuidanceProps {
  questionnaireType: string;
  questionnaireResults: Record<string, unknown>;
  resultSummary?: string;
  onGuidanceChange?: (text: string) => void;
}

// Renders **bold** and *italic* spans inside a single line of text.
function renderInlineBold(line: string, keyPrefix: string) {
  const segments = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return segments.map((segment, i) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`}>{segment.slice(2, -2)}</strong>;
    }
    if (segment.startsWith('*') && segment.endsWith('*')) {
      return <em key={`${keyPrefix}-${i}`}>{segment.slice(1, -1)}</em>;
    }
    return <span key={`${keyPrefix}-${i}`}>{segment}</span>;
  });
}

// Small, dependency-free renderer for the subset of Markdown the AI
// reliably produces for this prompt: #/##/### headers, **bold**, "- " or
// "* " bullet lists, and "---" horizontal rules. Good enough to avoid
// showing raw "**", "##", "-" characters to the reader without pulling in
// a full markdown library for one feature.
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={key} className="list-disc pl-5 space-y-1 my-2">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInlineBold(item, `${key}-li-${i}`)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    const key = `l-${idx}`;

    if (line === '' ) {
      flushList(`ul-${key}`);
      return;
    }
    if (line === '---' || line === '***') {
      flushList(`ul-${key}`);
      elements.push(<hr key={key} className="my-4 border-gray-200" />);
      return;
    }
    const headerMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headerMatch) {
      flushList(`ul-${key}`);
      const level = headerMatch[1].length;
      const content = renderInlineBold(headerMatch[2], key);
      if (level === 1) elements.push(<h3 key={key} className="text-lg font-bold mt-4 mb-2">{content}</h3>);
      else if (level === 2) elements.push(<h4 key={key} className="text-base font-bold mt-4 mb-2">{content}</h4>);
      else elements.push(<h5 key={key} className="text-sm font-bold mt-3 mb-1">{content}</h5>);
      return;
    }
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      listBuffer.push(bulletMatch[1]);
      return;
    }
    const numberedMatch = line.match(/^\d+[.)]\s+(.*)$/);
    if (numberedMatch) {
      listBuffer.push(numberedMatch[1]);
      return;
    }

    flushList(`ul-${key}`);
    elements.push(
      <p key={key} className="my-1.5">
        {renderInlineBold(line, key)}
      </p>
    );
  });

  flushList('ul-end');
  return elements;
}

export function SpecialistGuidance({
  questionnaireType,
  questionnaireResults,
  resultSummary,
  onGuidanceChange,
}: SpecialistGuidanceProps) {
  const t = useScopedI18n('component.questionnaire.result.public.specialistGuidance');
  const lang = useGetLang();
  const [open, setOpen] = useState(false);
  const [guidance, setGuidance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateGuidance = async () => {
    setIsLoading(true);
    setError('');
    setGuidance('');

    // DeepSeek's "deepseek-chat" model hard-caps a single response at 4096
    // output tokens outside their (unstable) Beta API - our earlier attempt
    // to just request more (6000) got silently clamped and cut off mid-
    // sentence. Split the guidance into two sequential, independently-sized
    // requests instead, each safely under that ceiling, and concatenate.
    const summary = resultSummary || JSON.stringify(questionnaireResults);

    const part1Az = `Sən təcrübəli klinik psixoloq/psixoterapevt üçün konsultasiya dəstək köməkçisisən. Aşağıda "${questionnaireType}" anketinin nəticələri var:

${summary}

Bu nəticələrə əsaslanaraq, HƏMİN PASİENTLƏ ÜMUMİ İŞ QURULUŞU üzrə mütəxəssisə ətraflı, konkret və praktik bələdçilik ver (yalnız ilk görüş üçün deyil, bütün müalicə prosesi üçün). Yalnız aşağıdakı 3 bölməni yaz, hər birində konkret NÜMUNƏLƏR (dəqiq sual mətnləri, dəqiq təlimat cümlələri) ver, ümumi klişelərdən qaç:

1. VƏZİYYƏTİN KLİNİK ŞƏRHİ — bu nəticələr nəyi göstərir, hansı simptom klasterlərinə diqqət yetirilməlidir.
2. İLKİN QİYMƏTLƏNDİRMƏ SUALLARI — ilk 1-2 görüşdə vermək üçün 6-8 konkret açıq sual, hər birinin nə üçün soruşulduğunu bir cümlə ilə izah et.
3. MÜALICƏ ÇƏRÇİVƏSİ VƏ ÜMUMI STRUKTUR — bu profil üçün uyğun terapevtik yanaşma(lar) (məs. KBT, ACT, sxema terapiyası və s. — konkret hansı olduğunu de və niyə), tipik sessiya sayı/tezliyi, mərhələlərin qısa xəritəsi.

Cavabı Azərbaycan dilində, başlıqlarla struktur olaraq ver. Bu 3 bölmədən sonra DAYAN, sonrakı bölmələri yazma.`;

    const part2Az = `Eyni "${questionnaireType}" anketinin nəticələrinə (${summary}) əsaslanaraq, indi YALNIZ aşağıdakı 4 bölməni yaz, konkret NÜMUNƏLƏRLƏ, ümumi klişelərdən qaçaraq:

4. KONKRET TEXNİKALAR (ən azı 4-5 texnika) — hər texnika üçün: (a) adı, (b) NECƏ tətbiq olunur — addım-addım, (c) NİYƏ məhz bu pasient profili üçün uyğundur, (d) sessiyada istifadə oluna biləcək konkret nümunə dialoq və ya tapşırıq mətni.
5. SESSIYALARARASI TAPŞIRIQLAR (ev tapşırığı) — 3-4 konkret nümunə, hər birinin məqsədi ilə.
6. RİSK ƏLAMƏTLƏRİ VƏ İZLƏMƏ — bu profildə xüsusilə diqqət ediləcək xəbərdarlıq işarələri, hansı hallarda təcili müdaxilə və ya başqa mütəxəssisə (psixiatr və s.) yönləndirmə lazımdır.
7. PROQRESİN QİYMƏTLƏNDİRİLMƏSİ — irəliləyişi necə ölçmək (məs. hansı alt-şkalalar, nə vaxt təkrar test).

Cavabı Azərbaycan dilində, başlıqlarla struktur olaraq, konkret və tətbiq edilə bilən şəkildə ver. Bu, klinik qərarı əvəz etmir — mütəxəssisin öz mühakiməsi əsasdır, sən yalnız işlək çərçivə və nümunələr təqdim edirsən.`;

    const part1Ru = `Ты ассистент поддержки консультаций для опытного клинического психолога/психотерапевта. Ниже приведены результаты опросника "${questionnaireType}":

${summary}

На основе этих результатов дай специалисту подробное, конкретное и практическое руководство по ОБЩЕЙ РАБОТЕ С ЭТИМ ПАЦИЕНТОМ (не только про первую встречу, а про весь процесс работы). Напиши ТОЛЬКО следующие 3 раздела, в каждом приводи конкретные ПРИМЕРЫ (точные формулировки вопросов, точные фразы инструкций), избегай общих клише:

1. КЛИНИЧЕСКАЯ ИНТЕРПРЕТАЦИЯ — что показывают эти результаты, на какие кластеры симптомов обратить внимание.
2. ВОПРОСЫ ДЛЯ ПЕРВИЧНОЙ ОЦЕНКИ — 6-8 конкретных открытых вопросов для первых 1-2 встреч, с однострочным объяснением цели каждого.
3. РАМКА ТЕРАПИИ И ОБЩАЯ СТРУКТУРА — подходящий терапевтический подход(ы) для этого профиля (например, КПТ, ACT, схема-терапия и т.д. — укажи конкретно какой и почему), типичное количество/частота сессий, краткая карта этапов.

Дай ответ на русском языке, структурированно по заголовкам. После этих 3 разделов ОСТАНОВИСЬ, не пиши следующие разделы.`;

    const part2Ru = `На основе результатов того же опросника "${questionnaireType}" (${summary}), теперь напиши ТОЛЬКО следующие 4 раздела, с конкретными ПРИМЕРАМИ, избегая общих клише:

4. КОНКРЕТНЫЕ ТЕХНИКИ (минимум 4-5) — для каждой техники: (а) название, (б) КАК применять — пошагово, (в) ПОЧЕМУ подходит именно этому профилю, (г) конкретный пример диалога или задания для сессии.
5. МЕЖСЕССИОННЫЕ ЗАДАНИЯ (домашние задания) — 3-4 конкретных примера с целью каждого.
6. ПРИЗНАКИ РИСКА И МОНИТОРИНГ — на что особенно обратить внимание при этом профиле, когда нужно экстренное вмешательство или направление к другому специалисту (психиатру и т.д.).
7. ОЦЕНКА ПРОГРЕССА — как измерять динамику (какие подшкалы, когда повторное тестирование).

Дай ответ на русском языке, структурированно по заголовкам, конкретно и применимо на практике. Это не заменяет клиническое решение — суждение специалиста первично, ты лишь даёшь рабочую основу и примеры.`;

    try {
      let combined = '';

      await streamChatCompletion({
        messages: [{ role: 'system', content: lang === 'ru' ? part1Ru : part1Az }],
        locale: lang,
        maxTokens: 3800,
        onDelta: (text) => {
          combined = text;
          setGuidance(combined);
          onGuidanceChange?.(combined);
        },
      });

      combined += '\n\n';

      await streamChatCompletion({
        messages: [{ role: 'system', content: lang === 'ru' ? part2Ru : part2Az }],
        locale: lang,
        maxTokens: 3800,
        onDelta: (text) => {
          const full = combined + text;
          setGuidance(full);
          onGuidanceChange?.(full);
        },
      });
    } catch (err) {
      console.error('Error generating specialist guidance:', err);
      setError(t('errorMessage'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-amber-300 rounded-lg bg-amber-50/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 p-4 text-left hover:bg-amber-100/50 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2 font-medium text-amber-900">
          <Stethoscope className="w-4 h-4 shrink-0" />
          {t('sectionTitle')}
        </span>
        {open ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
      </button>

      {open && (
        <div className="p-4 pt-0 space-y-3">
          <p className="text-xs text-amber-800 bg-amber-100 border border-amber-200 rounded-md p-2">
            {t('disclaimer')}
          </p>

          {!guidance && !isLoading && (
            <Button onClick={generateGuidance} className="w-full sm:w-auto">
              {t('generateButton')}
            </Button>
          )}

          {isLoading && !guidance && (
            <p className="text-sm text-gray-500">{t('loadingMessage')}</p>
          )}

          {guidance && (
            <div className="text-sm text-gray-800 bg-white border rounded-lg p-4">
              {renderMarkdown(guidance)}
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          {guidance && !isLoading && (
            <Button variant="outline" size="sm" onClick={generateGuidance}>
              {t('regenerateButton')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
