import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TOHFA GIFTING CO | Premium Gift E-commerce",
  description: "Discover the perfect gifts for every occasion. Premium, personalized, and handcrafted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <footer className="py-10 text-center text-slate-500 text-sm glass-dark mt-20">
          © 2026 TOHFA GIFTING CO. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
