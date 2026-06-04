import EnquiryForm from './EnquiryForm';

export default function CTA() {
  return (
    <section id="contact" className="section_cta border-y border-white/10 bg-[var(--black)] py-32 text-white md:py-44">
      <div className="container_large padding_global">
        <div className="cta_wrapper motion_fade_up mx-auto grid max-w-5xl gap-12 border-y border-white/10 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div className="cta_content">
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-400">Step 1 - Initial Project Request</p>
            <h2 className="heading_section max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
              Technical brief follows by email.
            </h2>
            <p className="text_body mt-8 max-w-xl text-base leading-7 text-neutral-300 md:text-lg">
              Step 1 helps us understand the request. Step 2 collects the technical detail needed to assess scope, timing, and quote accurately.
            </p>
            <p className="text_body mt-5 max-w-xl text-xs font-medium uppercase text-neutral-500">
              Quote only after technical review.
            </p>
            <a className="button_secondary motion_button mt-10 inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium uppercase text-white transition hover:border-white/50" href="mailto:intake@midts.com?subject=MIDTS%20initial%20request">
              Email instead
            </a>
          </div>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
