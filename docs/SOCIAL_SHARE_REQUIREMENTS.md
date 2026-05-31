# Social share preview — assets & requirements

Rich link previews (WhatsApp, iMessage, Telegram, Facebook, Instagram, X, Slack, Discord, LinkedIn) are driven by **Open Graph** and **Twitter Card** metadata on your pages. Each platform reads the same tags; you do not ship separate “templates” per app.

## What you need to provide (per event)

### A. Social share image (required)

| Spec | Value |
|------|--------|
| Size | **1200 × 630 px** (1.91:1) |
| Format | JPG or PNG, optimized (&lt; 300 KB ideal) |
| Content | Event-specific artwork, calm luxury aesthetic, readable at small size |
| File naming | e.g. `ceremony-may-2026-og.jpg` |

Upload to `/public/images/events/` or Sanity asset CDN.

### B. Event title (required)

Short, scannable line for the preview card title.

**Example:** `Ayahuasca Ceremony • Friday • May 26, 2026`

Maps to: `og:title`, `twitter:title`, `navigator.share({ title })`

### C. Event description (required)

One sentence (≈ 80–155 characters works best).

**Example:** `A transformative healing journey in Peru's Sacred Valley.`

Maps to: `og:description`, `twitter:description`, share sheet subtitle text.

### D. Canonical event URL (required)

Dedicated page per event (not only homepage anchor).

**Example:** `https://ayaluz.org/ceremonies/may-2026-ayahuasca`

Maps to: `og:url`, `canonical`, share link `url`.

---

## How previews appear by platform

| Platform | What it uses | Notes |
|----------|----------------|-------|
| **WhatsApp** | Open Graph (`og:image`, `og:title`, `og:description`) | Refetches cache; may take time after deploy |
| **iMessage** | Open Graph | Same as above |
| **Telegram** | Open Graph | Large image card when `og:image` is 1200×630 |
| **Facebook / Messenger** | Open Graph | Use [Sharing Debugger](https://developers.facebook.com/tools/debug/) to refresh cache |
| **Instagram DM** | Open Graph | Link preview in chat |
| **X / Twitter** | `twitter:card=summary_large_image` + OG fallback | Implemented in codebase |
| **Slack / Discord / LinkedIn** | Open Graph | Standard large link unfurl |

There is **no separate HTML template** per network—only correct metadata + a public absolute image URL.

---

## Environment (production)

Set in Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://ayaluz.org
```

Required so `og:image` and share URLs are absolute (`https://ayaluz.org/images/...`), not `localhost`.

---

## Code architecture (already in repo)

| File | Purpose |
|------|---------|
| `src/types/event-share.ts` | `EventShareConfig` type |
| `src/lib/share/event-share-config.ts` | Placeholder homepage config |
| `src/lib/share/build-share-metadata.ts` | Next.js `Metadata` builder |
| `src/lib/share/share-event.ts` | `navigator.share` + clipboard fallback |
| `src/app/page.tsx` | Exports metadata for `/` (temporary) |

When event detail pages exist:

1. Add `src/lib/share/events/[slug].ts` or fetch from Sanity.
2. Call `buildEventShareMetadata(config)` in that page’s `generateMetadata`.
3. Pass the same `EventShareConfig` to `UpcomingEventSection` / share button.

---

## Validation checklist before launch

- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain  
- [ ] OG image returns **200** at absolute URL  
- [ ] Image is **1200×630** (or close; avoid tiny icons)  
- [ ] Test share in WhatsApp (real device)  
- [ ] Test Facebook Sharing Debugger  
- [ ] Test iMessage link paste  
- [ ] Title/description match brand tone  

---

## Current placeholder (homepage)

Until final assets exist:

- **Title:** Ayahuasca Ceremony • AyaLuz  
- **Description:** A transformative healing journey in Peru's Sacred Valley.  
- **Image:** `/images/homepage/hero-jungle-mountain.png`  
- **URL:** `/` (homepage)

Replace with per-event values when `/ceremonies/[slug]` pages are live.
