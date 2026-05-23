import { Suspense } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Step2TechnicalIntakeForm from '@/components/Step2TechnicalIntakeForm';

export const metadata = {
  title: 'Step 2 Technical Intake | MIDTS',
  description: 'Complete Step 2 technical intake for your existing MIDTS lead.',
};

export default function Step2Page() {
  return (
    <>
      <Header />
      <main>
        <section className="padding_global py-20 md:py-28">
          <div className="container_large grid gap-12 border-t border-black/10 pt-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
            <div className="grid content-start gap-6">
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">MIDTS Step 2</p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-normal text-[var(--ink)] md:text-6xl">Technical intake</h1>
              <p className="max-w-xl text-base leading-7 text-[var(--muted)]">Provide technical requirements, timeline, complexity, and file metadata so MIDTS can scope your project accurately.</p>
            </div>
            <Suspense fallback={<p className="text-sm text-[var(--subtle)]">Loading intake form...</p>}>
              <Step2TechnicalIntakeForm />
            </Suspense>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
