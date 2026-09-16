import { NextResponse } from 'next/server';
import {
  allowContactAttempt,
  clientIp,
  isTrustedOrigin,
  parseContactBody,
} from '@/lib/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function accessKey() {
  return process.env.WEB3FORMS_KEY?.trim().replace(/^["']|["']$/g, '') ?? '';
}

async function readBody(request: Request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return request.json();
  }

  const form = await request.formData();
  return {
    nombre: form.get('nombre'),
    email: form.get('email'),
    telefono: form.get('telefono'),
    servicio: form.get('servicio'),
    presupuesto: form.get('presupuesto'),
    descripcion: form.get('descripcion'),
    trap: form.get('trap') || form.get('company'),
  };
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
    raw = await readBody(request);
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
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: key,
        subject: `Nueva Cotización: ${servicio} — ${nombre}`,
        from_name: 'Elite Motion',
        name: nombre,
        email,
        phone: telefono || 'No indicado',
        replyto: email,
        message: [
          `Cliente: ${nombre}`,
          `Servicio: ${servicio}`,
          `Presupuesto: ${presupuesto || 'No indicado'}`,
          `WhatsApp: ${telefono || 'No indicado'}`,
          '',
          descripcion,
        ].join('\n'),
      }),
    });

    const text = await web3Response.text();
    let data: { success?: boolean } = {};
    try {
      data = JSON.parse(text) as { success?: boolean };
    } catch {
      console.error('Web3Forms non-JSON', web3Response.status);
      return NextResponse.json({ error: 'No pudimos enviar el formulario.' }, { status: 502 });
    }

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    console.error('Web3Forms rejected the submission', web3Response.status);
    return NextResponse.json({ error: 'No pudimos enviar el formulario.' }, { status: 502 });
  } catch (error) {
    console.error('Web3Forms request failed', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Error del servidor. Intenta de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
