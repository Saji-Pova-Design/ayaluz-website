import type { Metadata } from "next";

import { canela } from "@/lib/fonts/canela";

import { PromoBanner } from "@/components/general-shared/PromoBanner";
import Navbar from "@/components/general-shared/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "AYALUZ | Sacred Plants Retreat Center",
  description:
    "Transformative Ayahuasca journeys in Peru's Andean Heartland. Deep healing, inner clarity, and spiritual awakening.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${canela.variable} h-full`}>
      <body className="min-h-full bg-primary-bg font-sans-minimal text-primary-text antialiased">
        <PromoBanner />

        <Navbar />

        {children}
      </body>
    </html>
  );
}