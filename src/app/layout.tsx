// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ❗El <html>/<body> solo va en el root layout
  return (
    <html suppressHydrationWarning>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
