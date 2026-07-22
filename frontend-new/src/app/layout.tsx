import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Next.js mein fonts next/font/google se import karte hain
// React mein yeh index.html mein <link> tag se load hote the
// Next.js ka tarika better hai — fonts automatically optimize aur preload hote hain

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",          // Instrument Serif sirf 400 weight support karta hai
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Alistine — Know every visitor before they leave",
  description:
    "Alistine is the AI visitor intelligence platform that predicts intent, surfaces friction, and tells you why visitors leave — with actions to win them back.",
  openGraph: {
    title: "Alistine — Know every visitor before they leave",
    description:
      "AI visitor intelligence that goes beyond analytics. Understand intent, friction, and the reason behind every drop-off.",
    type: "website",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alistine — Know every visitor before they leave",
    description: "AI visitor intelligence that predicts intent and prevents drop-off.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
