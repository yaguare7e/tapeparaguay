import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tapeparaguay.com"
  ),
  title: {
    default: "Tape Paraguay — Your Path to Paraguay",
    template: "%s | Tape Paraguay",
  },
  description:
    "Discover Paraguay with Tape Paraguay. Adventure tours, cultural heritage, investment opportunities, and leisure experiences. Your trusted guide to the heart of South America.",
  keywords: [
    "Paraguay",
    "travel",
    "tourism",
    "adventure",
    "investment",
    "residency",
    "Jesuit Missions",
    "Chaco",
    "Asuncion",
    "South America",
  ],
  authors: [{ name: "Tape Paraguay", url: "https://tapeparaguay.com" }],
  creator: "Tape Paraguay",
  openGraph: {
    type: "website",
    locale: "es_PY",
    url: "https://tapeparaguay.com",
    siteName: "Tape Paraguay",
    title: "Tape Paraguay — Your Path to Paraguay",
    description:
      "Discover Paraguay with Tape Paraguay. Adventure, culture, investment, and leisure.",
    images: [
      {
        url: "/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "Tape Paraguay — Your Path to Paraguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tape Paraguay — Your Path to Paraguay",
    description:
      "Discover Paraguay with Tape Paraguay. Adventure, culture, investment, and leisure.",
    images: ["/og/default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
