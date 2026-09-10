# Amir Amani — personal portfolio

A small, static Next.js App Router portfolio for a developer and technical lead working with two collaborators. Five pages: Home, Services, Work, About, and Contact. The main offer is the Website Rescue Sprint and the primary action is asking for a tailored example.

## Run locally

Use Node.js 22 or 24 LTS and npm. The lockfile records the exact compatible dependencies installed for this project.

```sh
npm ci
cp .env.example .env.local
# Set your domain, email, and optional social links in .env.local.
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp` if needed, and `npm.cmd` if your execution policy blocks `npm.ps1`. The development server prints its local URL.

```sh
npm run lint
npm run typecheck
npm run build
node scripts/check-export.mjs
npm run preview
```

The preview serves the production export at `http://127.0.0.1:3000`. Set `PORT` to change it. `npm run check` runs lint, strict type checking, the production build, and export checks in sequence. If running type checking before the first build, Next generates its route types during the build.

For the included Lighthouse audit, serve the preview on port 3001 (`$env:PORT='3001'; npm.cmd run preview` in PowerShell), then run `npm run audit` in another terminal. It checks all five pages on mobile and the homepage on desktop. Set `AUDIT_ORIGIN` to test a different origin. The preview supplies gzip compression and cache headers to reflect normal production hosting.

## Configuration and launch placeholders

All values below are public build-time values, not secrets. Changes require a rebuild. No email provider, API key, database, CMS, authentication, or paid service is needed.

| Value | Location | Before public launch |
| --- | --- | --- |
| Domain | `NEXT_PUBLIC_SITE_URL` in `.env.local` or deployment environment | Replace `https://example.com` with your actual HTTPS origin. Without this variable the private Sites preview origin is used. This feeds canonical, OG, sitemap, robots, and schema URLs. |
| Email | `NEXT_PUBLIC_CONTACT_EMAIL` | Replace `hello@example.com` with an inbox you control. Until then the Contact page visibly states that the email is a placeholder. The placeholder email is omitted from structured data. |
| GitHub | `NEXT_PUBLIC_GITHUB_URL` | Optional verified profile URL. Empty means no link is rendered. |
| LinkedIn | `NEXT_PUBLIC_LINKEDIN_URL` | Optional verified profile URL. Empty means no link is rendered. |
| Project images | `image: null` and `imageAlt` in `src/lib/content.ts` | Optional replacements for the built-in, clearly labeled interface studies. Use a real local image path under `public/projects/` and descriptive alt text. |
| Project URLs | `url: null` in `src/lib/content.ts` | Supply verified URLs when real demos exist. Empty values render no external project link. |
| Project status and technology | `src/lib/content.ts` | Keep Concept/Demo labels and proposed technology descriptions until you have evidence for a real implementation. Never substitute fictional client results. |

The preview contains made-up business names and shipping references solely within labeled concepts and demos. These are not clients. There are no testimonials, customer logos, awards, or performance claims.

## Contact behavior

The site uses a normal `mailto:` link and a readable, copyable email address. The email-draft action adds a subject and a short set of prompts. The visitor sends the message in their own email application. Nothing is sent or collected by this website, and no success message pretends otherwise.

An embedded form is intentionally omitted. If you add one later, configure an actual email provider or server endpoint, validation, rate limiting, and honest success/error handling first. A static export cannot run an App Router POST handler; use an external form endpoint or switch to a server-capable deployment. Provider secrets must never use the `NEXT_PUBLIC_` prefix.

## Structure

```text
src/app/                 Five routes, root layout, SEO routes, favicon, stylesheet
src/components/          Shared header/footer, sections, buttons, concept previews
src/lib/site.ts          Validated public config, mailto builder, metadata helper
src/lib/content.ts       Services and honestly labeled project content
public/og.png            1200 × 630 social preview
scripts/preview.mjs      Local static production preview
scripts/check-export.mjs Export metadata, heading, schema, and link checks
.openai/hosting.json     Private Sites identifier and static output directory
```

All authored page and layout components are Server Components. Navigation uses reusable native links so it works on static hosting without client-router requests. The mobile navigation uses visible wrapping links and needs no JavaScript menu. FAQs use native `details` and `summary`. Next still includes its framework runtime; this is not a zero-JavaScript claim.

## Images and performance

The main pages use semantic text and lightweight interface studies instead of large hero photos, remote fonts, video, or animation libraries. No external font fetch is needed. Concept previews have reserved aspect ratios. The social card is for sharing and is not downloaded as a homepage hero.

The project uses `output: 'export'`. Next's server image optimizer is unavailable on static hosting, so `images.unoptimized` is explicitly enabled. Any replacement raster project images must be compressed before deployment: prefer AVIF/WebP, limit their dimensions to the displayed size (roughly 960px wide for these cards), and preserve explicit width/height. The built-in preview graphics are CSS/HTML and scale without raster downloads. If you switch to a Next server host, remove `images.unoptimized` to enable automatic Next image optimization.

Lighthouse is a lab measurement, not a guarantee of real-user Core Web Vitals. Recheck the public domain after final content, hosting, and image changes; actual field metrics require real traffic. Audit the production preview, not `next dev`.

## Deploy

### Static host (Cloudflare Pages, Netlify, or equivalent)

1. Set the public environment values above in the build environment.
2. Install with `npm ci` and build with `npm run build`.
3. Publish **only `out/`**. The export includes prerendered HTML for every route and SEO assets.
4. Serve directory URLs such as `/services/` from their `index.html`. Use `404.html` for missing routes with a real 404 response, not an SPA catch-all returning 200.
5. Enable HTTPS. Cache `/_next/static/` assets for a year with `immutable`; keep HTML on a short cache/revalidation policy. Configure compression at the host.
6. Check canonical URLs, email, social preview, and mobile behavior on the actual public domain. Submit `/sitemap.xml` in Search Console if desired.

### Vercel

Import this directory as a Next.js project. Set the environment values, use `npm run build`, and preserve the static export configuration. No persistent server or database is required.

### Private Sites preview

`.openai/hosting.json` declares `out` as the static output. The supplied Sites origin is a private review destination until access is deliberately changed. Private access means search engines cannot index the preview, even though the exported HTML has production-ready SEO metadata. Set your final domain and email and rebuild before a public launch.

## Accessibility and content decisions

- Semantic landmarks, one H1 per content page, ordered section headings, and a skip link.
- Visible keyboard focus, real links, native FAQ controls, and readable mobile navigation.
- Body text respects browser zoom; layouts stack for narrow viewports.
- Reduced-motion support and no autoplay, parallax, or motion-dependent interactions.
- Concept previews have descriptive accessible labels; decorative internal text is hidden from assistive technology.
- Iran is stated openly in the About page and footer; no location or agency-size misrepresentation.
- No invented testimonials, case-study metrics, famous clients, logos, or awards.

## Validation

See `VALIDATION.md` for the checks actually run and their limits. Export checks verify every public page's unique title and description, social tags, one H1, Person and ProfessionalService schema, and internal links; they also check the sitemap, robots file, social card, and favicon.

Framework reference: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).

