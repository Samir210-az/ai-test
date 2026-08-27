import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { SponsorsSection } from '@/components/home/SponsorsSection';
import { ContributorsSection } from '@/components/home/ContributorsSection';
import { SupportSection } from '@/components/home/SupportSection';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'ru') {
    return {
      title: 'LXScale - Бесплатные инструменты оценки психического здоровья | Профессиональные психологические шкалы',
      description: 'Профессиональная бесплатная платформа для оценки психического здоровья. Включает опросник здоровья пациента (PHQ-9), опросник депрессии Бека (BDI-II), шкалу генерализованного тревожного расстройства (GAD-7), индекс тяжести инсомнии (ISI), шкалу воспринимаемого стресса (PSS-10), опросник нарциссической личности (NPI-16), тест на гендерную дисфорию, шкалу самооценки СДВГ и другое.',
      keywords: 'оценка психического здоровья, психологические шкалы, тест на депрессию, тест на тревожность, бесплатное психическое здоровье, опросник здоровья пациента, PHQ-9, опросник депрессии Бека, BDI-II, шкала генерализованного тревожного расстройства, GAD-7, индекс тяжести инсомнии, шкала воспринимаемого стресса, опросник нарциссической личности, тест на гендерную дисфорию, тест СДВГ, SCL-90, DASS-21',
      openGraph: {
        title: 'LXScale - Бесплатные инструменты оценки психического здоровья',
        description: 'Профессиональная платформа оценки психического здоровья с несколькими бесплатными психологическими шкалами',
        locale: 'ru_RU',
      },
    };
  }

  return {
    title: 'LXScale - Pulsuz Psixi Sağlamlıq Qiymətləndirmə Vasitələri | Peşəkar Psixoloji Şkalalar',
    description: 'Peşəkar, pulsuz psixi sağlamlıq qiymətləndirmə platforması. Xəstə Sağlamlığı Sorğusu (PHQ-9), Beck Depressiya İnventarı (BDI-II), Ümumiləşmiş Narahatlıq Pozuntusu Şkalası (GAD-7), Yuxusuzluq Şiddəti İndeksi (ISI), Qavranılan Stress Şkalası (PSS-10), Narsissik Şəxsiyyət İnventarı (NPI-16), Gender Disforiyası Testi, ADHD Özünüqiymətləndirmə Şkalası və digərləri daxildir.',
    keywords: 'psixi sağlamlıq qiymətləndirməsi, psixoloji şkalalar, depressiya testi, narahatlıq testi, pulsuz psixi sağlamlıq, Xəstə Sağlamlığı Sorğusu, PHQ-9, Beck Depressiya İnventarı, BDI-II, Ümumiləşmiş Narahatlıq Pozuntusu Şkalası, GAD-7, Yuxusuzluq Şiddəti İndeksi, Qavranılan Stress Şkalası, Narsissik Şəxsiyyət İnventarı, Gender Disforiyası Testi, ADHD testi, SCL-90, DASS-21',
    openGraph: {
      title: 'LXScale - Pulsuz Psixi Sağlamlıq Qiymətləndirmə Vasitələri',
      description: 'Depressiya, narahatlıq, OKB və digər bir çox pulsuz psixoloji şkala testi təklif edən peşəkar psixi sağlamlıq qiymətləndirmə platforması',
      locale: 'az_AZ',
    },
  };
}

export default function Home() {
  // Add questionnaire-related structured data
  const questionnaireJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mental Health Assessment Scales',
    description: 'Professional mental health assessment tools collection',
    itemListElement: [
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/phq9',
        name: 'Patient Health Questionnaire (PHQ-9) / 患者健康问卷',
        description: 'Standardized tool for assessing depression severity',
        url: 'https://lxscale.xyz/questionnaire/phq9'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/gad7',
        name: 'Generalized Anxiety Disorder Scale (GAD-7) / 广泛性焦虑量表',
        description: 'Standardized tool for assessing anxiety severity',
        url: 'https://lxscale.xyz/questionnaire/gad7'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/isi',
        name: 'Insomnia Severity Index Scale (ISI) / 失眠严重程度指数量表',
        description: 'Assessment of insomnia severity and impact on daily life',
        url: 'https://lxscale.xyz/questionnaire/isi'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/pss10',
        name: 'Perceived Stress Scale (PSS-10) / 感知压力量表',
        description: 'Measurement of perceived stress levels',
        url: 'https://lxscale.xyz/questionnaire/pss10'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/npd',
        name: 'Narcissistic Personality Inventory (NPI-16) / 自恋人格量表清单',
        description: 'Assessment of narcissistic personality traits',
        url: 'https://lxscale.xyz/questionnaire/npd'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/gd',
        name: 'Gender Dysphoria Test (GDQ) / 性别焦虑测试',
        description: 'Assessment of gender dysphoria experiences',
        url: 'https://lxscale.xyz/questionnaire/gd'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/bdi2',
        name: 'Beck Depression Inventory (BDI-II) / 贝克抑郁量表',
        description: 'Widely used depression assessment tool',
        url: 'https://lxscale.xyz/questionnaire/bdi2'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/adhd',
        name: 'ADHD Self-Report Scale (ASRS-v1.1) / 成人ADHD自评量表',
        description: 'Adult ADHD screening and assessment',
        url: 'https://lxscale.xyz/questionnaire/adhd'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/scl90',
        name: 'SCL-90 Symptom Checklist / 症状自评量表',
        description: 'Comprehensive psychological symptom assessment',
        url: 'https://lxscale.xyz/questionnaire/scl90'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/ocd',
        name: 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS) / 强迫症量表',
        description: 'Professional tool for assessing OCD severity',
        url: 'https://lxscale.xyz/questionnaire/ocd'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/dass21',
        name: 'Depression Anxiety Stress Scales (DASS-21) / 抑郁焦虑压力量表',
        description: 'Combined assessment of depression, anxiety, and stress',
        url: 'https://lxscale.xyz/questionnaire/dass21'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/sds',
        name: 'Self-Rating Depression Scale (SDS) / 抑郁自评量表',
        description: 'Self-assessment tool for depression',
        url: 'https://lxscale.xyz/questionnaire/sds'
      },
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(questionnaireJsonLd) }}
      />
      <div className="flex flex-col min-h-screen border-t">
        <HeroSection />
        <FeaturesSection />
        <SponsorsSection />
        <ContributorsSection />
        <SupportSection />
      </div>
    </>
  );
}
