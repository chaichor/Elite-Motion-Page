import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Elite Motion",
    template: "%s | Elite Motion",
  },

  description:
    "Producción audiovisual y fotografía profesional en El Salvador. Especialistas en creación de contenido para redes sociales, videos para Airbnb y bienes raíces, y fotografía de marca de alto impacto. Elevamos tu presencia visual.",

  keywords: [
    // Marca
    "Elite Motion",
    "Elite Motion El Salvador",

    // Servicios principales
    "fotografía profesional el salvador",
    "video comercial",
    "producción audiovisual",
    "marketing visual",
    "creación de contenido redes sociales",
    "videos para tiktok el salvador",
    "sesiones de fotos el salvador",

    // Nichos y Paquetes
    "airbnb el salvador",
    "bienes raíces el salvador",
    "inmobiliaria el salvador",
    "restaurantes el salvador",
    "marketing inmobiliario",
    "contenido para emprendedores",

    // Marca y tecnología
    "Elite Motion SV",
    "Elite Motion El Salvador",
    "drones el salvador",
    "video aéreo profesional",
  ],

  authors: [{ name: "Elite Motion" }],
  creator: "Elite Motion",
  publisher: "Elite Motion",

  category: "Producción audiovisual y marketing",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_SV",
    url: "https://elitemotionsv.com",
    siteName: "Elite Motion",
    title: "Elite Motion | Producción Audiovisual y Fotografía",
    description:
      "Transformamos tu marca con fotografía profesional, creación de contenido para redes sociales y video marketing especializado en El Salvador. Especialistas en Airbnb e Inmobiliaria.",
    images: [
      {
        url: "/og-image.jpg", // imagen 1200x630 recomendada
        width: 1200,
        height: 630,
        alt: "Elite Motion - Producción audiovisual con drones",
      },
    ],
  },

  icons: {
    icon: "/logo_white.svg",
    shortcut: "/logo_white.svg",
    apple: "/logo_white.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '961246403321583');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=961246403321583&ev=PageView&noscript=1"
          />
        </noscript>
        {/* Background gradient effect */}
        <div className="bg-gradient" />

        {/* Global Navbar */}
        <Navbar />

        {/* Page content */}
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
