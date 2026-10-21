# Shafa Holding Website

Corporate website and content management system for Shafa Holding, built with Next.js (App Router), Tailwind CSS and MySQL.

## Requirements

- Node.js 20 or later
- MySQL 5.7+ / MariaDB 10.3+ (or MySQL 8)

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open `http://localhost:3000`. The CMS sign-in page is at `http://localhost:3000/admin/login`.

## Scripts

```bash
npm run dev         # development server
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run build       # production build (standalone output)
npm run start       # serve the production build
```

Set `PORT` in the host environment to listen on a port other than 3000.

## Content Management (CMS)

All page copy, images, leadership, businesses, company details and SEO text are managed in the built-in CMS, stored in MySQL. Sign in at **`/admin/login`**; all other `/admin` addresses return 404 to signed-out visitors.

- **Pages & content** — every page of the site, plus site settings (address, phone, email, footer, default SEO and contact notification emails). Published changes go live immediately.
- **Contact inbox** — contact form submissions with new/read/archived status, search, reply-by-email and CSV export.
- **Media library** — uploaded images are stored in the database, so they are preserved across deployments. Images in use cannot be deleted.
- **Users** — add or remove CMS users and change passwords.

`src/cms/defaults.ts` holds the original content. It is used until a page is edited, fills any field missing from saved content, and is what “Restore original” returns to. `src/cms/schema.ts` defines the editor form for each page. To add a new editable field, add it to both files and render it in the relevant page or section.

Database tables are created automatically on first use. The first administrator is created from `CMS_ADMIN_EMAIL` / `CMS_ADMIN_PASSWORD` the first time someone signs in while no users exist; remove those variables afterwards and change the password under **Users**.

If the database is unreachable, the public site continues to render the built-in content and the contact form reports that it is temporarily unavailable.

## Environment Variables

See `.env.example`.

- `NEXT_PUBLIC_SITE_URL` — canonical public URL used by metadata, structured data, robots, sitemap and notification emails
- `DATABASE_URL` — MySQL connection string, e.g. `mysql://user:password@localhost:3306/shafa` (or `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`)
- `CMS_ADMIN_EMAIL`, `CMS_ADMIN_PASSWORD`, `CMS_ADMIN_NAME` — first administrator (only used while no users exist)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — optional; enables email notifications for new inquiries
- `CONTACT_NOTIFY_TO` — fallback notification recipients (comma separated) when none are set in CMS → Site settings

## Contact Form

`POST /api/contact` validates submissions (required fields, email format, message length and a honeypot field), limits each IP address to 5 submissions per 10 minutes, stores them in the `contact_submissions` table and, when SMTP is configured, emails the notification recipients with the visitor as reply-to. Submissions are always kept in the CMS inbox, even if an email fails to send.

## Deployment

The build uses `output: "standalone"`.

1. Create a MySQL database and user.
2. Set the environment variables above on the host.
3. Run `npm ci && npm run build`.
4. Copy `.next/standalone`, `.next/static` (to `.next/static`) and `public` to the server and start `node server.js`, or run `npm run start` from the project.
5. Serve behind HTTPS.

A `Dockerfile` is included that produces the same standalone bundle (`docker build --target production .`).

Security response headers are configured in `next.config.ts`.

## Project Structure

- `src/app/(site)/` — public pages
- `src/app/admin/` — CMS screens, server actions and media upload API
- `src/app/api/contact/` — contact form endpoint
- `src/app/media/` — serves CMS-uploaded images
- `src/cms/` — database access, content defaults and editor schema, authentication, inbox, media and mail
- `src/components/layout/` — header, menus and footer
- `src/components/sections/` — page sections
- `src/components/forms/` — contact form
- `src/components/ui/` — shared UI primitives
- `src/components/motion/` — animation and smooth-scroll helpers
- `src/components/seo/` — structured-data helper
- `public/` — logos and built-in imagery
