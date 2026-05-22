import Footer from '@/components/Footer';
import Header from '@/components/Header';
import QuoteAcceptanceForm from '@/components/QuoteAcceptanceForm';

type PageProps = {
  searchParams?: {
    quoteId?: string;
    leadId?: string;
  };
};

export default function QuoteAcceptancePage({ searchParams }: PageProps) {
  const quoteId = typeof searchParams?.quoteId === 'string' ? searchParams.quoteId : '';
  const leadId = typeof searchParams?.leadId === 'string' ? searchParams.leadId : '';

  return (
    <>
      <Header />
      <main className="bg-[var(--background)] text-[var(--ink)]">
        <section className="section_quote_acceptance py-24 md:py-32">
          <div className="container_large padding_global">
            <div className="mx-auto grid max-w-5xl gap-12 border-y border-black/10 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
              <div>
                <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">Quote Acceptance</p>
                <h1 className="heading_section max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
                  Confirm your MIDTS quote.
                </h1>
                <p className="text_body mt-8 max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">
                  This page records acceptance of the quote reference sent by MIDTS. Project creation starts only after the accepted quote is confirmed in the MIDTS workflow.
                </p>
                <p className="text_body mt-5 max-w-xl text-xs font-medium uppercase text-[var(--subtle)]">
                  No payment is taken on this page.
                </p>
              </div>
              <QuoteAcceptanceForm initialQuoteId={quoteId} initialLeadId={leadId} />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
