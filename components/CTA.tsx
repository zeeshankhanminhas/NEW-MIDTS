export default function CTA() {
  return (
    <section id="contact" className="section_cta bg-white py-20 text-[#111815] md:py-32">
      <div className="container_large padding_global">
        <div className="cta_wrapper rounded-lg border border-black/10 bg-[#0a2f2b] p-8 text-white shadow-xl shadow-black/10 md:p-10">
          <p className="text_eyebrow mb-4 text-sm font-semibold uppercase text-teal-200">Need immediate capacity?</p>
          <h2 className="heading_section max-w-3xl text-3xl font-medium leading-tight md:text-4xl">
            Send your requirements. We&apos;ll handle the rest.
          </h2>
          <p className="text_body mt-6 max-w-2xl text-base text-teal-50/80 md:text-lg">
            Share your requirement, files, timescale, and any standards we need to follow.
          </p>
          <a className="button_primary mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-teal-300 px-6 py-3 text-sm font-medium uppercase text-black transition hover:bg-teal-200" href="mailto:hello@midts.co.uk?subject=MIDTS%20requirement">
            Submit requirement
          </a>
        </div>
      </div>
    </section>
  );
}
