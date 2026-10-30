# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install deps (npm, lockfile is package-lock.json)
npm run dev          # Next dev server on http://localhost:3000
npm run build        # production build (output: standalone, used by the Dockerfile)
npm run lint         # next lint (eslint-config-next); there is no test suite
npx sanity deploy    # push schema/Studio changes to https://klub-ada.sanity.studio (manual step after editing sanity/schemaTypes)
```

Required env (`.env` / `.env.local`, both currently committed): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (or the `SANITY_STUDIO_*` equivalents, see `sanity/env.ts`). `LOOPS_API_KEY` is needed only by `src/app/api/subscribe/route.ts`.

## Stack

Next.js 15 App Router, React 18, TypeScript, Tailwind 3 (CSS-variable palette in `src/app/[locale]/globals.css`, mapped in `tailwind.config.ts`), `tailwind-variants` + `clsx` for component variants, `motion` for animation, `next-intl` for i18n, Sanity v3 as CMS (embedded Studio via `next-sanity`). Path alias `@/*` maps to the repo root, so imports look like `@/src/app/...` and `@/sanity/lib/...`.

## Architecture

### Three sites in one app, split by route group and subdomain

- `src/app/[locale]/(website)/` — the main klub-ada.si site. Slovenian route names (`o-nas`, `dogodki`, `partnerstvo`, `blog`). Each page folder holds its `page.tsx` plus section components (`hero.tsx`, `team.tsx`, ...) colocated next to it.
- `src/app/hack/[locale]/` — the hackathon site served at **hack.klub-ada.si**. `src/middleware.ts` detects the `hack` subdomain and *rewrites* `/{locale}/...` to `/hack/{locale}/...`, so the visible URL never contains `/hack`. It is a retro "desktop" UI: `components/desktop.tsx` is the backdrop, `pages.ts` is the single list of subpages that become desktop shortcuts, and each subpage renders inside `components/window.tsx`. Add a hackathon subpage by adding a route folder and an entry in `pages.ts` (icon is resolved as `/assets/hackathon26/<slug>.png`).
- `src/app/_hack25/` — the previous year's hackathon site, kept but unrouted (Next ignores `_`-prefixed folders). Treat as reference, not live code.
- `src/app/[locale]/studio/[[...tool]]/` — Sanity Studio mounted at `/sl/studio` and `/en/studio` (`sanity.config.ts` defines one workspace per locale).

Each of the three sections has its **own root layout** (`<html>`/`<body>`) and its own `NextIntlClientProvider`; `src/app/[locale]/layout.tsx` also injects MailerLite, Microsoft Clarity and Google Analytics scripts.

### i18n

Locales are `sl` (default) and `en`, configured in `src/i18n/routing.ts`. Messages live in `messages/{sl,en}.json`, grouped by top-level namespace (`Blog`, `Hero`, `Hackathon`, `Hackathon25`, ...). Always import `Link`, `useRouter`, `usePathname`, `redirect` from `@/src/i18n/navigation`, not from `next/navigation`, so locale prefixes are preserved. Sanity documents are translated with `@sanity/document-internationalization`: translated types (`teamMember`, `activity`, `post`, `event`) carry a hidden `language` field, and GROQ queries filter on `language == $language` using `useLocale()`.

### Data fetching from Sanity

Almost all content components are `"use client"` and fetch with the `useSanityData({ query, params })` hook in `src/app/utils/use-sanity-data.tsx`, which wraps `client.fetch` (CDN-backed client in `sanity/lib/client.ts`) and returns `{ data, isLoading, error }`. GROQ queries are defined as constants at the top of the component file that uses them. `sanity/lib/live.ts` (`sanityFetch`/`SanityLive`) exists but is not wired in. Images go through `imageLoader(src, width?)` in `src/app/utils/image-loader.ts`, which builds a Sanity CDN URL (pass a width to get a resized webp). Shared TS shapes for documents are in `src/app/utils/interface.ts`.

Schema types live in `sanity/schemaTypes/` and must be registered in `sanity/schemaTypes/index.ts`; `sanity/structure.ts` controls Studio's sidebar ordering. Hackathon content uses `hack26*` / `hackathon*` types.

### UI components

Shared primitives (`Button`, `LinkButton`, `Link`, `Heading`, `Paragraph`, `Card`, `PageWrapper`, ...) are in `src/app/[locale]/components/`. They use `tailwind-variants` (`tv()`) for size/variant props and the polymorphic `ForwardRefComponent` type from `src/app/utils/polymorphic.ts` to support an `as` prop. The hackathon site has its own styled variants of `button`, `link-button`, `link`, `page-wrapper` under `src/app/hack/[locale]/components/`, but reuses `Paragraph`/`Heading` from the main site.
