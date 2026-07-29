import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northvale — Premium Property Content",
  description:
    "Transformamos propiedades premium en experiencias visuales cinematográficas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
