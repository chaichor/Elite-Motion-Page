'use client';

import { useState, FormEvent } from 'react';

const WA = 'https://wa.me/50377350934';

const servicios = [
  { value: '', label: 'Selecciona un servicio...' },
  { value: 'Paquete Inmobiliario Básico ($180)', label: 'Inmobiliario Básico — $180' },
  { value: 'Paquete Inmobiliario Pro ($300)', label: 'Inmobiliario Pro — $300' },
  { value: 'Paquete Inmobiliario Elite ($500)', label: 'Inmobiliario Elite — $500' },
  { value: 'Paquete Redes Inicial ($150)', label: 'Redes Inicial — $150' },
  { value: 'Paquete Redes Pro ($290)', label: 'Redes Pro — $290' },
  { value: 'Paquete Redes Elite ($400)', label: 'Redes Elite — $400' },
  { value: 'Sesión Fotográfica Básica ($60)', label: 'Foto Básico — $60' },
  { value: 'Sesión Fotográfica Pro ($80)', label: 'Foto Pro — $80' },
  { value: 'Sesión Fotográfica Elite ($120)', label: 'Foto Elite — $120' },
  { value: 'Producción Comercial', label: 'Producción Comercial (cotización)' },
  { value: 'Cobertura de Evento', label: 'Cobertura de Evento (cotización)' },
  { value: 'Landing Page / Página Web', label: 'Landing Page / Página Web (cotización)' },
  { value: 'Plan Personalizado', label: 'Plan Personalizado' },
];

const presupuestos = [
  { value: '', label: 'Rango de presupuesto (opcional)' },
  { value: 'Menos de $100', label: 'Menos de $100' },
  { value: '$100 – $200', label: '$100 – $200' },
  { value: '$200 – $400', label: '$200 – $400' },
  { value: '$400 – $600', label: '$400 – $600' },
  { value: 'Más de $600', label: 'Más de $600' },
  { value: 'No lo tengo definido', label: 'Aún no lo tengo definido' },
];

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25d366" stroke="none" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+503 7735 0934',
    href: WA,
    color: '#25d366',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    label: 'Facebook',
    value: '/elitemotion.sv',
    href: 'https://www.facebook.com/elitemotion.sv/',
    color: '#00e5ff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    label: 'Instagram',
    value: '@elitemotion_sv',
    href: 'https://instagram.com/elitemotion_sv',
    color: '#a855f7',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Ubicación',
    value: 'El Salvador',
    href: null,
    color: 'rgba(255,255,255,0.5)',
  },
];

/* ─── Input field helper ──────────────────────────────── */
function Field({
  label, id, required = false, error,
  children,
}: {
  label: string; id: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor={id} style={{
        display: 'block',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
        marginBottom: '0.5rem',
      }}>
        {label}{required && <span style={{ color: '#00e5ff', marginLeft: '3px' }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{
          position: 'absolute',
          bottom: '-1.2rem',
          left: '0',
          fontSize: '0.65rem',
          color: '#ef4444',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500
        }}>
          {error}
        </span>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.875rem 1rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  color: '#fafafa',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, background 0.2s ease',
  boxSizing: 'border-box',
};

/* ─── Page ──────────────────────────────────────────────── */
export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    servicio: '', presupuesto: '', descripcion: '',
    bot_check: '', // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      // Clear error when user types
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Correo electrónico no válido';
    }
    if (!form.servicio) newErrors.servicio = 'Selecciona un servicio';
    if (!form.descripcion.trim()) newErrors.descripcion = 'Cuéntanos un poco sobre tu proyecto';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setErrorMsg('Por favor completa todos los campos requeridos.');
      setStatus('error');
      return;
    }

    // Bot check (Honeypot)
    if (form.bot_check) {
      console.warn("Bot detected");
      setStatus('sent'); // Pretend it was sent to fool the bot
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append("access_key", "8fc63f3d-b7d8-4731-82fc-de52c00848f1");
      formData.append("subject", `Nueva Cotización: ${form.servicio} — ${form.nombre}`);
      formData.append("from_name", "Elite Motion Website");

      // Exclude bot_check from actual submission
      const { bot_check, ...submitData } = form;
      Object.entries(submitData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("message", `Cliente: ${form.nombre}\nEmail: ${form.email}\nTel: ${form.telefono}\nServicio: ${form.servicio}\nPresupuesto: ${form.presupuesto}\nDescripción: ${form.descripcion}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('sent');
        setForm({ nombre: '', email: '', telefono: '', servicio: '', presupuesto: '', descripcion: '', bot_check: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Error al enviar el formulario.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('No se pudo conectar con el servidor de correos. Intenta por WhatsApp.');
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#00e5ff';
    e.target.style.background = 'rgba(0,229,255,0.03)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.background = 'rgba(255,255,255,0.04)';
  };

  return (
    <>
      <main style={{ backgroundColor: '#0a0a0a', color: '#fafafa', minHeight: '100vh' }}>

        {/* ── Hero ──────────────────────────────────────── */}
        <section style={{ paddingTop: '130px', paddingBottom: '3rem', textAlign: 'center', position: 'relative' }}>
          <div className="price-hero-grid" />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="em-badge">Solicitar Cotización</span>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginTop: '1.25rem',
              lineHeight: 1.1,
            }}>
              Hablemos de tu <span style={{ color: '#00e5ff' }}>Proyecto</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: '540px', margin: '1.25rem auto 0', lineHeight: 1.7 }}>
              Cuéntanos tu idea y te enviamos una propuesta en menos de 24 horas. Sin compromisos.
            </p>
          </div>
        </section>

        {/* ── Main Content ──────────────────────────────── */}
        <section style={{ padding: '2rem 0 6rem' }}>
          <div className="container">
            <div className="contact-layout">

              {/* ── Left: Info ──────────────────────────── */}
              <div className="contact-sidebar">

                {/* Contact channels */}
                <div className="contact-card">
                  <h3 className="contact-card-title">Contáctanos directamente</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {contactInfo.map(item => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '44px', height: '44px', flexShrink: 0,
                          borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)',
                          background: 'rgba(255,255,255,0.03)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {item.icon}
                        </div>
                        <div>
                          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px', fontFamily: "'Outfit',sans-serif" }}>{item.label}</p>
                          {item.href ? (
                            <a href={item.href} target="_blank" rel="noopener noreferrer"
                              style={{ color: item.color, fontWeight: 600, fontSize: '0.95rem', fontFamily: "'Outfit',sans-serif", textDecoration: 'none', transition: 'opacity 0.2s' }}
                              onMouseOver={e => (e.currentTarget.style.opacity = '0.75')}
                              onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                            >{item.value}</a>
                          ) : (
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'Outfit',sans-serif" }}>{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-card-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366" stroke="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Respuesta rápida por WhatsApp
                </a>

                {/* Response time note */}
                <div className="contact-card" style={{ gap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                  <h3 className="contact-card-title">¿Qué pasa después?</h3>
                  {[
                    { step: '01', text: 'Revisamos tu solicitud con detalle' },
                    { step: '02', text: 'Te contactamos en menos de 24 horas' },
                    { step: '03', text: 'Enviamos propuesta personalizada' },
                    { step: '04', text: '¡Comenzamos tu proyecto!' },
                  ].map(s => (
                    <div key={s.step} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: "'Outfit',sans-serif", fontSize: '0.7rem', fontWeight: 800,
                        color: '#00e5ff', letterSpacing: '0.05em', minWidth: '24px', paddingTop: '1px'
                      }}>{s.step}</span>
                      <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{s.text}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* ── Right: Form ─────────────────────────── */}
              <div className="contact-form-card">
                {status === 'sent' ? (
                  <div style={{ textAlign: 'center', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '80px', height: '80px', borderRadius: '50%',
                      background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem'
                    }}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                      ¡Cotización Recibida!
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '380px', fontFamily: "'Outfit',sans-serif" }}>
                      Gracias por contactar a Elite Motion. Revisaremos tu solicitud y te responderemos en menos de 24 horas.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <button
                        onClick={() => setStatus('idle')}
                        className="em-btn em-btn-outline"
                      >
                        Enviar otra solicitud
                      </button>
                      <a href={WA} target="_blank" rel="noopener noreferrer" className="em-btn em-btn-wa">
                        Escribir por WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                      Formulario de Cotización
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontFamily: "'Outfit',sans-serif", marginBottom: '2rem', lineHeight: 1.6 }}>
                      Completa el formulario y te contactaremos para elaborar tu propuesta personalizada.
                    </p>

                    <div className="form-grid">

                      {/* Honeypot field - Hidden from users */}
                      <div style={{ display: 'none' }}>
                        <input
                          type="text"
                          name="bot_check"
                          value={form.bot_check}
                          onChange={set('bot_check')}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* Nombre */}
                      <Field label="Nombre completo" id="nombre" required error={errors.nombre}>
                        <input
                          id="nombre" type="text" required
                          value={form.nombre} onChange={set('nombre')}
                          placeholder="Tu nombre completo"
                          style={{ ...inputStyle, borderColor: errors.nombre ? 'rgba(239,68,68,0.4)' : inputStyle.borderColor }}
                          onFocus={focusStyle} onBlur={blurStyle}
                        />
                      </Field>

                      {/* Email */}
                      <Field label="Correo electrónico" id="email" required error={errors.email}>
                        <input
                          id="email" type="email" required
                          value={form.email} onChange={set('email')}
                          placeholder="tu@correo.com"
                          style={{ ...inputStyle, borderColor: errors.email ? 'rgba(239,68,68,0.4)' : inputStyle.borderColor }}
                          onFocus={focusStyle} onBlur={blurStyle}
                        />
                      </Field>

                      {/* Teléfono */}
                      <Field label="Teléfono / WhatsApp" id="telefono">
                        <input
                          id="telefono" type="tel"
                          value={form.telefono} onChange={set('telefono')}
                          placeholder="+503 XXXX XXXX"
                          style={inputStyle}
                          onFocus={focusStyle} onBlur={blurStyle}
                        />
                      </Field>

                      {/* Servicio */}
                      <Field label="Servicio de interés" id="servicio" required error={errors.servicio}>
                        <select
                          id="servicio" required
                          value={form.servicio} onChange={set('servicio')}
                          style={{
                            ...inputStyle,
                            borderColor: errors.servicio ? 'rgba(239,68,68,0.4)' : inputStyle.borderColor,
                            appearance: 'none',
                            cursor: 'pointer',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center'
                          }}
                          onFocus={focusStyle} onBlur={blurStyle}
                        >
                          {servicios.map(s => (
                            <option key={s.value} value={s.value} style={{ background: '#0d0d0d' }}>{s.label}</option>
                          ))}
                        </select>
                      </Field>

                      {/* Presupuesto */}
                      <Field label="Presupuesto aproximado" id="presupuesto">
                        <select
                          id="presupuesto"
                          value={form.presupuesto} onChange={set('presupuesto')}
                          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                          onFocus={focusStyle} onBlur={blurStyle}
                        >
                          {presupuestos.map(p => (
                            <option key={p.value} value={p.value} style={{ background: '#0d0d0d' }}>{p.label}</option>
                          ))}
                        </select>
                      </Field>

                    </div>

                    {/* Descripción */}
                    <div style={{ marginTop: '1.25rem' }}>
                      <Field label="Describe tu proyecto" id="descripcion" required error={errors.descripcion}>
                        <textarea
                          id="descripcion" required rows={5}
                          value={form.descripcion} onChange={set('descripcion')}
                          placeholder="Cuéntanos sobre tu proyecto: ¿qué necesitas, dónde, cuándo? Mientras más detalles, mejor propuesta podemos hacerte."
                          style={{
                            ...inputStyle,
                            borderColor: errors.descripcion ? 'rgba(239,68,68,0.4)' : inputStyle.borderColor,
                            resize: 'none',
                            lineHeight: 1.6
                          }}
                          onFocus={focusStyle} onBlur={blurStyle}
                        />
                      </Field>
                    </div>

                    {/* Error */}
                    {status === 'error' && !Object.keys(errors).length && (
                      <div style={{
                        marginTop: '1.5rem', padding: '0.875rem 1rem',
                        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                        borderRadius: '10px', color: '#fca5a5',
                        fontFamily: "'Outfit',sans-serif", fontSize: '0.88rem'
                      }}>
                        {errorMsg}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="em-btn em-btn-primary em-pulse"
                      style={{ marginTop: '1.75rem', width: '100%', justifyContent: 'center', fontSize: '0.9rem', opacity: status === 'sending' ? 0.7 : 1 }}
                    >
                      {status === 'sending' ? (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Enviando cotización...
                        </>
                      ) : (
                        'Solicitar Cotización →'
                      )}
                    </button>

                    <p style={{ marginTop: '1rem', textAlign: 'center', fontFamily: "'Outfit',sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
                      También puedes contactarnos directamente por{' '}
                      <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366' }}>WhatsApp</a>
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      <style>{`
        .price-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          pointer-events: none;
        }

        /* Layout */
        .contact-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 2rem;
          align-items: start;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Sidebar Cards */
        .contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 1.75rem;
          margin-bottom: 1rem;
        }
        .contact-card:last-child { margin-bottom: 0; }
        .contact-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #fafafa;
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }

        /* WhatsApp card */
        .wa-card-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(37,211,102,0.07);
          border: 1px solid rgba(37,211,102,0.2);
          border-radius: 14px;
          color: #25d366;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          margin-bottom: 1rem;
          cursor: pointer;
        }
        .wa-card-btn:hover {
          background: rgba(37,211,102,0.12);
          border-color: rgba(37,211,102,0.4);
        }

        /* Form card */
        .contact-form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2.5rem;
        }

        /* Form grid */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .contact-form-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
