import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, servicio, presupuesto, descripcion } = body;

    // Validate required fields
    if (!nombre || !email || !servicio || !descripcion) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos.' },
        { status: 400 }
      );
    }

    // Submit to Web3Forms (Envía los correos a: elite.compainsv@gmail.com)
    // Para que funcione, debes crear tu Access Key en https://web3forms.com con ese correo
    // y agregarla como variable de entorno WEB3FORMS_KEY en Vercel.
    if (!process.env.WEB3FORMS_KEY) {
      console.error('ERROR: WEB3FORMS_KEY no está configurada en las variables de entorno.');
      return NextResponse.json(
        { error: 'Configuración incompleta en el servidor.' },
        { status: 500 }
      );
    }

    // Submit to Web3Forms
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `Nueva Cotización: ${servicio} — ${nombre}`,
        from_name: 'Elite Motion Website',
        replyto: email,
        // Al enviar los campos por separado, Web3Forms los organiza en una tabla profesional en tu correo
        nombre,
        email,
        telefono: telefono || 'No indicado',
        servicio,
        presupuesto: presupuesto || 'No indicado',
        descripcion,
      }),
    });

    const data = await web3Response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Web3Forms Error:', data); // Esto aparecerá en los logs de Vercel
      return NextResponse.json(
        { error: data.message || 'Error al enviar el formulario.' },
        { status: web3Response.status }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Error del servidor. Intenta de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
