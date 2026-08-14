import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { resolveLocale } from "../lib/i18n";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Base para resolver la URL absoluta de la imagen OG:
// override manual (NEXT_PUBLIC_SITE_URL) → dominio de producción de Vercel → fallback.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://northvale.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Northvale — Premium Property Marketing",
  description:
    "A visual marketing studio. We turn premium properties into cinematic content — and the strategy that makes buyers act.",
  openGraph: {
    title: "Northvale — Premium Property Marketing",
    description: "Cinematic visual marketing for luxury properties.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northvale — Premium Property Marketing",
    description: "Cinematic visual marketing for luxury properties.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await resolveLocale();
  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
