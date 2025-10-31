export const metadata = {
  title: "EiryBot",
  description: "Automatización, chatbots y métricas en tiempo real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
