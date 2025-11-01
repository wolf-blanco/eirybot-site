// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "EiryBot",
  description: "Automatizaciones 24/7 con IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
