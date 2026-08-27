import QuestionnaireList from '@/components/questionnaire/List';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'ru') {
    return {
      title: 'Психологические опросники для самооценки | Бесплатные тесты психического здоровья',
      description: 'Просмотрите все доступные опросники для оценки психического здоровья. Включая шкалу депрессии PHQ-9, шкалу тревожности GAD-7, BDI-II, SCL-90, шкалу ОКР Y-BOCS, индекс инсомнии ISI, шкалу стресса PSS-10 и другие профессиональные психологические инструменты.',
      keywords: 'психологические опросники, тесты психического здоровья, опросник депрессии, оценка тревожности, шкала ОКР, тест на бессонницу, оценка стресса, бесплатная психологическая оценка',
      openGraph: {
        title: 'Психологические опросники для самооценки',
        description: 'Просмотрите все доступные опросники и шкалы для оценки психического здоровья',
        locale: 'ru_RU',
      },
    };
  }

  return {
    title: 'Psixoloji Qiymətləndirmə Anketləri | Pulsuz Psixi Sağlamlıq Testləri',
    description: 'Psixi sağlamlığın qiymətləndirilməsi üçün mövcud bütün anketlərə baxın. PHQ-9 depressiya şkalası, GAD-7 narahatlıq şkalası, BDI-II, SCL-90, Y-BOCS OKB şkalası, ISI yuxusuzluq şkalası, PSS-10 stress şkalası və digər peşəkar psixoloji qiymətləndirmə vasitələri daxildir.',
    keywords: 'psixoloji anketlər, psixi sağlamlıq testləri, depressiya anketi, narahatlıq qiymətləndirməsi, OKB şkalası, yuxusuzluq testi, stress qiymətləndirməsi, pulsuz psixoloji qiymətləndirmə',
    openGraph: {
      title: 'Psixoloji Qiymətləndirmə Anketləri',
      description: 'Psixi sağlamlığın qiymətləndirilməsi üçün mövcud bütün anket və şkalalara baxın',
      locale: 'az_AZ',
    },
  };
}

export default function QuestionnairePage() {
  return <QuestionnaireList />;
}
