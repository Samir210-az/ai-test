'use client';
import { Search } from 'lucide-react';
import { useState, useCallback } from 'react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Separator } from "@/components/ui/separator";
import { TagFilters } from '@/components/TagFilters';
import { useScopedI18n } from '@/locales/client';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { Questionnaire } from '@/types';

// A curated, warm palette derived from the AN brand (crimson #9c1116 /
// gold #c79a4b) plus a couple of muted complementary tones - each scale
// gets a distinct accent so the grid is scannable at a glance, without
// drifting into arbitrary rainbow colors that would clash with the brand.
const ACCENT_COLORS: Record<string, string> = {
  phq9: '#9c1116',
  gad7: '#b8860b',
  pss10: '#c2703d',
  dass21: '#7a2e2e',
  isi: '#46586b',
  adhd: '#d29922',
  gd: '#8e6c88',
  npd: '#6b4c3a',
  sds: '#a13d3d',
  bdi2: '#7c1d1d',
  ocd: '#5c7a5c',
  scl90: '#4a3728',
};
const DEFAULT_ACCENT = '#9c1116';

function getAccentColor(id: string): string {
  return ACCENT_COLORS[id] || DEFAULT_ACCENT;
}

// Short 2-letter monogram shown inside the colored square, derived from the
// scale's own short id/acronym rather than an arbitrary icon
const MONOGRAMS: Record<string, string> = {
  phq9: 'PH',
  gad7: 'GA',
  pss10: 'PS',
  dass21: 'DA',
  isi: 'IS',
  adhd: 'AD',
  gd: 'GD',
  npd: 'NP',
  sds: 'SD',
  bdi2: 'BD',
  ocd: 'OK',
  scl90: 'SC',
};

export default function QuestionnaireList() {
  const questionnaires = useQuestionnaire();
  const t = useScopedI18n('component.questionnaire.list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Callback function for tag changes
  const handleTagsChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);


  // Filter questionnaires based on search terms and tags
  const filteredQuestionnaires = (questionnaires as Questionnaire[]).filter((q) => {
    // Text search filtering
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Tag filtering - matches if the questionnaire has ANY of the selected tags
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => q.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container px-4 py-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-medium mb-6">{t('title')}</h1>

          {/* Search bar */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tag filters */}
          <TagFilters onTagsChange={handleTagsChange} />

          {/* Questionnaire list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredQuestionnaires.length > 0 ? (
              filteredQuestionnaires.map((questionnaire) => {
                const accent = getAccentColor(questionnaire.id);
                return (
                <Card
                  key={questionnaire.id}
                  className="overflow-hidden pt-0 gap-4"
                  style={{ borderTopWidth: '4px', borderTopColor: accent }}
                >
                  <CardHeader className="pt-5">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-bold tracking-wide"
                        style={{ backgroundColor: accent }}
                      >
                        {MONOGRAMS[questionnaire.id] || questionnaire.id.slice(0, 2).toUpperCase()}
                      </div>
                      <CardTitle className="pt-1.5">{questionnaire.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 h-12">
                      <p
                        className="text-sm text-muted-foreground"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {questionnaire.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {questionnaire.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {questionnaire.time}
                    </span>
                    <Link href={`/questionnaire/${questionnaire.id}/details`}>
                      <Button className="cursor-pointer">
                        {t('detailButton')}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                {t('noMatch')}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
