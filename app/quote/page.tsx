import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import QuoteAcceptancePageContent from '@/components/QuoteAcceptancePageContent';

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--background)] text-[var(--ink)]">
        <Suspense
          fallback={
            <section className="section_quote_acceptance py-24 md:py-32">
              <div className="container_large padding_global">
                <div className="mx-auto max-w-5xl border-y border-black/10 py-12">
                  <p className="text_body text-sm text-[var(--subtle)]">Loading your quote...</p>
                </div>
              </div>
            </section>
          }
        >
          <QuoteAcceptancePageContent />
        </Suspense>
        <Footer />
      </main>
    </>
  );
}
