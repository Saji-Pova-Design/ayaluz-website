import type { Metadata } from "next";

import { canela } from "@/lib/fonts/canela";

import Navbar from "@/components/general-shared/Navbar";
import { PromoBanner } from "@/components/general-shared/PromoBanner";

import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

import "./globals.css";

export const metadata: Metadata = {
  title: "AYALUZ | Sacred Plants Retreat Center",
  description:
    "Transformative Ayahuasca journeys in Peru's Andean Heartland. Deep healing, inner clarity, and spiritual awakening.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await client.fetch(
    siteSettingsQuery,
    {},
    {
      cache: "no-store",
      next: {
        revalidate: 0,
      },
    },
  );

  return (
    <html lang="en" className={`${canela.variable} h-full`}>
      <body className="min-h-full bg-primary-bg font-sans-minimal text-primary-text antialiased">
        <PromoBanner data={siteSettings?.promoBanner} />

        <Navbar data={siteSettings?.navbar} />

        {children}
      </body>
    </html>
  );
}