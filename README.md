# AI-Test (AN Psixoloji Dəstək və Reabilitasiya Mərkəzi)

Psixoloji özünüqiymətləndirmə platforması — Azərbaycan və Rus dillərində.

## Haqqında

Bu layihə [lx-scale](https://github.com/lxdao-official/lx-scale) açıq mənbə layihəsinin arxitekturası əsasında qurulub, bütün klinik anketlər Azərbaycan və Rus dillərinə tərcümə edilib və AN Psixoloji Dəstək və Reabilitasiya Mərkəzi üçün fərdiləşdirilib.

**Canlı sayt:** https://ai-test-az.vercel.app

## Mövcud anketlər (12)

PHQ-9, GAD-7, PSS-10, DASS-21, ISI, ADHD (ASRS), Gender Disforiyası (GDQ), NPI-16, SDS (Zung), BDI-II, Y-BOCS (OKB), SCL-90

> **Diqqət:** BDI-II, SCL-90 və Y-BOCS müəllif hüquqları ilə qorunan klinik alətlərdir (Pearson və s.). Bu layihədə komersiya istifadəsi hüquqi məsuliyyəti daşıyan tərəfin öz qərarıdır.

## Texniki stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 + Radix/Shadcn UI
- next-international (AZ/RU lokalizasiya)
- DeepSeek API (nəticələr üzrə AI təhlili, `/api/chat`)
- Bütün istifadəçi cavabları brauzerdə lokal saxlanılır (localStorage) — backend/verilənlər bazası yoxdur

## Quraşdırma

```bash
npm install
npm run dev
```

`.env` faylında `DEEPSEEK_API_KEY` təyin edilməlidir ki, AI təhlil funksiyası işləsin.

## Struktur

- `questionairies/` — hər anketin sualları, ballandırma və izahları (`az.ts` / `ru.ts`)
- `locales/` — UI mətnləri və nəticə ekranı mətnləri
- `components/questionnaire/` — anket keçirmə və nəticə ekranı komponentləri
- `app/[locale]/` — səhifələr (locale-ə görə marşrutlaşdırılır)

## Bilinən məhdudiyyətlər

- `/api/chat` marşrutundakı sürət limiti (rate limit) yaddaşda saxlanılır — serverless mühitdə (Vercel) etibarlı qlobal məhdudiyyət vermir; ciddi trafik üçün Redis/Upstash əsaslı həll tövsiyə olunur.
- Nəticələr yalnız istinad məqsədlidir, tibbi diaqnoz deyil.
