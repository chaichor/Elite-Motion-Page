import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import "./magic.css";
import "./gallery.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecurityProvider from "@/components/SecurityProvider";
import LogoIntro from "@/components/LogoIntro";
import GridBackground from "@/components/GridBackground";
import SmoothCursor from "@/components/ui/SmoothCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://elitemotionsv.com"),

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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Decides the intro before first paint: repeat visitors and
            reduced-motion users must never see the overlay flash. */}
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=document.documentElement;var t=localStorage.getItem('em-theme');if(t!=='light'&&t!=='dark')t='dark';r.setAttribute('data-theme',t);if(matchMedia('(max-width:768px),(hover:none) and (pointer:coarse)').matches)r.classList.add('em-lite');var skip=sessionStorage.getItem('em-logo-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches;r.classList.add(skip?'em-intro-skip':'em-intro-lock')}catch(e){document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('em-intro-skip')}})()`,
          }}
        />
      </head>
      <body>
        <Script id="fb-pixel" strategy="afterInteractive" nonce={nonce}>
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
            fbq('set', 'autoConfig', false, '961246403321583');
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
        <div className="bg-gradient" />
        <GridBackground />
        <LogoIntro />

        <SmoothCursor />

        <SecurityProvider>
          <Navbar />
          <main className="em-main">{children}</main>
          <Footer />
        </SecurityProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
