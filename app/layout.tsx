import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MIDTS | CAD/CAM Overflow Engineering Support',
  description:
    'MIDTS provides flexible CAD/CAM, engineering documentation, and production support for teams facing urgent delivery pressure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
