import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TS | Tlili Soulaymen - Full Stack Engineer",
  description: "Tlili Soulaymen - Student Engineer at ENSTA Borj Cedria. Full-stack developer, AI specialist, blockchain architect. Building intelligent systems from Tunisia.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050506] text-white">
        {children}
      </body>
    </html>
  );
}
