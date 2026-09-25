# Shafa Holding Website

Production-ready Next.js App Router rebuild for Shafa Holding, based on `shafa-holding-nextjs-master-prompt.md` and the supplied current-site content.

## 1. Install

Requires a current Node.js LTS-compatible runtime and npm.

```bash
npm install
```

The package scripts invoke local CLI files through Node so they continue to work when the Windows workspace path contains `&`.

## 2. Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

## 3. Build

```bash
npm run lint
npm run typecheck
npm run build
```

## 4. Start Production

```bash
npm run start
```

Set `PORT` in the host environment if the server should listen on a port other than 3000.

## 5. Asset Locations

- `public/logos/` — official client-supplied light and dark logo artwork
- `public/images/home/` — homepage photography
- `public/images/about/` — About hero photography
- `public/images/leadership/` — approved real executive portraits
- `public/images/investment/` — investment category and business photography
- `public/images/construction/` — construction category and business photography

The application currently renders deliberate media placeholders. See `ASSET_REQUESTS.md` for filenames, dimensions, crop guidance and ready-to-copy prompts. The coding agent must not download or generate imagery. Executive portraits require official client-provided assets.

## 6. Content Locations

- `src/data/site.ts` — company identity, address and purpose statements
- `src/data/businesses.ts` — business names, categories, links and planned image paths
- `src/data/navigation.ts` — global and mega-menu navigation
- `src/data/values.ts` — source-approved core values
- `Shafa Holding - Current Website Content.md` — factual source authority

Missing facts remain explicitly labelled and must not be invented. The CEO name, biography and portrait remain client-owned inputs.

## 7. Environment Variables

Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_SITE_URL` — canonical public URL used by metadata, structured data, robots and sitemap
- `CONTACT_FORM_RECIPIENT` — reserved for the approved server-side form integration
- `CONTACT_PROVIDER_API_KEY` — reserved for the approved provider; never expose it to client components

## 8. Contact Form Integration

`POST /api/contact` currently provides:

- server-side JSON validation;
- email-format and message-length checks;
- a honeypot field for basic bot filtering;
- explicit `422`, `400` and unconfigured-service responses;
- no persistence and no false success response.

Before launch, connect the route handler to an approved email or CRM provider, set the recipient and secret in the host environment, add provider error handling, and introduce production-grade rate limiting at the hosting or durable-storage layer. Update the privacy policy to describe the actual data flow and retention behavior.

## 9. Deployment Notes

### Vercel

Import the repository, set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain, add approved contact-provider secrets, and deploy using the standard Next.js preset.

### Node / VPS / Hostinger

1. Install production dependencies with `npm ci`.
2. Set environment variables outside the repository.
3. Run `npm run build`.
4. Run `npm run start` behind a reverse proxy with HTTPS.
5. Use a process manager supported by the host.
6. Forward the real client IP only through trusted proxy configuration before adding IP-based rate limiting.

Security response headers are configured in `next.config.ts`. Replace the localhost canonical URL before public deployment.

## Project Structure

- `src/app/` — routes, route handler, metadata files and global states
- `src/components/layout/` — header, menus and footer
- `src/components/sections/` — editorial page sections and business patterns
- `src/components/forms/` — contact interaction and status UI
- `src/components/ui/` — reusable visual primitives
- `src/components/motion/` — reduced-motion-aware animation primitives
- `src/components/seo/` — structured-data helper
- `ASSET_REQUESTS.md` — client asset specifications and prompts
- `shafa-holding-phased-build-plan.md` — implementation phases and progress ledger
