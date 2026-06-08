import type { Metadata, Viewport } from "next";
import { Literata, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext"],
  variable: "--font-be-vietnam",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Guapa Café — Colonia del Valle, CDMX",
  description:
    "Café artesanal en la Colonia del Valle. Croissants, café de especialidad, coctelería y más. Pet-friendly. Descubre nuestro sabor único.",
  icons: {
    icon: "/favicon.jpg",
  },
  openGraph: {
    title: "Guapa Café",
    description: "Café artesanal en la Colonia del Valle, CDMX.",
    siteName: "Guapa Café",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${literata.variable} ${beVietnamPro.variable}`}>
      <body>{children}</body>
    </html>
  );
}
