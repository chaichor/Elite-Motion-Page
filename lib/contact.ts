export const CONTACT_SERVICES = [
  'Inmobiliario / Airbnb',
  'Redes sociales',
  'Sesión fotográfica',
  'Creación de artes',
  'Creación de videos',
  'Grabación con dron',
  'Producción comercial',
  'Cobertura de evento',
  'Landing page',
] as const;

export const CONTACT_BUDGETS = [
  '< $100',
  '$100 – $200',
  '$200 – $400',
  '$400 – $600',
  '> $600',
  'Por definir',
] as const;

export type ContactPayload = {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  presupuesto: string;
  descripcion: string;
  trap: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanLine(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\0\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function cleanMultiline(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/\0/g, '').replace(/\r/g, '').trim().slice(0, max);
}

export function parseContactBody(
  raw: unknown
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') {
    return { ok: false, error: 'Solicitud inválida.' };
  }

  const body = raw as Record<string, unknown>;
  const data: ContactPayload = {
    nombre: cleanLine(body.nombre, 80),
    email: cleanLine(body.email, 120).toLowerCase(),
    telefono: cleanLine(body.telefono, 40),
    servicio: cleanLine(body.servicio, 80),
    presupuesto: cleanLine(body.presupuesto, 40),
    descripcion: cleanMultiline(body.descripcion, 4000),
    trap: typeof body.trap === 'string' ? body.trap.trim() : '',
  };

  if (data.trap) return { ok: true, data };
  if (!data.nombre || !data.email || !data.servicio || !data.descripcion) {
    return { ok: false, error: 'Faltan campos requeridos.' };
  }
  if (!EMAIL_RE.test(data.email)) {
    return { ok: false, error: 'Correo inválido.' };
  }
  if (!(CONTACT_SERVICES as readonly string[]).includes(data.servicio)) {
    return { ok: false, error: 'Servicio no válido.' };
  }
  if (data.presupuesto && !(CONTACT_BUDGETS as readonly string[]).includes(data.presupuesto)) {
    return { ok: false, error: 'Presupuesto no válido.' };
  }

  return { ok: true, data };
}

function hostName(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return '';
  }
}

function requestHost(request: Request) {
  const raw = request.headers.get('host') || request.headers.get('x-forwarded-host') || '';
  return raw.split(',')[0]?.trim().replace(/:\d+$/, '').replace(/^www\./i, '').toLowerCase() || '';
}

export function isTrustedOrigin(request: Request) {
  const site = request.headers.get('sec-fetch-site');
  if (site === 'same-origin' || site === 'same-site') return true;

  const host = requestHost(request);
  if (!host) return false;

  const origin = hostName(request.headers.get('origin') || '');
  const referer = hostName(request.headers.get('referer') || '');
  const incoming = origin || referer;
  if (!incoming) return false;

  if (incoming === host) return true;
  if (incoming.endsWith('.vercel.app') && host.endsWith('.vercel.app')) return true;
  return false;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

export function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

export function allowContactAttempt(id: string) {
  const now = Date.now();
  const recent = (hits.get(id) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(id, recent);
    return false;
  }
  recent.push(now);
  hits.set(id, recent);
  return true;
}
