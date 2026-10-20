import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Big_Shoulders_Display, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import BridgeScene from "@/components/BridgeScene";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});
const text = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const SITE = "https://griffinbrodie.site";
const TITLE = "Griffin Brodie | Civil Engineering Portfolio";
const DESCRIPTION =
  "Griffin Brodie, Madison, CT, class of 2027. Civil engineering applicant, robotics team captain, and founder of GolfTradr LLC.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: SITE, images: [{ url: `${SITE}/og-image.png`, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE}/og-image.png`] },
};

// Next.js metadata cannot read CSS variables; this is Poured Concrete.
export const viewport: Viewport = { themeColor: "#E2E0DA" };

const PRE = `(function(){var d=document.documentElement;d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduce')}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        <Script id="pre" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: PRE }} />
        <SmoothScroll />
        <BridgeScene />
        {children}
      </body>
    </html>
  );
}
