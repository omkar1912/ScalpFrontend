import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthGuard } from "@/components/auth/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScrapMarket | Modern Scrap Marketplace",
  description: "Global B2B scrap marketplace connecting buyers and sellers for a sustainable future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </AuthGuard>
      </body>
    </html>
  );
}
