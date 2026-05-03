export default function CTA() {
  return (
    <section id="contact" className="bg-white py-20 text-[#111815] md:py-28">
      <div className="container_large padding_global">
        <div className="grid gap-10 rounded-lg border border-black/10 bg-[#0a2f2b] p-8 text-white shadow-xl shadow-black/10 md:grid-cols-[1fr_auto] md:items-end md:p-10">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-teal-200">Need immediate capacity?</p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Send the brief. MIDTS can help you clear the next deadline.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-teal-50/80">
              Include the required output, source files, timescale, and any standards we need to follow. We will reply with the next practical step.
            </p>
          </div>
          <a className="inline-flex min-h-12 items-center justify-center rounded-md bg-teal-300 px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-teal-200" href="mailto:hello@midts.co.uk?subject=MIDTS%20project%20request">
            Email MIDTS
          </a>
        </div>
      </div>
    </section>
  );
}
