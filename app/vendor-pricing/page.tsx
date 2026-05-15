import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import VendorPricingForm from '@/components/VendorPricingForm';

export const metadata = {
  title: 'Vendor Pricing | MIDTS',
  description: 'Submit vendor pricing for an assigned MIDTS engineering request.',
};

export default function VendorPricingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="padding_global py-20 md:py-28">
          <div className="container_large grid gap-12 border-t border-black/10 pt-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
            <div className="grid content-start gap-6">
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">MIDTS vendor pricing</p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-normal text-[var(--ink)] md:text-6xl">
                Submit pricing
              </h1>
              <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
                Use the project details sent by MIDTS to provide cost, turnaround, and assumptions for this assigned request.
              </p>
            </div>
            <Suspense fallback={<p className="text-sm text-[var(--subtle)]">Loading pricing form...</p>}>
              <VendorPricingForm />
            </Suspense>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
