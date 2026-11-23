// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rashmika1230.github.io',
  base: '/rashmika-dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // Single page with a small stylesheet: inline it to avoid a render-blocking request.
    inlineStylesheets: 'always',
  },
});
