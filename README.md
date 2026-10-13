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

The home page uses four project-specific compositions keyed by slug, ordered by rank. Case chapters have stable IDs and `stack`, `split` or `wide` layouts. Cross-page fragment links focus and scroll to their chapter; query-only filter changes preserve the scroll position.

## Media

Optimized public media is in `public/media/`. Original recordings and capture tooling are kept outside the website. The historical `Assets/` folder is retained as existing repository content but is no longer imported or deployed.

Images have responsive WebP variants and JPEG full-size fallbacks. `showcase` is reserved for a reviewed main film; focused clips belong beside their technical explanation. Each asset declares its purpose as `showcase`, `evidence` or `illustration`.

Videos use H.264, faststart and native controls. Only the poster is mounted before a play action; the video element and its source are created on demand. Starting a film pauses other films, and leaving its page or closing the Ink dialog stops playback. Silent controlled captures and separate takes are labeled. See `MEDIA_CREDITS.md` for source context.

Instrument Sans and Newsreader are self-hosted WOFF2 subsets. Their copyright and license files are in `public/fonts/`.

## Build and hosting

The build checks TypeScript, builds the client, validates public media paths, showcase types and unique chapter IDs, then generates static pages, metadata, sitemap and robots.txt from a temporary server bundle. Only `dist/` is hosted; the server bundle is not published.

The small shared stylesheet is inlined in the static pages to avoid a render-blocking request. Responsive covers include mobile sizes, and the self-hosted fonts retain only the used character and variable-axis ranges.

`vercel.json` preserves the existing route structure. The former AR and VR routes redirect to Work. Unknown routes return the generated 404 page with a 404 status.

Use a non-production branch for preview deployment in the existing Vercel project. Review that preview before promoting the update. The upgrade baseline is commit `c38c84cc188df363d445a0d660cb97da31b5b844`; retain the previous successful production deployment for rollback.

## Editing boundaries

All source, comments and public copy are English. Do not add unverified achievements, performance figures, role claims, availability dates or resume links. Game-source changes are outside the website's maintenance scope.
