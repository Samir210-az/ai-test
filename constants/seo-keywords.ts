/**
 * Psixoloji qiymətləndirmə şkalaları üçün SEO açar sözləri
 * Ключевые слова SEO для психологических шкал оценки
 */

export const QUESTIONNAIRE_KEYWORDS: Record<string, Record<string, string[]>> = {
  'az': {
    'phq9': [
      'PHQ-9', 'PHQ9', 'Xəstə Sağlamlığı Sorğusu', 'depressiya şkalası', 'depressiya testi',
      'depressiya skrininqi', 'depressiya özünüqiymətləndirməsi', 'psixi sağlamlıq', 'psixoloji qiymətləndirmə',
      'pulsuz depressiya testi', 'depressiya simptomları', 'əhval testi', 'psixoloji skrininq'
    ],
    'gad7': [
      'GAD-7', 'GAD7', 'Ümumiləşmiş Narahatlıq Pozuntusu Şkalası', 'narahatlıq testi', 'narahatlıq skrininqi',
      'narahatlıq qiymətləndirməsi', 'narahatlıq şkalası', 'pulsuz narahatlıq testi', 'narahatlıq simptomları',
      'psixi sağlamlıq', 'narahatlıq pozuntusu'
    ],
    'bdi2': [
      'BDI-II', 'BDI2', 'Beck Depressiya İnventarı', 'depressiya şkalası', 'depressiya testi',
      'depressiya qiymətləndirməsi', 'psixoloji qiymətləndirmə', 'pulsuz depressiya testi', 'Beck şkalası',
      'depressiya simptomları', 'psixi sağlamlıq'
    ],
    'scl90': [
      'SCL-90', 'SCL90', 'Simptomlar Siyahısı', 'psixi simptomlar', 'psixi sağlamlıq skrininqi',
      'psixoloji qiymətləndirmə', 'hərtərəfli psixoloji test', 'psixoloji problemlər', 'psixi vəziyyət',
      'SCL-90 şkalası pulsuz'
    ],
    'ocd': [
      'Y-BOCS', 'YBOCS', 'Yale-Brown Obsessiv-Kompulsiv Şkalası', 'OKB testi', 'OKB skrininqi',
      'obsessiv-kompulsiv şkala', 'obsessiv fikirlər', 'kompulsiv davranış', 'pulsuz OKB testi',
      'psixi sağlamlıq', 'OKB simptomları'
    ],
    'pss10': [
      'PSS-10', 'PSS10', 'Qavranılan Stress Şkalası', 'stress testi', 'stress qiymətləndirməsi',
      'psixoloji stress', 'stress idarəetməsi', 'pulsuz stress testi', 'stress səviyyəsi', 'psixi sağlamlıq'
    ],
    'dass21': [
      'DASS-21', 'DASS21', 'Depressiya Narahatlıq Stress Şkalaları', 'depressiya narahatlıq testi',
      'psixoloji qiymətləndirmə', 'depressiya testi', 'narahatlıq testi', 'stress testi', 'psixi sağlamlıq',
      'hərtərəfli psixoloji test'
    ],
    'sds': [
      'SDS', 'Özünüqiymətləndirmə Depressiya Şkalası', 'Zung Depressiya Şkalası', 'depressiya testi',
      'depressiya qiymətləndirməsi', 'depressiya skrininqi', 'pulsuz depressiya testi', 'depressiya simptomları',
      'psixi sağlamlıq'
    ],
    'isi': [
      'ISI', 'Yuxusuzluq Şiddəti İndeksi', 'yuxusuzluq şkalası', 'yuxusuzluq testi', 'yuxusuzluq qiymətləndirməsi',
      'yuxu keyfiyyəti', 'yuxu pozuntusu', 'pulsuz yuxusuzluq testi', 'yuxu problemləri', 'psixi sağlamlıq'
    ],
    'adhd': [
      'ADHD', 'ASRS', 'Yetkin ADHD', 'Diqqət Çatışmazlığı Hiperaktivlik Pozuntusu', 'ADHD testi',
      'ADHD qiymətləndirməsi', 'diqqət çatışmazlığı', 'hiperaktivlik', 'pulsuz ADHD testi', 'psixi sağlamlıq'
    ],
    'gd': [
      'gender disforiyası', 'gender disforiyası testi', 'gender disforiyası sorğusu', 'gender kimliyi',
      'gender uyğunsuzluğu', 'gender ifadəsi', 'psixi sağlamlıq', 'pulsuz gender testi', 'GDQ'
    ],
    'npd': [
      'NPI', 'NPI-16', 'Narsissik Şəxsiyyət İnventarı', 'narsissizm testi', 'narsissizm qiymətləndirməsi',
      'şəxsiyyət testi', 'psixi sağlamlıq', 'pulsuz narsissizm testi', 'narsissik xüsusiyyətlər', 'şəxsiyyət inventarı'
    ]
  },
  'ru': {
    'phq9': [
      'PHQ-9', 'PHQ9', 'Опросник здоровья пациента', 'шкала депрессии', 'тест на депрессию',
      'скрининг депрессии', 'самооценка депрессии', 'психическое здоровье', 'психологическая оценка',
      'бесплатный тест на депрессию', 'симптомы депрессии', 'тест настроения'
    ],
    'gad7': [
      'GAD-7', 'GAD7', 'Шкала генерализованного тревожного расстройства', 'тест на тревожность',
      'скрининг тревожности', 'оценка тревожности', 'шкала тревоги', 'бесплатный тест на тревожность',
      'симптомы тревоги', 'психическое здоровье', 'тревожное расстройство'
    ],
    'bdi2': [
      'BDI-II', 'BDI2', 'Опросник депрессии Бека', 'шкала депрессии', 'тест на депрессию',
      'оценка депрессии', 'психологическая оценка', 'бесплатный тест на депрессию', 'шкала Бека',
      'симптомы депрессии', 'психическое здоровье'
    ],
    'scl90': [
      'SCL-90', 'SCL90', 'Опросник выраженности психопатологической симптоматики', 'психические симптомы',
      'скрининг психического здоровья', 'психологическая оценка', 'комплексный психологический тест',
      'психологические проблемы', 'психическое состояние'
    ],
    'ocd': [
      'Y-BOCS', 'YBOCS', 'Шкала Йеля-Брауна', 'тест на ОКР', 'скрининг ОКР',
      'обсессивно-компульсивная шкала', 'навязчивые мысли', 'компульсивное поведение', 'бесплатный тест на ОКР',
      'психическое здоровье', 'симптомы ОКР'
    ],
    'pss10': [
      'PSS-10', 'PSS10', 'Шкала воспринимаемого стресса', 'тест на стресс', 'оценка стресса',
      'психологический стресс', 'управление стрессом', 'бесплатный тест на стресс', 'уровень стресса', 'психическое здоровье'
    ],
    'dass21': [
      'DASS-21', 'DASS21', 'Шкалы депрессии, тревоги и стресса', 'тест на депрессию и тревогу',
      'психологическая оценка', 'тест на депрессию', 'тест на тревожность', 'тест на стресс', 'психическое здоровье',
      'комплексный психологический тест'
    ],
    'sds': [
      'SDS', 'Шкала самооценки депрессии', 'Шкала Цунга', 'тест на депрессию',
      'оценка депрессии', 'скрининг депрессии', 'бесплатный тест на депрессию', 'симптомы депрессии', 'психическое здоровье'
    ],
    'isi': [
      'ISI', 'Индекс тяжести инсомнии', 'шкала бессонницы', 'тест на бессонницу', 'оценка бессонницы',
      'качество сна', 'нарушение сна', 'бесплатный тест на бессонницу', 'проблемы со сном', 'психическое здоровье'
    ],
    'adhd': [
      'СДВГ', 'ASRS', 'СДВГ у взрослых', 'синдром дефицита внимания и гиперактивности', 'тест на СДВГ',
      'оценка СДВГ', 'дефицит внимания', 'гиперактивность', 'бесплатный тест на СДВГ', 'психическое здоровье'
    ],
    'gd': [
      'гендерная дисфория', 'тест на гендерную дисфорию', 'опросник гендерной дисфории', 'гендерная идентичность',
      'гендерное несоответствие', 'гендерное самовыражение', 'психическое здоровье', 'бесплатный гендерный тест', 'GDQ'
    ],
    'npd': [
      'NPI', 'NPI-16', 'Опросник нарциссической личности', 'тест на нарциссизм', 'оценка нарциссизма',
      'тест личности', 'психическое здоровье', 'бесплатный тест на нарциссизм', 'нарциссические черты', 'опросник личности'
    ]
  }
};

/**
 * Ümumi psixi sağlamlıq açar sözləri / Общие ключевые слова психического здоровья
 */
export const GENERAL_MENTAL_HEALTH_KEYWORDS: Record<string, string[]> = {
  'az': [
    'pulsuz psixoloji test', 'pulsuz psixoloji qiymətləndirmə', 'pulsuz psixoloji skrininq', 'peşəkar psixoloji şkala',
    'peşəkar psixoloji qiymətləndirmə', 'standartlaşdırılmış psixoloji test', 'klinik psixoloji qiymətləndirmə',
    'beynəlxalq standart şkala', 'elmi psixoloji qiymətləndirmə', 'psixi sağlamlıq', 'psixoloji qiymətləndirmə', 'psixoloji şkala'
  ],
  'ru': [
    'бесплатный психологический тест', 'бесплатная психологическая оценка', 'бесплатный психологический скрининг',
    'профессиональная психологическая шкала', 'профессиональная психологическая оценка',
    'стандартизированный психологический тест', 'клиническая оценка', 'валидированная шкала',
    'психическое здоровье', 'психологическая оценка', 'психологическое благополучие'
  ]
};

/**
 * Müvafiq şkalanın açar sözlərini əldə et / Получить ключевые слова для конкретной шкалы
 */
export function getQuestionnaireKeywords(questionnaireId: string, locale: string): string[] {
  const specificKeywords = QUESTIONNAIRE_KEYWORDS[locale]?.[questionnaireId] || [];
  const generalKeywords = GENERAL_MENTAL_HEALTH_KEYWORDS[locale] || [];

  return [...specificKeywords, ...generalKeywords.slice(0, 5)];
}

/**
 * Bütün dəstəklənən şkala ID-ləri / Все поддерживаемые ID шкал
 */
export const SUPPORTED_QUESTIONNAIRE_IDS = [
  'phq9', 'gad7', 'bdi2', 'scl90', 'ocd', 'pss10', 'dass21', 'sds', 'isi', 'adhd', 'gd', 'npd'
] as const;

export type QuestionnaireId = typeof SUPPORTED_QUESTIONNAIRE_IDS[number];
