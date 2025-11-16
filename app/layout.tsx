import type { Metadata } from "next";
import { Fugaz_One, Montserrat } from "next/font/google";
import "./globals.css";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fugaz",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  title: "KI Surge | 90s Battle Anime Tribute",
  description:
    "An explosive, high-energy tribute to 90s battle anime with kinetic layouts, film grain, and unstoppable momentum."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fugaz.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-black">{children}</body>
    </html>
  );
}
