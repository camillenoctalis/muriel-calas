import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { Motion } from "@/components/motion/Motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { businessJsonLd, DEFAULT_OG_IMAGE, personJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Préparatrice mentale à Narbonne | Muriel Calas",
    template: "%s | Muriel Calas",
  },
  description: site.description,
  applicationName: "Muriel Calas — Préparatrice mentale",
  authors: [{ name: "Muriel Calas", url: site.url }],
  creator: "Muriel Calas",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: "Muriel Calas — Préparatrice mentale",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Muriel Calas, préparatrice mentale" }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" }, { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/brand/apple-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${newsreader.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les états d’animation uniquement si le JS est disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <JsonLd data={[websiteJsonLd(), businessJsonLd(), personJsonLd()]} />
        <Header />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <Motion />
      </body>
    </html>
  );
}
