import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Overpass, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Scene from "@/components/Scene";

const display = Overpass({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-overpass",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const DESCRIPTION =
  "Griffin Brodie, Madison, CT, class of 2027. Civil engineering applicant, robotics team captain, and founder of GolfTradr LLC.";
const TITLE = "Griffin Brodie | Civil Engineering Portfolio";
const SITE = "https://griffinbrodie.site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    images: [{ url: `${SITE}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE}/og-image.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#F2F5EE",
};

const PRE = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){d.classList.add('reduce');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
    >
      <body className="font-sans">
        <Script
          id="pre-hydration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: PRE }}
        />
        <SmoothScroll />
        <Scene />
        {children}
      </body>
    </html>
  );
}
