# Hongtao Gao - Portfolio

An English game programming and technical art portfolio, built with React, TypeScript and Vite. The static production build contains complete HTML for each public page, then hydrates for navigation, filters and interactive explanations.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
npm run build
npm run preview
```

Open the Local URL printed by the preview server. The preview serves the production build, including case-study URLs, video byte ranges, legacy redirects and real 404 responses. Development hot reload is available through `npm run dev`.

## Check a change

```sh
npm test
node scripts/lighthouse.mjs
```

The browser tests use an installed Google Chrome in headless mode. Lighthouse uses the available Chromium installation. The tests start the production preview server if needed; run a build first. Performance checks expect the preview server to be running.

Reports and screenshots are written to ignored `verification/`, `test-results/` and `playwright-report/` directories. These are not deployed.

## Content

- `src/data/projects.ts`: four featured cases and One More Second.
- `src/data/oasis.ts`: the supporting environment study.
- `src/data/studies.ts`: four retained studies and their existing URLs.
- `src/data/asset-index.json`: dimensions and responsive image variants.
- `src/types/project.ts`: the public content model.

Only curated public entries belong in these modules. Public arrays require PublishedProjectRecord, so a draft entry cannot be added accidentally. Project type, optional completion status and publication status are independent; omit completion status when it is unverified. Keep drafts, source paths, session records and private evidence outside the checkout. There is no client-side draft filter that could accidentally ship draft content.

Featured order is explicit. A project can belong to both Programming and Technical Art. Work filters use the `track` query parameter and remain hydration-safe on direct links.

## Media

Optimized public media is in `public/media/`. Original recordings and capture tooling are kept outside the website. The historical `Assets/` folder is retained as existing repository content but is no longer imported or deployed.

Images have responsive WebP variants and JPEG full-size fallbacks. Videos use H.264, faststart and click-to-play controls with `preload="none"`. Silent controlled captures are labeled; they are not presented as manual gameplay tests. See `MEDIA_CREDITS.md` for source context.

## Build and hosting

The build checks TypeScript, builds the client, renders a temporary server bundle, then generates static pages, metadata, sitemap and robots.txt. Only `dist/` is hosted; the server bundle is not published.

`vercel.json` preserves the existing route structure. The former AR and VR routes redirect to Work. Unknown routes return the generated 404 page with a 404 status.

Use a non-production branch for preview deployment in the existing Vercel project. Review that preview before promoting the update. The upgrade baseline is commit `c38c84cc188df363d445a0d660cb97da31b5b844`; retain the previous successful production deployment for rollback.

## Editing boundaries

All source, comments and public copy are English. Do not add unverified achievements, performance figures, role claims, availability dates or resume links. Game-source changes are outside the website's maintenance scope.
