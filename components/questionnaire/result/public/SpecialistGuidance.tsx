'use client';

import { useState } from 'react';
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

function renderMarkdownish(text: string) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
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

    // A deliberately long, structured prompt: this is not "how to run the
    // first session" but the whole arc of working with this patient -
    // treatment framing, specific techniques with an explanation of how and
    // why to apply each one, session-by-session structure, homework, and
    // red flags - grounded in the actual scale and its computed result.
    const promptAz = `Sən təcrübəli klinik psixoloq/psixoterapevt üçün konsultasiya dəstək köməkçisisən. Aşağıda "${questionnaireType}" anketinin nəticələri var:

${resultSummary || JSON.stringify(questionnaireResults)}

Bu nəticələrə əsaslanaraq, HƏMİN PASİENTLƏ ÜMUMİ İŞ QURULUŞU üzrə mütəxəssisə ətraflı, konkret və praktik bələdçilik ver. Bu, yalnız ilk görüş üçün deyil, bütün müalicə prosesi üçündür. Aşağıdakı struktura tam əməl et, hər bölmədə konkret NÜMUNƏLƏR (məsələn dəqiq sual mətnləri, dəqiq təlimat cümlələri) ver, ümumi klişelərdən qaç:

1. VƏZİYYƏTİN KLİNİK ŞƏRHİ — bu nəticələr nəyi göstərir, hansı simptom klasterlərinə diqqət yetirilməlidir.
2. İLKİN QİYMƏTLƏNDİRMƏ SUALLARI — ilk 1-2 görüşdə vermək üçün 6-8 konkret açıq sual, hər birinin nə üçün soruşulduğunu bir cümlə ilə izah et.
3. MÜALICƏ ÇƏRÇİVƏSİ VƏ ÜMUMI STRUKTUR — bu profil üçün uyğun terapevtik yanaşma(lar) (məs. KBT, ACT, sxema terapiyası və s. — konkret hansı olduğunu de və niyə), tipik sessiya sayı/tezliyi, mərhələlərin qısa xəritəsi (məs. 1-3-cü sessiyalar nəyə fokuslanır, 4-8-ci sessiyalar nəyə və s.).
4. KONKRET TEXNİKALAR (ən azı 4-5 texnika) — hər texnika üçün: (a) adı, (b) NECƏ tətbiq olunur — addım-addım, (c) NİYƏ məhz bu pasient profili üçün uyğundur, (d) sessiyada istifadə oluna biləcək konkret nümunə dialoq və ya tapşırıq mətni.
5. SESSIYALARARASI TAPŞIRIQLAR (ev tapşırığı) — 3-4 konkret nümunə, hər birinin məqsədi ilə.
6. RİSK ƏLAMƏTLƏRİ VƏ İZLƏMƏ — bu profildə xüsusilə diqqət ediləcək xəbərdarlıq işarələri, hansı hallarda təcili müdaxilə və ya başqa mütəxəssisə (psixiatr və s.) yönləndirmə lazımdır.
7. PROQRESİN QİYMƏTLƏNDİRİLMƏSİ — irəliləyişi necə ölçmək (məs. hansı alt-şkalalar, nə vaxt təkrar test).

Cavabı Azərbaycan dilində, başlıqlarla struktur olaraq, konkret və tətbiq edilə bilən şəkildə ver. Bu, klinik qərarı əvəz etmir — mütəxəssisin öz mühakiməsi əsasdır, sən yalnız işlək çərçivə və nümunələr təqdim edirsən.`;

    const promptRu = `Ты ассистент поддержки консультаций для опытного клинического психолога/психотерапевта. Ниже приведены результаты опросника "${questionnaireType}":

${resultSummary || JSON.stringify(questionnaireResults)}

На основе этих результатов дай специалисту подробное, конкретное и практическое руководство по ОБЩЕЙ РАБОТЕ С ЭТИМ ПАЦИЕНТОМ. Это не только про первую встречу, а про весь процесс работы. Строго следуй структуре ниже, в каждом разделе приводи конкретные ПРИМЕРЫ (точные формулировки вопросов, точные фразы инструкций), избегай общих клише:

1. КЛИНИЧЕСКАЯ ИНТЕРПРЕТАЦИЯ — что показывают эти результаты, на какие кластеры симптомов обратить внимание.
2. ВОПРОСЫ ДЛЯ ПЕРВИЧНОЙ ОЦЕНКИ — 6-8 конкретных открытых вопросов для первых 1-2 встреч, с однострочным объяснением цели каждого.
3. РАМКА ТЕРАПИИ И ОБЩАЯ СТРУКТУРА — подходящий терапевтический подход(ы) для этого профиля (например, КПТ, ACT, схема-терапия и т.д. — укажи конкретно какой и почему), типичное количество/частота сессий, краткая карта этапов (например, сессии 1-3 фокусируются на..., сессии 4-8 на... и т.д.).
4. КОНКРЕТНЫЕ ТЕХНИКИ (минимум 4-5) — для каждой техники: (а) название, (б) КАК применять — пошагово, (в) ПОЧЕМУ подходит именно этому профилю, (г) конкретный пример диалога или задания для сессии.
5. МЕЖСЕССИОННЫЕ ЗАДАНИЯ (домашние задания) — 3-4 конкретных примера с целью каждого.
6. ПРИЗНАКИ РИСКА И МОНИТОРИНГ — на что особенно обратить внимание при этом профиле, когда нужно экстренное вмешательство или направление к другому специалисту (психиатру и т.д.).
7. ОЦЕНКА ПРОГРЕССА — как измерять динамику (какие подшкалы, когда повторное тестирование).

Дай ответ на русском языке, структурированно по заголовкам, конкретно и применимо на практике. Это не заменяет клиническое решение — суждение специалиста первично, ты лишь даёшь рабочую основу и примеры.`;

    try {
      await streamChatCompletion({
        messages: [{ role: 'system', content: lang === 'ru' ? promptRu : promptAz }],
        locale: lang,
        maxTokens: 1600,
        onDelta: (text) => {
          setGuidance(text);
          onGuidanceChange?.(text);
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
            <div className="text-sm text-gray-800 bg-white border rounded-lg p-4 max-h-[500px] overflow-y-auto whitespace-pre-wrap">
              {renderMarkdownish(guidance)}
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
