'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useCurrentLocale } from '@/locales/client';
interface TagFiltersProps {
  onTagsChange: (tags: string[]) => void;
}

export function TagFilters({ onTagsChange }: TagFiltersProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const lang = useCurrentLocale();

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Notify parent component when tags change
  useEffect(() => {
    onTagsChange(activeTags);
  }, [activeTags, onTagsChange]);

  const tags =
    lang === 'ru'
      ? [
          'Депрессия',
          'Тревожность',
          'ОКР',
          'ПТСР',
          'Расстройство личности',
          'Шизофрения',
          'Расстройство пищевого поведения',
          'СДВГ',
          'Оценка риска',
          'Шкала самооценки',
          'Шкала внешней оценки',
        ]
      : [
          'Depressiya',
          'Narahatlıq',
          'OKB',
          'Post-Travmatik Stress',
          'Şəxsiyyət Pozuntusu',
          'Şizofreniya',
          'Qidalanma Pozuntusu',
          'ADHD',
          'Risk Qiymətləndirməsi',
          'Özünüqiymətləndirmə Şkalası',
          'Müşahidəçi Qiymətləndirmə Şkalası',
        ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant="outline"
          className={`cursor-pointer ${
            activeTags.includes(tag) ? '!bg-black !text-white' : ''
          }`}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
