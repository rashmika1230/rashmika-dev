# rashmika.dev — portfolio

Personal portfolio of **Rashmika Lakshan**, a backend Java developer and DevOps enthusiast from Sri Lanka.
It's a single page in black and white, with one signal-orange accent (`--accent`) kept for small details,
and an animated architecture diagram in the hero. Sections: about,
skills, selected work, journey and contact.

Live: https://rashmika1230.github.io/rashmika/

## Stack

- [Astro](https://astro.build) 7, static output, TypeScript (strict)
- Plain scoped CSS per component, with global tokens in `src/styles/global.css` (no Tailwind)
- `astro:assets` `<Image>` for project screenshots (responsive WebP, lazy-loaded)
- Tech logos from [simple-icons](https://simpleicons.org) (CC0) and [devicon](https://devicon.dev) (MIT), saved as single-colour SVGs
- Vanilla JS only for the scroll-reveal animation and the mobile menu (no React/Vue)
- Fonts: Inter Tight + Instrument Serif (Google Fonts)
- `@astrojs/sitemap` for `sitemap-index.xml`
- GitHub Pages via GitHub Actions, plus Lighthouse CI on pull requests

## Run locally

Requires Node.js 22.12+ (CI uses Node 24).

```sh
npm install
npm run dev        # http://localhost:4321/rashmika/
```

Other scripts:

```sh
npm run build      # type-check (astro check) + build to dist/
npm run preview    # serve the built site
```

## Project structure

```
src/
  data/            ← all text content lives here
    profile.ts     name, links, email, hero, about, contact, footer
    skills.ts      skill groups
    projects.ts    project cards
    journey.ts     timeline cards
  components/      Nav, Hero, HeroDiagram, StackStrip, TechLogo, SectionHead, About,
                   Skills, Projects, ProjectCard, ProjectArt, Journey, Contact, Footer
  assets/
    icons/         tech logos for the strip (fill="currentColor")
    projects/      project screenshots (order-system.webp, globaltrade.webp, …)
    portrait.webp  About photo, also used as the social share (Open Graph) image
  layouts/BaseLayout.astro   <head>, SEO / Open Graph tags, fonts, nav, footer
  styles/global.css          colour tokens and shared styles
  utils/url.ts               adds the base path to site-relative links
public/            favicon.svg, cv.pdf (placeholder), robots.txt
design-reference.html        the approved design this site recreates
```

## Edit content

- **Email:** set `email` in `src/data/profile.ts` (currently a TODO placeholder).
- **WhatsApp:** set `whatsapp.number` in `profile.ts`, digits only in international format, e.g. `94771234567`.
  You can also set `whatsapp.display`, e.g. `+94 77 123 4567`. The WhatsApp row stays hidden while the number is empty.
- **CV:** replace `public/cv.pdf` with your real CV, keeping the same file name.
- **Project screenshots:** save them in `src/assets/projects/` with the names given in `projects.ts`
  (`order-system.webp`, `globaltrade.webp`, `smartcity360.webp`, `smart-access.webp`). 16:10 works best.
  If a project has no `image`, or its file isn't there yet, the card shows its `art` illustration
  with a "Sample image" label. Nothing breaks while images are missing.
- **Portrait:** replace `src/assets/portrait.webp`, keeping the same name (4:5 works best). The alt text and the
  "Based in Sri Lanka" caption are in `profile.ts` under `about.portrait`.
- **Jakarta EE logo:** `src/assets/icons/jakartaee.svg` is a placeholder "EE" badge (TODO). Replace it with the
  official logo as a single-colour SVG that uses `fill="currentColor"`.
- **Accent colour:** change `--accent` in `src/styles/global.css`.
- **Project links:** every project's `repoUrl` points to the GitHub profile for now. Change each one to its repository.
- **Footer note:** `footer.note` in `profile.ts` still says the email and dates are placeholders. Update it once they're real.

## Contact form (Web3Forms)

The "Send a message" form posts JSON to [Web3Forms](https://web3forms.com) from the browser, so it works on
static GitHub Pages without a backend. Messages arrive in the inbox you register with Web3Forms.

1. Get a free access key at https://web3forms.com, using the email you want messages sent to.
2. **Local:** copy `.env.example` to `.env` and set `PUBLIC_WEB3FORMS_KEY=<your key>`. `.env` is gitignored.
3. **GitHub:** go to **Settings → Secrets and variables → Actions → New repository secret**.
   Name it `WEB3FORMS_KEY` and paste the key. The deploy workflow passes it to the build.

Web3Forms keys are meant to sit in client-side code and can only send mail to your inbox. The secret just keeps
the key out of the repo. Without a key, the form still validates, but sending shows the "couldn't be sent" error
with your email address as a fallback. The form only ever shows "Message sent" when Web3Forms answers
`success: true`. A hidden `botcheck` honeypot filters simple spam bots.

All form text lives in `profile.ts` under `contact.form`: topics, labels, placeholders, error messages and the email subject.

### Add a project

Add an object to the `projects` array in `src/data/projects.ts`:

```ts
{
  title: 'Payment ',           // plain part (keep a trailing space if there's a gap before the accent)
  titleAccent: 'Gateway',      // italic serif part
  year: '2026',
  description: 'One or two sentences about what it is and what you learned.',
  tags: ['Spring Boot', 'Kafka', 'Docker'],
  repoUrl: 'https://github.com/rashmika1230/payment-gateway',
  liveUrl: 'https://example.com', // optional: adds a "Live ↗" pill
  image: {                         // optional
    src: 'payment-gateway.webp',   // file in src/assets/projects/
    alt: 'Payment Gateway dashboard showing recent transactions',
  },
  art: 'order',                    // optional fallback illustration: whatsapp-agent | order | trade | city | access
  featured: true,                  // optional: adds a "Latest" pill next to the year
  subtitle: 'Payments for small shops', // optional: small grey line above the title
  demoUrl: 'https://youtu.be/…',   // optional: adds a "Watch demo ↗" button
},
```

Cards render in array order in a horizontal scroller: two visible on desktop, one (with the next peeking in) under 860px. Put a `featured` project first. Nothing else needs to change.

## Deployment

### GitHub Pages (`.github/workflows/deploy.yml`)

Every push to `main` triggers this workflow (you can also start it by hand from the Actions tab). It:

1. installs dependencies with `npm ci`,
2. runs `actions/configure-pages`, which reports the site's origin and base path,
3. runs `npm run build` with `SITE_URL` and `BASE_PATH` set from that output,
4. uploads `dist/` with `actions/upload-pages-artifact`,
5. publishes it with `actions/deploy-pages`.

One-time setup: in the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Base path and custom domain

`astro.config.mjs` defaults to `site: https://rashmika1230.github.io` and `base: /rashmika` (the repository name).
Both can be overridden with the `SITE_URL` and `BASE_PATH` environment variables. In CI they come from
the repo's Pages settings, so:

- **Rename the repo:** nothing to change; the base path follows the new name.
- **Custom domain:** add it under Settings → Pages. The workflow then builds with base `/` automatically.
  To build locally the same way, run `SITE_URL=https://your.domain BASE_PATH=/ npm run build`, or change the
  two `DEFAULT_*` constants in `astro.config.mjs`. Also update the `Sitemap:` line in `public/robots.txt`.

Always link to files in `public/` through `withBase()` from `src/utils/url.ts`, so the links keep working under any base path.

### Lighthouse CI (`.github/workflows/lighthouse.yml`)

On every pull request to `main`, this workflow builds the site with base `/` and runs Lighthouse three times on `dist/`
using `@lhci/cli` (settings in `lighthouserc.json`). The check fails if Accessibility, Best Practices or SEO score below
95. A Performance score below 95 only gives a warning, because shared CI runners make that number noisy. Each run
uploads its report to Lighthouse's temporary public storage and posts a link in the job log.

Run it locally (needs Chrome installed):

```sh
BASE_PATH=/ npm run build
npx @lhci/cli@0.16.x autorun --upload.target=filesystem
```

On Windows Git Bash, prefix the build with `MSYS_NO_PATHCONV=1`. Otherwise Git Bash rewrites `/` into a Windows path.

## Accessibility and performance notes

- Semantic landmarks, a skip link, labelled sections and visible focus styles on every interactive element
- The hero diagram is an `<svg role="img">` with a text title
- `prefers-reduced-motion` stops the diagram animation, the scroll reveal and smooth scrolling
- Without JavaScript, content stays visible and the nav links stay expanded
- CSS is inlined, so there's no render-blocking stylesheet request. Fonts load with `display=swap`.
