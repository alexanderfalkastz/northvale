import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { resolveLocale } from "../lib/i18n";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Northvale — Premium Property Marketing",
  description:
    "A visual marketing studio turning premium properties into cinematic content — and the strategy that makes them sell.",
  openGraph: {
    title: "Northvale — Premium Property Marketing",
    description: "Cinematic visual marketing for luxury properties.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = resolveLocale();
  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
