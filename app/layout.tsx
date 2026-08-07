import type { Metadata } from "next";
import { Instrument_Sans, Lora } from "next/font/google";
import "./globals.css";
import { resolveLocale } from "../lib/i18n";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Northvale — Premium Property Marketing",
  description:
    "We turn premium properties into cinematic content — and the strategy that makes them sell.",
  openGraph: {
    title: "Northvale — Premium Property Marketing",
    description: "Cinematic visual marketing for luxury properties.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = resolveLocale();
  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
