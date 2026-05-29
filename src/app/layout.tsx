import type { Metadata } from "next";
import { canela } from "@/lib/fonts/canela";
import "./globals.css";

export const metadata: Metadata = {
  title: "AYALUZ | Luxury Spiritual Retreat",
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
      <body className="min-h-full font-sans-minimal antialiased">{children}</body>
    </html>
  );
}
