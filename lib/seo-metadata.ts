import { Questionnaire } from "@/types";
import { getQuestionnaireKeywords } from "@/constants/seo-keywords";

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

const SITE_URL = 'https://ai-test-az.vercel.app';

export function generateQuestionnaireMetadata(
  questionnaire: Questionnaire,
  locale: string
): SEOMetadata {
  const isRu = locale === "ru";
  const keywords = getQuestionnaireKeywords(questionnaire.id, locale);

  // Get professional description of the scale
  const introduction = questionnaire.details.introduction;
  const questionCount = questionnaire.details.questionCount;
  const evaluationTime = questionnaire.details.evaluationTime;

  // Build professional title (emphasizing free, authoritative, AI analysis)
  const title = isRu
    ? `${questionnaire.title} - Бесплатная авторитетная оценка с ИИ | LXScale`
    : `${questionnaire.title} - Pulsuz, Etibarlı AI Qiymətləndirmə | LXScale`;

  // Build detailed description (highlighting three major advantages)
  const description = isRu
    ? `[Бесплатно + Авторитетно + Анализ ИИ] Профессиональная оценка ${
        questionnaire.title
      }. ${introduction.substring(
        0,
        80
      )}...${questionCount} вопросов, занимает ${evaluationTime}. Международный стандарт, бесплатный анализ ИИ, клиническая точность, защита конфиденциальности.`
    : `[Pulsuz + Etibarlı + AI Təhlili] Peşəkar ${
        questionnaire.title
      } psixi sağlamlıq qiymətləndirməsi. ${introduction.substring(
        0,
        80
      )}...${questionCount} sual, ${evaluationTime} çəkir. Beynəlxalq standart şkala, pulsuz AI təhlili, klinik səviyyəli qiymətləndirmə, məxfilik qorunur.`;

  // OpenGraph title (highlighting core value)
  const ogTitle = isRu
    ? `${questionnaire.title} - Бесплатная оценка с ИИ | LXScale`
    : `${questionnaire.title} - Pulsuz AI Qiymətləndirmə | LXScale`;

  // OpenGraph description (emphasizing professionalism and free)
  const ogDescription = isRu
    ? `Авторитетная бесплатная оценка ${questionnaire.title} + анализ ИИ. ${questionCount} вопросов, ${evaluationTime}, международный стандарт, клиническая точность, полностью бесплатно.`
    : `Etibarlı ${questionnaire.title} pulsuz qiymətləndirməsi + AI təhlili. ${questionCount} sual, ${evaluationTime}, beynəlxalq standart, klinik dəqiqlik, tamamilə pulsuz.`;

  // Twitter title and description
  const twitterTitle = ogTitle;
  const twitterDescription = ogDescription;

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
  };
}

// Generate professional structured data for each questionnaire
export function generateQuestionnaireStructuredData(
  questionnaire: Questionnaire,
  locale: string,
  url: string
) {
  const isRu = locale === "ru";

  return {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "@id": url,
    name: questionnaire.title,
    description: questionnaire.details.introduction,
    url: url,
    inLanguage: isRu ? "ru-RU" : "az-AZ",
    medicalTestPanel: {
      "@type": "MedicalTestPanel",
      name: questionnaire.title,
      description: questionnaire.details.introduction,
      testDuration: questionnaire.details.evaluationTime,
      numberOfQuestions: questionnaire.details.questionCount,
    },
    provider: {
      "@type": "Organization",
      name: "LXScale",
      url: SITE_URL,
      description: isRu
        ? "Бесплатная авторитетная платформа оценки психического здоровья с ИИ, предоставляющая профессиональные клинические шкалы и интеллектуальный анализ"
        : "Pulsuz, etibarlı AI dəstəkli psixi sağlamlıq qiymətləndirmə platforması, peşəkar klinik şkalalar və ağıllı təhlil təklif edir",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "LXScale",
      url: SITE_URL,
      description: isRu
        ? "Авторитетная бесплатная платформа оценки психического здоровья с ИИ, международные стандартные шкалы + интеллектуальный анализ, клиническая точность"
        : "Etibarlı, pulsuz AI psixi sağlamlıq qiymətləndirmə platforması, beynəlxalq standart şkalalar + ağıllı təhlil, klinik dəqiqlik",
    },
    mainEntity: {
      "@type": "FAQPage",
      name: `${questionnaire.title} FAQ`,
      mainEntity: [
        {
          "@type": "Question",
          name: isRu
            ? `Сколько времени занимает прохождение ${questionnaire.title}?`
            : `${questionnaire.title} nə qədər vaxt aparır?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: questionnaire.details.evaluationTime,
          },
        },
        {
          "@type": "Question",
          name: isRu
            ? `Сколько вопросов содержит ${questionnaire.title}?`
            : `${questionnaire.title} neçə sualdan ibarətdir?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: questionnaire.details.questionCount,
          },
        },
        {
          "@type": "Question",
          name: isRu
            ? `Бесплатен ли ${questionnaire.title} и есть ли анализ ИИ?`
            : `${questionnaire.title} pulsuzdurmu və AI təhlili varmı?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: isRu
              ? "Да, полностью бесплатно! Включая авторитетную оценку по шкале + интеллектуальный анализ ИИ + профессиональную интерпретацию, без регистрации, с защитой конфиденциальности и клинической точностью."
              : "Bəli, tamamilə pulsuzdur! Etibarlı şkala qiymətləndirməsi + ağıllı AI təhlili + peşəkar şərh daxildir, qeydiyyat tələb olunmur, məxfilik qorunur, klinik dəqiqlik təmin olunur.",
          },
        },
        {
          "@type": "Question",
          name: isRu
            ? "Насколько авторитетны результаты оценки LXScale?"
            : "LXScale-in qiymətləndirmə nəticələri nə qədər etibarlıdır?",
          acceptedAnswer: {
            "@type": "Answer",
            text: isRu
              ? "Да, мы используем международно стандартизированные психологические шкалы, такие как PHQ-9, GAD-7 и другие, в сочетании с интеллектуальным анализом ИИ, что обеспечивает клиническую точность и авторитетность."
              : "Bəli, biz PHQ-9, GAD-7 kimi beynəlxalq standartlaşdırılmış psixoloji şkalalardan istifadə edirik, bunları ağıllı AI təhlili ilə birləşdiririk ki, bu da klinik dəqiqlik və etibarlılıq təmin edir.",
          },
        },
      ],
    },
    ...(questionnaire.details.references &&
      questionnaire.details.references.length > 0 && {
        citation: questionnaire.details.references.map((ref) => ({
          "@type": "ScholarlyArticle",
          name: ref.text,
          url: ref.url,
        })),
      }),
  };
}
