import type { Metadata, Viewport } from "next";
import { Inter, Nunito, Yellowtail } from "next/font/google";

import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE } from "@/data/site";

import "./globals.css";

/* Nunito 900 tem os terminais arredondados do logotipo "talimpo";
   Yellowtail faz o papel do script rosa da peça de referência. */
const display = Nunito({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--nf-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--nf-body", display: "swap" });
const script = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--nf-script", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Alvejante sem Cloro Talimpo Premium | Talimpo Maraponga Oficial",
  description:
    "Alvejante sem Cloro Talimpo Premium 3 L, com poder O₂ ativo. Produtos de limpeza para casa e empresas na Maraponga, Fortaleza-CE, com entrega e pedido pelo WhatsApp.",
  openGraph: {
    title: "Talimpo Premium · Tudo limpo, cor preservada",
    description: "Alvejante sem cloro com poder O₂ ativo. Peça pelo WhatsApp na Talimpo Maraponga.",
    images: ["/img/produtos/talimpo-premium.png"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1446C8",
  width: "device-width",
  initialScale: 1,
};

const MOTION_BOOT =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: SITE.name,
  slogan: SITE.slogan,
  url: SITE.url,
  telephone: "+55 85 98166-7890",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "BR",
  },
  sameAs: Object.values(SITE.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        {/* liga as animações antes da primeira pintura; sem JS ou com "reduzir movimento" o site fica estático */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
