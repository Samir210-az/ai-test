'use client';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Questionnaire } from '@/components/questionnaire/test/QuestionnaireTest';
import { LicenseGate } from '@/components/questionnaire/test/public/LicenseGate';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { Questionnaire as QuestionnaireType } from '@/types';
import { getStoredLicenseStatus } from '@/lib/license';

export default function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Get the questionnaire with specified id from questionnaire data
  const questionnaire = useQuestionnaire(id);

  // License check runs client-side against localStorage, so it starts as
  // null (unknown) until the effect resolves - avoids briefly flashing
  // the gate (or the test) before we actually know the status.
  const [isLicensed, setIsLicensed] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLicensed(getStoredLicenseStatus().valid);
  }, []);

  // If data not found, show 404 page
  if (!questionnaire) {
    return notFound();
  }

  if (isLicensed === null) {
    return null;
  }

  if (!isLicensed) {
    return <LicenseGate onLicenseActivated={() => setIsLicensed(true)} />;
  }

  return <Questionnaire questionnaire={questionnaire as QuestionnaireType} id={id} />;
}
