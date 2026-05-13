import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zeeshankhanminhas.github.io/NEW-MIDTS';
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'MIDTS | Overflow CAD/CAM Support',
  description: 'Overflow CAD/CAM support for teams that cannot slow down.',
  openGraph: {
    title: 'MIDTS | Overflow CAD/CAM Support',
    description: 'Fast, precise, on-demand CAD/CAM engineering execution for overloaded teams.',
    url: siteUrl,
    siteName: 'MIDTS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MIDTS | Overflow CAD/CAM Support',
    description: 'Fast, precise, on-demand CAD/CAM engineering execution for overloaded teams.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {plausibleDomain ? <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" /> : null}
        {children}
      </body>
    </html>
  );
}
