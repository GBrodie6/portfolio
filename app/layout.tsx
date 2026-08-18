import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import Cursor from "@/components/Cursor";
import LoadIn from "@/components/LoadIn";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const DESCRIPTION =
  "Griffin Brodie, civil engineering bound, robotics team captain, and the builder behind five shipped projects, GolfTradr, GripFitr, and more.";
const TITLE = "Griffin Brodie | Builder and Engineer";
const SITE = "https://griffinbrodie.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F2F5EE",
};

const PRE = `(function(){var d=document.documentElement;d.classList.add('js');var r=false;try{r=window.matchMedia('(prefers-reduced-motion:reduce)').matches;}catch(e){}if(r){d.classList.add('reduce');}else{try{if(!sessionStorage.getItem('gb_seen')){d.classList.add('intro');}}catch(e){}}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans">
        <Script
          id="pre-hydration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: PRE }}
        />
        <SmoothScroll />
        <Grain />
        <Cursor />
        <LoadIn />
        {children}
      </body>
    </html>
  );
}
