'use client';

import { FormEvent, useState } from 'react';
import { KineticText } from '@/components/ui/KineticText';
import { HyperText } from '@/components/ui/HyperText';
import { RippleButton } from '@/components/ui/RippleButton';
import { CONTACT_BUDGETS, CONTACT_SERVICES } from '@/lib/contact';

const WA = 'https://wa.me/50377350934';

const STEPS = [
  ['01', 'Leemos tu solicitud y revisamos referencias.'],
  ['02', 'Te escribimos en menos de 24 horas.'],
  ['03', 'Recibes propuesta con alcance y precio.'],
  ['04', 'Agendamos grabación.'],
];

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servicio, setServicio] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [trap, setTrap] = useState('');

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    const next: Record<string, string> = {};
    if (!nombre.trim()) next.nombre = 'Escribe tu nombre para saber con quién hablamos.';
    if (!email.trim()) next.email = 'Necesitamos un correo para enviarte la propuesta.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Ese correo no parece válido.';
    if (!servicio) next.servicio = 'Elige el servicio que más se acerca.';
    if (!descripcion.trim()) next.descripcion = 'Cuéntanos qué necesitas grabar.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          servicio,
          presupuesto,
          descripcion,
          trap,
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && data.success) {
        setStatus('sent');
        setNombre('');
        setEmail('');
        setTelefono('');
        setServicio('');
        setPresupuesto('');
        setDescripcion('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'No pudimos enviar el formulario.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('No hay conexión con el servidor de correo. Escríbenos por WhatsApp.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="container em-quote">
        <div className="em-quote-sent">
          <KineticText as="h1" text="Recibido." />
          <HyperText
            as="p"
            text="Tu solicitud ya está con nosotros. Te respondemos en menos de 24 horas al correo que dejaste."
          />
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="em-btn em-btn-outline" onClick={() => setStatus('idle')}>
              Enviar otra solicitud
            </button>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-ghost">
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container em-quote">
      <div className="em-quote-layout">
        <div>
          <KineticText as="h1" text={'Cotiza tu\nproyecto'} highlight="proyecto" />
          <HyperText
            as="p"
            className="em-quote-lead"
            text="Seis campos, una respuesta en 24 horas y un precio cerrado antes de grabar."
          />

          <div className="em-quote-steps">
            {STEPS.map(([n, text]) => (
              <div key={n} className="em-quote-step">
                <b>{n}</b>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <a href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-ghost" style={{ marginTop: '2rem' }}>
            O escríbenos directo por WhatsApp
          </a>
        </div>

        <form className="em-quote-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="company"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
          />

          <label>
            <span>Nombre</span>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" maxLength={80} />
            {errors.nombre && <em className="em-field-error">{errors.nombre}</em>}
          </label>

          <label>
            <span>Correo</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" maxLength={120} />
            {errors.email && <em className="em-field-error">{errors.email}</em>}
          </label>

          <label>
            <span>WhatsApp <em className="em-optional">opcional</em></span>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+503 0000 0000" maxLength={40} />
          </label>

          <fieldset>
            <legend>Servicio</legend>
            <div className="em-svc-grid">
              {CONTACT_SERVICES.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`em-svc${servicio === s ? ' is-on' : ''}`}
                  aria-pressed={servicio === s}
                  onClick={() => setServicio(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors.servicio && <em className="em-field-error">{errors.servicio}</em>}
          </fieldset>

          <fieldset>
            <legend>Presupuesto <em className="em-optional">opcional</em></legend>
            <div className="em-svc-grid em-svc-grid-3">
              {CONTACT_BUDGETS.map((b) => (
                <button
                  type="button"
                  key={b}
                  className={`em-svc${presupuesto === b ? ' is-on' : ''}`}
                  aria-pressed={presupuesto === b}
                  onClick={() => setPresupuesto(presupuesto === b ? '' : b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          <label>
            <span>El proyecto</span>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Qué necesitas, dónde y para cuándo."
              maxLength={4000}
            />
            {errors.descripcion && <em className="em-field-error">{errors.descripcion}</em>}
          </label>

          {status === 'error' && errorMsg && <p className="em-form-alert">{errorMsg}</p>}

          <RippleButton type="submit" className="em-btn em-btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
          </RippleButton>
        </form>
      </div>
    </div>
  );
}
