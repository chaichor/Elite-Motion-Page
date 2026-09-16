const PROTECTED_PREFIXES = [
  '/img_portafolio',
  '/videos_vertical_portafolio',
  '/artes_y_historias',
];

const PROTECTED_EXT = /\.(jpe?g|png|gif|webp|avif|mp4|webm|mov)$/i;

export function isProtectedMediaPath(pathname: string) {
  const path = pathname.split('?')[0] || '';
  if (PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix))) return true;
  if (path.startsWith('/_next/image')) return false;
  return PROTECTED_EXT.test(path) && !path.startsWith('/og-image') && !path.startsWith('/logo');
}

export function optimizedImageIsProtected(search: string) {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const target = params.get('url');
  if (!target) return false;
  try {
    const path = target.startsWith('http') ? new URL(target).pathname : target;
    return isProtectedMediaPath(decodeURIComponent(path));
  } catch {
    return true;
  }
}
