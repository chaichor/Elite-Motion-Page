import { NextResponse, type NextRequest } from 'next/server';
import { isProtectedMediaPath, optimizedImageIsProtected } from '@/lib/media-guard';

const GATE = 'em_media';

function nonceValue() {
  return btoa(crypto.randomUUID());
}

function csp(nonce: string, dev: boolean) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://connect.facebook.net${dev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://www.facebook.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "media-src 'self' blob:",
    `connect-src 'self' https://www.facebook.com https://connect.facebook.net${dev ? ' ws: wss:' : ''}`,
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ]
    .join('; ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function applyCsp(response: NextResponse, nonce: string, request: NextRequest) {
  const policy = csp(nonce, process.env.NODE_ENV !== 'production');
  response.headers.set('Content-Security-Policy', policy);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), usb=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  if (request.nextUrl.protocol === 'https:' || process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
}

function sameOriginReferer(request: NextRequest) {
  const referer = request.headers.get('referer');
  if (!referer) return false;
  try {
    return new URL(referer).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

function allowProtectedMedia(request: NextRequest) {
  const dest = request.headers.get('sec-fetch-dest');
  const site = request.headers.get('sec-fetch-site');

  if (dest === 'document') return false;
  if (site === 'cross-site') return false;
  if (sameOriginReferer(request)) return true;
  if (request.cookies.get(GATE)?.value === '1') return true;
  if (
    (dest === 'image' || dest === 'video' || dest === 'media') &&
    (site === 'same-origin' || site === 'same-site')
  ) {
    return true;
  }
  return false;
}

export function middleware(request: NextRequest) {
  const nonce = nonceValue();
  const { pathname, search } = request.nextUrl;
  const isImageOpt = pathname.startsWith('/_next/image');
  const guarded =
    isProtectedMediaPath(pathname) || (isImageOpt && optimizedImageIsProtected(search));

  if (guarded && !allowProtectedMedia(request)) {
    return new NextResponse('Not available', {
      status: 403,
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Cross-Origin-Resource-Policy': 'same-origin',
      },
    });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  applyCsp(response, nonce, request);

  if (guarded) {
    response.headers.set('Cache-Control', 'private, max-age=300');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  }

  const wantsDocument = request.headers.get('accept')?.includes('text/html');
  if (wantsDocument) {
    response.cookies.set(GATE, '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/webpack-hmr|favicon.ico).*)'],
};
