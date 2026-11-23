/**
 * Prefix a site-relative path ("/cv.pdf") with the configured base path,
 * so links keep working on https://user.github.io/repo/ and on a custom domain.
 * Absolute URLs, in-page anchors and mailto/tel links are returned unchanged.
 */
export function withBase(href: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(href)) return href;
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (base && (href === base || href.startsWith(`${base}/`))) return href;
  return `${base}/${href.replace(/^\/+/, '')}`;
}
