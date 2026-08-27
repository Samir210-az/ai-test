import { useScopedI18n } from '@/locales/client';
interface FactorAnalysisProps {
  factorScores: { [key: string]: number };
  questionnaireId: string;
  factorDescriptions?: { [key: string]: string };
}

export function FactorAnalysis({
  factorScores,
  questionnaireId,
  factorDescriptions,
}: FactorAnalysisProps) {
  const t = useScopedI18n(
    'component.questionnaire.result.public.factorAnalysis'
  );
  if (!factorScores || Object.keys(factorScores).length === 0) return null;

  // Localized factor name mapping
  const getFactorNameMap = () => {
    const factorNameMap: { [key: string]: { [key: string]: string } } = {
      ocd: {
        obsession: t('ocdObsessionName'),
        compulsion: t('ocdCompulsionName'),
      },
    };
    return factorNameMap[questionnaireId] || {};
  };

  // Get factor description information
  const getFactorDescription = (factorName: string) => {
    // If external description is provided, use it preferentially
    if (factorDescriptions && factorDescriptions[factorName]) {
      return factorDescriptions[factorName];
    }

    // Default description mapping
    const defaultDescriptions: { [key: string]: { [key: string]: string } } = {
      ocd: {
        obsession: t('ocdObsessionDesc'),
        compulsion: t('ocdCompulsionDesc'),
      },
    };

    return (
      defaultDescriptions[questionnaireId]?.[factorName] ||
      t('genericFactorDescription')
    );
  };

  // Severity level identifiers (locale-independent keys, used for thresholds and colors)
  type SeverityKey = 'mild' | 'moderate' | 'severe' | 'extreme';

  // Get severity level key of factor scores (based on questionnaire ID and factor name)
  const getFactorSeverityKey = (factorName: string, score: number): SeverityKey => {
    // Define severity thresholds based on ID and factor names
    const thresholds: { [key: string]: { [key: string]: number[] } } = {
      ocd: {
        obsession: [4, 8, 12],
        compulsion: [4, 8, 12],
        default: [4, 8, 12],
      },
    };

    const factorThresholds = thresholds[questionnaireId]?.[factorName] ||
      thresholds[questionnaireId]?.['default'] || [1.5, 2.5, 3.5];

    if (score < factorThresholds[0]) return 'mild';
    if (score < factorThresholds[1]) return 'moderate';
    if (score < factorThresholds[2]) return 'severe';
    return 'extreme';
  };

  const severityColorMap: Record<SeverityKey, string> = {
    mild: 'bg-green-500',
    moderate: 'bg-yellow-500',
    severe: 'bg-orange-500',
    extreme: 'bg-red-500',
  };

  // Get maximum score of factor (for percentage calculation)
  const getMaxScore = (factorName: string) => {
    const maxScores: { [key: string]: { [key: string]: number } } = {
      scl90: { default: 5 },
      ocd: {
        obsession: 20,
        compulsion: 20,
        default: 20,
      },
    };

    return (
      maxScores[questionnaireId]?.[factorName] ||
      maxScores[questionnaireId]?.['default'] ||
      5
    );
  };

  // Get localized display of factor names
  const getDisplayName = (factorName: string) => {
    const nameMap = getFactorNameMap();
    return nameMap[factorName] || factorName;
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-3">{t('factorAnalysisTitle')}</h2>
      <div className="space-y-4">
        {Object.entries(factorScores).map(([factorName, score], index) => {
          const displayName = getDisplayName(factorName);
          const severityKey = getFactorSeverityKey(factorName, score);
          const severityLabel = t(severityKey);
          const colorClass = severityColorMap[severityKey];

          // Percentage calculation based on maximum scores of each factor in each scale
          const maxScore = getMaxScore(factorName);
          const scorePercentage = (score / maxScore) * 100;

          return (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{displayName} </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs text-white ${colorClass}`}
                >
                  {severityLabel}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${colorClass} h-2.5 rounded-full`}
                    style={{ width: `${Math.min(scorePercentage, 100)}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {score.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {getFactorDescription(factorName)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
