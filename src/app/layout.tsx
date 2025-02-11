import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
// COMPONENTS
import { Header } from "@/components/Header";
// UTILS
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
    <ClerkProvider>
      <html lang="fr">
        <body className={`relative ${supremeLL.className} antialiased mx-5`}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
