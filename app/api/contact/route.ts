import { NextResponse } from 'next/server';
import {
  allowContactAttempt,
  clientIp,
  isTrustedOrigin,
  parseContactBody,
} from '@/lib/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

function accessKey() {
  return process.env.WEB3FORMS_KEY?.trim().replace(/^["']|["']$/g, '') ?? '';
}

export async function POST(request: Request) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: 'Solicitud rechazada.' }, { status: 403 });
  }

  if (!allowContactAttempt(clientIp(request))) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera unos minutos o escríbenos por WhatsApp.' },
      { status: 429 }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const parsed = parseContactBody(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  if (parsed.data.trap) {
    return NextResponse.json({ success: true });
  }

  const key = accessKey();
  if (!key || key === 'YOUR_ACCESS_KEY_HERE') {
    console.error('WEB3FORMS_KEY missing');
    return NextResponse.json({ error: 'No pudimos enviar el formulario.' }, { status: 500 });
  }

  const { nombre, email, telefono, servicio, presupuesto, descripcion } = parsed.data;

  try {
    const form = new FormData();
    form.append('access_key', key);
    form.append('subject', `Nueva Cotización: ${servicio} — ${nombre}`);
    form.append('from_name', 'Elite Motion');
    form.append('name', nombre);
    form.append('email', email);
    form.append('phone', telefono || 'No indicado');
    form.append('replyto', email);
    form.append(
      'message',
      [
        `Cliente: ${nombre}`,
        `Servicio: ${servicio}`,
        `Presupuesto: ${presupuesto || 'No indicado'}`,
        `WhatsApp: ${telefono || 'No indicado'}`,
        '',
        descripcion,
      ].join('\n')
    );

    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: form,
    });

    const text = await web3Response.text();
    let data: { success?: boolean } = {};
    try {
      data = JSON.parse(text) as { success?: boolean };
    } catch {
      console.error('Web3Forms non-JSON', web3Response.status);
      return NextResponse.json(
        {
          error: 'No pudimos enviar el formulario.',
          ...(process.env.NODE_ENV !== 'production'
            ? { detail: `web3-status-${web3Response.status}` }
            : {}),
        },
        { status: 502 }
      );
    }

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    console.error('Web3Forms rejected the submission', web3Response.status);
    return NextResponse.json(
      {
        error: 'No pudimos enviar el formulario.',
        ...(process.env.NODE_ENV !== 'production' ? { detail: `web3-reject-${web3Response.status}` } : {}),
      },
      { status: 502 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('Web3Forms request failed', message);
    return NextResponse.json(
      {
        error: 'Error del servidor. Intenta de nuevo más tarde.',
        ...(process.env.NODE_ENV !== 'production' ? { detail: message } : {}),
      },
      { status: 500 }
    );
  }
}
