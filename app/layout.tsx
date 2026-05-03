import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MIDTS | Overflow CAD/CAM Support',
  description: 'Overflow CAD/CAM support for teams that cannot slow down.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
