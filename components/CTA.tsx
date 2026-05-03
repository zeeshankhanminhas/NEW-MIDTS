import EnquiryForm from './EnquiryForm';

export default function CTA() {
  return (
    <section id="contact" className="section_cta bg-white py-20 text-[#111815] md:py-32">
      <div className="container_large padding_global">
        <div className="cta_wrapper grid gap-10 rounded-lg border border-black/10 bg-[#0a2f2b] p-8 text-white shadow-xl shadow-black/10 md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div className="cta_content">
            <p className="text_eyebrow mb-4 text-sm font-semibold uppercase text-teal-200">Step 1 - Initial Project Request</p>
            <h2 className="heading_section max-w-3xl text-3xl font-medium leading-tight md:text-4xl">
              Technical brief follows by email.
            </h2>
            <p className="text_body mt-6 max-w-2xl text-base text-teal-50/80 md:text-lg">
              Step 1 helps us understand the request. Step 2 collects the technical detail needed to assess scope, timing, and quote accurately.
            </p>
            <p className="text_body mt-4 max-w-2xl text-sm font-medium uppercase text-teal-200">
              Quote only after technical review.
            </p>
            <a className="button_secondary mt-8 inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium uppercase text-white transition hover:border-white/50" href="mailto:hello@midts.co.uk?subject=MIDTS%20initial%20request">
              Email instead
            </a>
          </div>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
