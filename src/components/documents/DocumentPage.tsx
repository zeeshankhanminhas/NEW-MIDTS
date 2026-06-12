import type { ReactNode } from 'react';
import { midtsBrand } from '@/src/lib/midts-brand';

type DocumentPageProps = {
  children: ReactNode;
};

export default function DocumentPage({ children }: DocumentPageProps) {
  return (
    <main className={midtsBrand.document.previewClassName}>
      <section className={midtsBrand.document.pageClassName}>
        {children}
      </section>

      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 210mm;
            background: #ffffff;
          }
        }
      `}</style>
    </main>
  );
}
