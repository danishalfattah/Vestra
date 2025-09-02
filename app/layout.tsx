import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VESTRA – Edukasi Keuangan Praktis",
    template: "%s · VESTRA",
  },
  description:
    "Belajar konsep dasar keuangan pribadi, investasi, dan perencanaan finansial melalui modul ringkas, video, dan event interaktif.",
  keywords: [
    "edukasi keuangan",
    "investasi",
    "keuangan pribadi",
    "perencanaan keuangan",
    "webinar keuangan",
  ],
  authors: [{ name: "VESTRA" }],
  creator: "VESTRA",
  metadataBase: new URL("https://vestra.example"),
  alternates: { canonical: "/", languages: { "id-ID": "/" } },
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0f16" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://vestra.example",
    siteName: "VESTRA",
    title: "VESTRA – Edukasi Keuangan Praktis",
    description:
      "Platform pembelajaran keuangan: modul ringkas, video terarah, dan event finansial untuk mempercepat pemahaman Anda.",
    images: [
      {
        url: "/logo-og.png",
        width: 1200,
        height: 630,
        alt: "VESTRA – Edukasi Keuangan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VESTRA – Edukasi Keuangan Praktis",
    description:
      "Belajar keuangan pribadi & investasi melalui modul singkat, video, dan event.",
    images: ["/logo-og.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "64x64" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: [{ rel: "mask-icon", url: "/logo.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Fallback link tags for older crawlers */}
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "VESTRA",
              url: "https://vestra.example",
              logo: "https://vestra.example/logo.svg",
              sameAs: [],
              description:
                "Platform edukasi keuangan: modul, video, dan event finansial.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "VESTRA",
              url: "https://vestra.example",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://vestra.example/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
