import "./globals.css";

export const metadata = {
  title: "Vortex Studio",
  description: "Gerador de vídeos virais"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
