import type { Metadata } from "next";
import "./globals.css";
import { resolveLocale } from "../lib/i18n";

export const metadata: Metadata = {
  title: "Northvale — Premium Property Marketing",
  description:
    "We turn premium properties into cinematic content that commands attention and demand.",
  openGraph: {
    title: "Northvale — Premium Property Marketing",
    description:
      "Cinematic visual marketing for luxury properties.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = resolveLocale();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
