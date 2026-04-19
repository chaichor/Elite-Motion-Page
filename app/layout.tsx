import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Elite Motion",
    template: "%s | Elite Motion",
  },

  description:
    "Elite Motion ofrece producción audiovisual profesional en El Salvador: videos comerciales, grabación con drones DJI, FPV cinematográfico, contenido para Airbnb, hoteles, inmobiliarias, restaurantes y marcas.",

  keywords: [
    // Marca
    "Elite Motion",
    "Elite Motion El Salvador",

    // Servicios principales
    "video comercial",
    "producción audiovisual",
    "marketing visual",
    "contenido para redes sociales",
    "videos promocionales",
    "videos corporativos",

    // Drones y tecnología
    "drones DJI",
    "drone fpv",
    "fpv cinematográfico",
    "grabación aérea",
    "video aéreo profesional",
    "fotografía aérea",

    // Nichos
    "airbnb el salvador",
    "hoteles el salvador",
    "bienes raíces el salvador",
    "inmobiliaria el salvador",
    "construcción el salvador",
    "restaurantes el salvador",
    "eventos el salvador",

    // Local SEO
    "video el salvador",
    "drones el salvador",
    "marketing digital el salvador",
    "productora audiovisual el salvador",
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
    url: "https://www.elitemotion.com", // cambia si aún no tienes dominio
    siteName: "Elite Motion",
    title: "Elite Motion",
    description:
      "Producción audiovisual premium con drones DJI y FPV. Creamos videos impactantes para Airbnb, hoteles, inmobiliarias, restaurantes y marcas en El Salvador.",
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
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
