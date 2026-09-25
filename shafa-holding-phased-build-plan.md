# Shafa Holding — Phased Website Build Plan

This file converts `shafa-holding-nextjs-master-prompt.md` into resumable implementation phases. The master prompt remains the design and content authority; this file controls execution order, checkpoints, asset requests, and handoffs.

## Non-Negotiable Working Rules

1. Do not invent company facts, statistics, awards, certifications, locations, leadership details, testimonials, or business claims.
2. `Shafa Holding - Current Website Content.md` is the factual source. Missing information must remain visibly marked as client-supplied content.
3. **The coding agent must not download, scrape, stock-source, or generate images.**
4. When an image is required, the coding agent must:
   - add a resilient visual placeholder that does not break the layout;
   - specify the required aspect ratio, minimum dimensions, crop/safe area, subject, lighting, tone, and intended page/section;
   - provide a ready-to-copy image-generation prompt for the client; or
   - ask the client to provide an existing suitable image.
5. Client-provided images must be placed in the documented path under `public/images/` and must not be materially altered without approval.
6. Use the supplied logo files when provided. Until then, use a clearly labelled typographic placeholder rather than redrawing the logo.
7. Complete and verify each phase before marking it complete. At the end of every work session, update the Progress Ledger and Resume Point below.
8. Preserve any user changes already present in the repository.

## Status Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Complete and verified
- `[!]` Waiting for client input or asset

## Phase 0 — Project Audit and Execution Setup

Goal: establish the source of truth and a safe, resumable workflow.

- [x] Read the master build prompt.
- [x] Read the supplied current-site content.
- [x] Create this phased build plan.
- [x] Create `ASSET_REQUESTS.md` with a living inventory of required logos, photography, portraits, and optional video.
- [x] Record content conflicts and unsupported claims that require client confirmation.
- [x] Confirm the initial route and content inventory.

Exit criteria:

- The brief, content authority, image rule, routes, and implementation order are documented.
- Any future agent can identify the exact next task from the Resume Point.

## Phase 1 — Next.js Foundation and Design System

Goal: create a runnable, production-oriented application foundation.

- [x] Scaffold Next.js with App Router and TypeScript.
- [x] Configure Tailwind CSS, linting, scripts, and package metadata.
- [x] Create the requested foundational `src/` architecture.
- [x] Establish color, typography, spacing, container, focus, and motion tokens.
- [x] Configure editorial serif and modern sans fonts through `next/font` without runtime font downloads.
- [x] Add base metadata, viewport behavior, and semantic root layout.
- [x] Add foundational UI components: `Container`, `SectionHeading`, `GoldLine`, `LinkArrow`, and media placeholder.
- [x] Add motion primitives with reduced-motion support.
- [x] Add initial README and `.env.example`.
- [x] Run lint, type-check, and production build.

Exit criteria:

- The development server starts successfully.
- Lint, TypeScript, and production build pass.
- The design tokens visibly establish the dark-green, gold, ivory, and editorial typography system.
- Missing images cannot break a page.

## Phase 2 — Global Shell and Navigation

Goal: implement the shared frame used by every route.

- [x] Build a transparent-to-solid sticky header.
- [x] Build the accessible desktop business mega-menu.
- [x] Build the accessible mobile menu and business accordion.
- [x] Integrate the supplied light and dark SVG logo variants in the shared logo component.
- [x] Build the full footer with navigation, business links, address, and legal link.
- [x] Add skip link, keyboard focus handling, and active navigation states.
- [x] Verify keyboard, touch, and reduced-motion behavior at code level, including native disclosures, visible focus, minimum trigger sizes, hidden-menu focus prevention, and reduced-motion rules. Live screenshot/device QA remains part of final QA because no browser automation surface was available.

Exit criteria:

- Navigation works with mouse, keyboard, touch, and screen-reader-oriented attributes.
- Investment and Construction businesses are clearly separated.
- Header and footer behave correctly from 360px through large desktop widths.

## Phase 3 — Homepage Core Narrative

Goal: build the homepage through the business split, using placeholders where media is pending.

- [x] Cinematic hero with eyebrow, headline, copy, CTA, overlay, and controlled motion.
- [x] Legacy / 1982 editorial statement.
- [x] Group introduction.
- [x] Investment / Construction split interaction with keyboard equivalents.
- [x] Create exact image briefs and generation prompts in `ASSET_REQUESTS.md` for every required homepage visual.
- [x] Implement and code-review layouts for 360, 390, 430, 768, 1024, 1280, and 1440px breakpoints. Live visual viewport confirmation remains a shared final-QA item because no browser surface is available.

Exit criteria:

- The first four homepage sections form a coherent “heritage → progress → diversification” story.
- No final image is assumed or generated by the coding agent.
- The business split has no layout shift and no hover-only content.

## Phase 4 — Homepage Supporting Sections

Goal: finish the homepage narrative and conversion path.

- [x] Mission / Vision / Purpose editorial interaction.
- [x] Core Values section.
- [x] Global Presence using verified places only: UAE, United Kingdom, and Tanzania.
- [x] Featured Business Stories.
- [x] Closing statement / CTA.
- [x] Homepage metadata, Organization/WebSite structured data, and code-level responsive/accessibility review. Live visual viewport QA remains deferred until a browser surface is available.

Exit criteria:

- Homepage content is complete, factually source-aligned, responsive, accessible, and visually consistent.
- `7 countries / 3 continents` is used only verbatim if included; unverified country names are not shown.

## Phase 5 — About Page and Leadership

Goal: communicate the group’s history, purpose, and leadership without fabricated details.

- [x] About hero.
- [x] Source-supported company story and timeline.
- [x] Founder and Chairman story for Mr Abdoshamakh Nasser Alshebani.
- [x] Premium leadership layout designed to expand later.
- [x] CEO entry with explicit placeholders for name, portrait, and biography until supplied.
- [x] Mission, vision, purpose, and promise integration as appropriate.
- [x] Add About-page image and portrait briefs to `ASSET_REQUESTS.md`.
- [x] Metadata and code-level responsive/accessibility review.

Exit criteria:

- Chairman details match the supplied content.
- CEO identity, portrait, and biography remain clearly client-supplied placeholders unless verified assets/content are received.

## Phase 6 — Businesses Landing and Investment

Goal: build the portfolio overview and investment category page.

- [x] `/businesses` hero and two-category editorial layout.
- [x] `/businesses/investment` category hero.
- [x] Shafa Farms (UK) feature using only supplied facts.
- [x] Shafa Agro (Tanzania) feature using only supplied facts.
- [x] Accessible external-link treatment.
- [x] Add exact investment image briefs and prompts to `ASSET_REQUESTS.md`.
- [x] Metadata and code-level responsive/accessibility review.

Exit criteria:

- Both businesses use the shared detail pattern while retaining distinct visual rhythm.
- External URLs and factual claims match the source content.

## Phase 7 — Construction Businesses

Goal: build the construction category page and its three operating-business stories.

- [x] `/businesses/construction` category hero.
- [x] Shafa Al Nahdah Building Contracting LLC feature.
- [x] Shafa Ready Mix feature.
- [x] Plane Wood Carpentry by Shafa feature.
- [x] Add exact construction image briefs and prompts to `ASSET_REQUESTS.md`.
- [x] Verify external links and source claims.
- [x] Metadata and code-level responsive/accessibility review.

Exit criteria:

- The page clearly communicates construction, infrastructure, materials, and specialist production.
- Claims and dates remain faithful to the supplied source.

## Phase 8 — Contact, Legal, Error, and Form States

Goal: complete utility routes and robust interaction states.

- [x] Contact page with verified Dubai address.
- [x] Contact form fields and accessible client/server validation.
- [x] Placeholder submission endpoint with no secret or paid provider assumption.
- [x] Success, error, pending, and spam-protection extension points.
- [x] Privacy page with clearly marked client/legal placeholders where required.
- [x] Branded custom 404, loading state and error boundary.
- [x] Graceful missing-media behavior across the site.

Exit criteria:

- Form behavior is safe and testable without credentials.
- Legal content is not fabricated.
- Error and missing-content states look intentional.

## Phase 9 — Content, SEO, Accessibility, and Performance Pass

Goal: harden the complete site before visual asset integration.

- [x] Unique titles, descriptions, canonical URLs, and Open Graph metadata.
- [x] Organization, WebSite, and breadcrumb structured data where validated.
- [x] Full heading and landmark code audit.
- [x] Keyboard and focus code audit.
- [x] Contrast and reduced-motion code audit.
- [x] Image strategy, sizing requirements and media fallback audit. `next/image` integration is intentionally deferred until real client assets exist.
- [x] Client/server component boundary and bundle review.
- [x] Broken internal route, external-link and production-response checks.
- [!] Lighthouse target measurement requires an available browser surface and final production imagery; implementation targets are documented in `FINAL_QA.md`.

Exit criteria:

- Performance target: 90+; Accessibility, Best Practices, and SEO targets: 95+ where tooling/environment permits.
- No known console errors, hydration warnings, broken internal links, or inaccessible navigation paths.

## Phase 10 — Client Asset Integration and Final QA

Goal: integrate only assets supplied or manually generated by the client and prepare deployment.

- [!] Receive and inventory approved logos and images — waiting for client-supplied or client-generated assets.
- [!] Place assets in the exact documented paths — waiting for the assets above.
- [x] Document intended alt meaning for every requested image; final alt text will be confirmed with the supplied asset.
- [!] Tune crop, focal points, responsive sizes, and hero priority — requires final assets.
- [!] Confirm official logo contrast and clear space — requires official logo files.
- [!] Run live viewport screenshots — browser surface unavailable and final assets pending.
- [x] Run lint, type-check, production route tests, endpoint tests and production build.
- [x] Complete final content-accuracy comparison against the source file.
- [x] Finalize deployment instructions and environment documentation.

Exit criteria:

- The application is production-ready and all approved client assets are correctly integrated.
- Any remaining client-owned content gaps are listed explicitly rather than silently filled.

## Image Request Template

Every new entry in `ASSET_REQUESTS.md` should use this structure:

```txt
Asset ID:
Page / section:
Status: Needed | Supplied | Approved | Integrated
Preferred source: Client-provided photo | Client-generated image
Orientation / aspect ratio:
Minimum dimensions:
Subject and setting:
Composition and safe areas:
Lighting / color direction:
Avoid:
Accessibility / intended alt meaning:
Suggested file path:
Ready-to-copy generation prompt:
```

Generation prompts must request photorealistic, editorially restrained imagery suitable for an established UAE holding group. They must not request visible third-party logos, false Shafa branding, unverifiable projects, identifiable real executives, awards, statistics, or certifications.

## Progress Ledger

| Date | Phase | Status | Work completed | Verification | Next action |
|---|---:|---|---|---|---|
| 2026-09-25 | 0 | Complete | Master brief and source content reviewed; phased plan, asset policy, and content-gap inventory created | Documentation reviewed | Begin application foundation |
| 2026-09-25 | 1 | Complete | Next.js foundation, design tokens, fonts, metadata, UI/motion primitives, content data, README, and initial hero/legacy composition created | Lint, type-check, and production build pass | Begin Phase 2 global shell and navigation |
| 2026-09-25 | 2 | Complete | Sticky header, desktop mega-menu, mobile accordion menu, logo placeholder, footer, skip link, focus handling, hidden-menu focus prevention, and reduced-motion behavior implemented | Lint, type-check, production build, and HTTP content checks pass; live browser surface was unavailable | Integrate official logos when supplied; continue Phase 3 |
| 2026-09-25 | 3 | Complete | Hero, legacy, group introduction and responsive Investment/Construction split implemented with hover and keyboard focus parity; client image briefs documented | Lint, type-check, production build, and HTTP checks pass; live viewport confirmation is tracked in final QA | Continue homepage supporting sections |
| 2026-09-25 | 4 | Complete | Mission/Vision/Purpose tabs, core values, verified global presence, featured stories, closing CTA, homepage canonical metadata and structured data implemented; HOME-04 and HOME-05 client image prompts documented | Lint, type-check, production build, and HTTP content checks pass; live screenshot QA remains unavailable | Begin Phase 5 About page and leadership |
| 2026-09-25 | 5 | Complete | About hero, company story, source-supported timeline, promise, Founder and Chairman profile, explicit CEO placeholders, metadata and three asset briefs implemented | Lint, type-check, production build, and `/about` HTTP/content checks pass | Begin Phase 6 businesses landing and investment pages |
| 2026-09-25 | 6 | Complete | Businesses landing, Investment hero, Shafa Farms and Shafa Agro features, metadata, breadcrumbs and image briefs implemented | Build and route checks pass; supplied external URLs return 200 | Begin construction category |
| 2026-09-25 | 7 | Complete | Construction hero and three operating-business features implemented with source-bound copy, shared components and image briefs | Build and route checks pass; supplied external URLs return 200 | Begin utility routes and states |
| 2026-09-25 | 8 | Complete | Contact page/form, validated unconfigured route handler, honeypot, privacy placeholder, loading/error UI and branded 404 implemented | Route and endpoint status tests pass | Complete hardening pass |
| 2026-09-25 | 9 | Complete with measurement deferred | Metadata, schema, robots, sitemap, manifest, headers, accessibility and component-boundary review completed | Automated checks pass; Lighthouse requires browser surface and final assets | Complete launch handoff |
| 2026-09-25 | 10 | Client inputs pending | Engineering, QA documentation and deployment handoff complete; all missing assets/content are explicitly inventoried | Lint, type-check, build, HTTP, endpoint and external-link checks pass | Client supplies approved assets, CEO/contact/legal data, production domain and form provider |

## Resume Point

**Current phase:** All engineering phases complete. Phase 10 asset integration is waiting only for client-owned assets and approvals that the coding agent is prohibited from fabricating or sourcing.

**Next exact task:** Receive the official logos, approved/generated photographs, verified CEO content, public contact details, final domain, approved privacy policy and contact-provider choice; then integrate them using `ASSET_REQUESTS.md` and run the deferred visual/Lighthouse checks.

**Important:** Do not generate or download any image. Use CSS/media placeholders and give the client a precise prompt or request for every needed visual.

## Content Clarifications and Risk Notes

- The CEO name, biography, portrait, and approved exact title have not been supplied. Keep explicit placeholders until the client provides them.
- Official light and dark SVG logo files are supplied and integrated from `public/logo-white.svg` and `public/Shafa-logo.svg`.
- The current content says the construction business has operated for “over 35 years.” Because that wording is time-sensitive and now inconsistent with a 1982 founding date, use “more than four decades” or the verified founding year instead.
- The “over a thousand employees” and “seven countries across three continents” statements are source-supplied but time-sensitive. Retain them only exactly as source claims unless the client provides updated numbers.
- The Shafa Farms claim describing the operation as the UK’s largest non-stun, non-gas halal processing facility may require current client/legal confirmation before prominent publication.
- Contact email, phone, canonical production domain, form recipient, and approved privacy copy remain missing.
