'use client';

import { useSearchParams } from 'next/navigation';
import QuoteAcceptanceForm from './QuoteAcceptanceForm';

export default function QuoteAcceptancePageContent() {
  const searchParams = useSearchParams();
  const quoteId = searchParams.get('quoteId') || '';
  const token = searchParams.get('token') || '';

  return (
    <section className="section_quote_acceptance py-24 md:py-32">
      <div className="container_large padding_global">
        <div className="mx-auto grid max-w-5xl gap-12 border-y border-black/10 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">Quote Review</p>
            <h1 className="heading_section max-w-xl text-3xl font-semibold leading-tight md:text-4xl">Review and respond to your MIDTS quote.</h1>
            <p className="text_body mt-8 max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">
              Use the secure link from your MIDTS email to view the public quote summary, then accept or reject it. Project setup starts only after a valid quote acceptance is confirmed.
            </p>
            <p className="text_body mt-5 max-w-xl text-xs font-medium uppercase text-[var(--subtle)]">No payment is taken on this page.</p>
          </div>
          <QuoteAcceptanceForm initialQuoteId={quoteId} initialToken={token} />
        </div>
      </div>
    </section>
  );
}
