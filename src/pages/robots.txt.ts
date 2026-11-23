export function GET() {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: https://rashmika1230.github.io${base}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
