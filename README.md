# AYALUZ

Luxury spiritual retreat marketing site — Next.js (App Router), Tailwind CSS v4, Sanity CMS, deployed on Vercel.

## Homepage header (3 CMS components)

| Component | Path | Sanity type |
|-----------|------|-------------|
| Promotional banner | `src/components/banner/PromoBanner.tsx` | `promoBanner` |
| Navigation | `src/components/layout/Navbar.tsx` | `navbar` |
| Hero | `src/components/hero/Hero.tsx` | `hero` |

All three are composed in `HomepageHeader` and loaded from a single Sanity document: **Homepage Header** (`homepageHeader`).

### Micro-elements (editable in CMS)

**Banner:** `enabled`, `icon`, `label`, `message`, `link` (label, href)

**Navbar:** `brandName`, `logo`, `items[]` (label, href per page)

**Hero:** `eyebrow`, `headlineLines` (exactly 3 strings), `paragraph`, `backgroundImage`, `primaryCta`, `secondaryCta`

## Local development

```bash
cp .env.example .env.local
# Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Sanity env vars, placeholder content from `src/lib/cms/placeholders.ts` is used.

## Sanity Studio

Embedded at `/studio` when env vars are set, or run standalone:

```bash
npm run sanity
```

Create one **Homepage Header** document in Studio and publish it.

## Typography

Add licensed **Canela** files to `public/fonts/` and switch `src/app/layout.tsx` to `next/font/local` for brand-accurate type.

## Design system

Colors, spacing, and UI rules follow the AYALUZ design system (Primary Green `#2B4A40`, background `#F6F1E8`, buttons `8px` radius, etc.) in `src/app/globals.css`.
