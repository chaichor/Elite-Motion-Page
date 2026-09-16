import ContactForm from './ContactForm';

export const dynamic = 'force-dynamic';

function accessKey() {
  const raw =
    process.env.WEB3FORMS_KEY ||
    process.env.WEB3FORMS_ACCESS_KEY ||
    '';
  return raw.trim().replace(/^["']|["']$/g, '');
}

export default function Contacto() {
  return <ContactForm accessKey={accessKey()} />;
}
