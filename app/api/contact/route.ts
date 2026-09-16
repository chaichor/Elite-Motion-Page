import { NextResponse } from 'next/server';
import {
  allowContactAttempt,
  clientIp,
  isTrustedOrigin,
  parseContactBody,
} from '@/lib/contact';

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
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

  const key = process.env.WEB3FORMS_KEY;
  if (!key || key === 'YOUR_ACCESS_KEY_HERE') {
    console.error('WEB3FORMS_KEY missing');
    return NextResponse.json({ error: 'No pudimos enviar el formulario.' }, { status: 500 });
  }

  const { nombre, email, telefono, servicio, presupuesto, descripcion } = parsed.data;

  try {
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `Nueva Cotización: ${servicio} — ${nombre}`,
        from_name: 'Elite Motion Website',
        replyto: email,
        message: `Cliente: ${nombre}\nServicio: ${servicio}\nPresupuesto: ${presupuesto || 'No indicado'}\nDescripción: ${descripcion}`,
        nombre,
        email,
        telefono: telefono || 'No indicado',
        servicio,
        presupuesto: presupuesto || 'No indicado',
        descripcion,
      }),
    });

    const data = (await web3Response.json()) as { success?: boolean };

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    console.error('Web3Forms rejected the submission');
    return NextResponse.json({ error: 'No pudimos enviar el formulario.' }, { status: 502 });
  } catch {
    return NextResponse.json(
      { error: 'Error del servidor. Intenta de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
