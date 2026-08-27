"use client";

import React from 'react';
import useGetLang from '@/hooks/useGetLang';
import { OCDResult } from './OCDResult';
import { SCL90Result } from './SCL90Result';
import { SDSResult } from './SDSResult';
import { GAD7Result } from './GAD7Result';
import { PHQ9Result } from './PHQ9Result';
import { PSS10Result } from './PSS10Result';
import { DASS21Result } from './DASS21Result';
import { BDI2Result } from './BDI2Result';
import { ISIResult } from './ISIResult';
import { ADHDResult } from './ADHDResult';
import { GDResult } from './GDResult';
import { NPDResult } from './NPDResult';

interface Props {
  questionnaireId: string;
  answers: string[];
  onSummary?: (summary: string) => void;
}

export function ResultAnalysis({ questionnaireId, answers, onSummary }: Props) {
  const lang = useGetLang();
  switch (questionnaireId) {
    case 'ocd':
      return <OCDResult answers={answers} onSummary={onSummary} />;
    case 'scl90':
      return <SCL90Result answers={answers} onSummary={onSummary} />;
    case 'sds':
      return <SDSResult answers={answers} onSummary={onSummary} />;
    case 'gad7':
      return <GAD7Result answers={answers} onSummary={onSummary} />;
    case 'phq9':
      return <PHQ9Result answers={answers} onSummary={onSummary} />;
    case 'pss10':
      return <PSS10Result answers={answers} onSummary={onSummary} />;
    case 'dass21':
      return <DASS21Result answers={answers} onSummary={onSummary} />;
    case 'bdi2':
      return <BDI2Result answers={answers} onSummary={onSummary} />;
    case 'isi':
      return <ISIResult answers={answers} onSummary={onSummary} />;
    case 'adhd':
      return <ADHDResult answers={answers} onSummary={onSummary} />;
    case 'gd':
      return <GDResult answers={answers} onSummary={onSummary} />;
    case 'npd':
      return <NPDResult answers={answers} onSummary={onSummary} />;
    default:
      return (
        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-yellow-800">
            <h3 className="font-semibold mb-2">
              {lang === 'ru' ? 'Шкала пока не поддерживается' : 'Bu şkala hələ dəstəklənmir'}
            </h3>
            <p className="text-sm">
              {lang === 'ru'
                ? `К сожалению, анализ результатов для шкалы с ID "${questionnaireId}" пока не поддерживается. Проверьте конфигурацию шкалы или обратитесь к разработчику.`
                : `Təəssüf ki, "${questionnaireId}" ID-li şkala üçün nəticə təhlili hələ dəstəklənmir. Zəhmət olmasa şkalanın konfiqurasiyasını yoxlayın və ya developer ilə əlaqə saxlayın.`}
            </p>
          </div>
        </div>
      );
  }
}
