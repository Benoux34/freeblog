import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { supremeLL } from "@/utils/fonts/Fonts";

export const metadata: Metadata = {
  title: "FREEBLOG",
  description: "Be free to do what you want!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`relative ${supremeLL.className} antialiased mx-5`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
