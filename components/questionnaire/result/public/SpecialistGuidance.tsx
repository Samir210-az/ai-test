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
    // output tokens outside their (unstable) Beta API. Two parts (1-3, then
    // 4-7) still weren't enough - section 4 (4-5 techniques with detailed
    // steps + example dialogue) alone eats most of a 3800-token budget.
    // Split into four smaller, independently-sized requests instead, each
    // covering less ground, and concatenate the streamed results.
    const summary = resultSummary || JSON.stringify(questionnaireResults);

    const sectionsAz = [
      `Sən təcrübəli klinik psixoloq/psixoterapevt üçün konsultasiya dəstək köməkçisisən. Aşağıda "${questionnaireType}" anketinin nəticələri var:\n\n${summary}\n\nBu nəticələrə əsaslanaraq, HƏMİN PASİENTLƏ ÜMUMİ İŞ QURULUŞU üzrə mütəxəssisə ətraflı, konkret və praktik bələdçilik ver (yalnız ilk görüş üçün deyil, bütün müalicə prosesi üçün). Yalnız aşağıdakı 2 bölməni yaz, konkret NÜMUNƏLƏR (dəqiq sual mətnləri) ver, ümumi klişelərdən qaç:\n\n1. VƏZİYYƏTİN KLİNİK ŞƏRHİ — bu nəticələr nəyi göstərir, hansı simptom klasterlərinə diqqət yetirilməlidir.\n2. İLKİN QİYMƏTLƏNDİRMƏ SUALLARI — ilk 1-2 görüşdə vermək üçün 6-8 konkret açıq sual, hər birinin nə üçün soruşulduğunu bir cümlə ilə izah et.\n\nCavabı Azərbaycan dilində, başlıqlarla struktur olaraq ver. Bu 2 bölmədən sonra DAYAN, sonrakı bölmələri yazma.`,

      `Eyni "${questionnaireType}" anketinin nəticələrinə (${summary}) əsaslanaraq, indi YALNIZ aşağıdakı bölməni yaz:\n\n3. MÜALICƏ ÇƏRÇİVƏSİ VƏ ÜMUMİ STRUKTUR — bu profil üçün uyğun terapevtik yanaşma(lar) (məs. KBT, ACT, sxema terapiyası və s. — konkret hansı olduğunu de və niyə), tipik sessiya sayı/tezliyi, mərhələlərin qısa xəritəsi (məs. 1-3-cü sessiyalar nəyə fokuslanır, 4-8-ci sessiyalar nəyə və s.).\n\nCavabı Azərbaycan dilində, "3." başlığı ilə başla. Yalnız bu bölməni yaz, başqasını yazma.`,

      `Eyni "${questionnaireType}" anketinin nəticələrinə (${summary}) əsaslanaraq, indi YALNIZ aşağıdakı bölməni yaz:\n\n4. KONKRET TEXNİKALAR (ən azı 4-5 texnika) — hər texnika üçün: (a) adı, (b) NECƏ tətbiq olunur — addım-addım, (c) NİYƏ məhz bu pasient profili üçün uyğundur, (d) sessiyada istifadə oluna biləcək konkret nümunə dialoq və ya tapşırıq mətni.\n\nCavabı Azərbaycan dilində, "4." başlığı ilə başla. Yalnız bu bölməni yaz, başqasını yazma.`,

      `Eyni "${questionnaireType}" anketinin nəticələrinə (${summary}) əsaslanaraq, indi YALNIZ aşağıdakı 3 bölməni yaz, konkret nümunələrlə:\n\n5. SESSIYALARARASI TAPŞIRIQLAR (ev tapşırığı) — 3-4 konkret nümunə, hər birinin məqsədi ilə.\n6. RİSK ƏLAMƏTLƏRİ VƏ İZLƏMƏ — bu profildə xüsusilə diqqət ediləcək xəbərdarlıq işarələri, hansı hallarda təcili müdaxilə və ya başqa mütəxəssisə (psixiatr və s.) yönləndirmə lazımdır.\n7. PROQRESİN QİYMƏTLƏNDİRİLMƏSİ — irəliləyişi necə ölçmək (məs. hansı alt-şkalalar, nə vaxt təkrar test).\n\nCavabı Azərbaycan dilində, başlıqlarla struktur olaraq ver. Sonunda: "Bu, klinik qərarı əvəz etmir — mütəxəssisin öz mühakiməsi əsasdır, bu yalnız işlək çərçivə və nümunələr təqdim edir." cümləsini əlavə et.`,
    ];

    const sectionsRu = [
      `Ты ассистент поддержки консультаций для опытного клинического психолога/психотерапевта. Ниже приведены результаты опросника "${questionnaireType}":\n\n${summary}\n\nНа основе этих результатов дай специалисту подробное, конкретное и практическое руководство по ОБЩЕЙ РАБОТЕ С ЭТИМ ПАЦИЕНТОМ (не только про первую встречу, а про весь процесс работы). Напиши ТОЛЬКО следующие 2 раздела, с конкретными ПРИМЕРАМИ (точные формулировки вопросов), избегай общих клише:\n\n1. КЛИНИЧЕСКАЯ ИНТЕРПРЕТАЦИЯ — что показывают эти результаты, на какие кластеры симптомов обратить внимание.\n2. ВОПРОСЫ ДЛЯ ПЕРВИЧНОЙ ОЦЕНКИ — 6-8 конкретных открытых вопросов для первых 1-2 встреч, с однострочным объяснением цели каждого.\n\nДай ответ на русском языке, структурированно по заголовкам. После этих 2 разделов ОСТАНОВИСЬ, не пиши следующие разделы.`,

      `На основе результатов того же опросника "${questionnaireType}" (${summary}), теперь напиши ТОЛЬКО следующий раздел:\n\n3. РАМКА ТЕРАПИИ И ОБЩАЯ СТРУКТУРА — подходящий терапевтический подход(ы) для этого профиля (например, КПТ, ACT, схема-терапия и т.д. — укажи конкретно какой и почему), типичное количество/частота сессий, краткая карта этапов.\n\nОтветь на русском языке, начни с заголовка "3.". Напиши только этот раздел, ничего больше.`,

      `На основе результатов того же опросника "${questionnaireType}" (${summary}), теперь напиши ТОЛЬКО следующий раздел:\n\n4. КОНКРЕТНЫЕ ТЕХНИКИ (минимум 4-5) — для каждой техники: (а) название, (б) КАК применять — пошагово, (в) ПОЧЕМУ подходит именно этому профилю, (г) конкретный пример диалога или задания для сессии.\n\nОтветь на русском языке, начни с заголовка "4.". Напиши только этот раздел, ничего больше.`,

      `На основе результатов того же опросника "${questionnaireType}" (${summary}), теперь напиши ТОЛЬКО следующие 3 раздела, с конкретными примерами:\n\n5. МЕЖСЕССИОННЫЕ ЗАДАНИЯ (домашние задания) — 3-4 конкретных примера с целью каждого.\n6. ПРИЗНАКИ РИСКА И МОНИТОРИНГ — на что особенно обратить внимание при этом профиле, когда нужно экстренное вмешательство или направление к другому специалисту (психиатру и т.д.).\n7. ОЦЕНКА ПРОГРЕССА — как измерять динамику (какие подшкалы, когда повторное тестирование).\n\nДай ответ на русском языке, структурированно по заголовкам. В конце добавь: "Это не заменяет клиническое решение — суждение специалиста первично, это лишь рабочая основа и примеры."`,
    ];

    const sections = lang === 'ru' ? sectionsRu : sectionsAz;

    try {
      let combined = '';

      for (const sectionPrompt of sections) {
        let sectionText = '';
        await streamChatCompletion({
          messages: [{ role: 'system', content: sectionPrompt }],
          locale: lang,
          maxTokens: 3000,
          onDelta: (text) => {
            sectionText = text;
            const full = combined ? `${combined}\n\n${text}` : text;
            setGuidance(full);
            onGuidanceChange?.(full);
          },
        });
        combined = combined ? `${combined}\n\n${sectionText}` : sectionText;
      }
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
