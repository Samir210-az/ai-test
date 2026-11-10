import { questionnairesAz } from '@/questionairies/az';

export function getPwaInfo(id: string) {
  if (id === 'app') return { id: 'app', title: 'AI TEST', shortName: 'AI TEST' };
  const q = questionnairesAz.find((item) => item.id === id);
  if (!q) return null;
  const abbr = q.title.match(/\(([^)]+)\)\s*$/);
  const shortName = (abbr ? abbr[1] : q.id).toUpperCase();
  return { id: q.id, title: q.title, shortName };
}
