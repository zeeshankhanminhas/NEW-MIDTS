const steps = [
  'Submit initial request',
  'Complete technical brief',
  'We assess and quote',
  'Work begins after approval',
];

export default function Process() {
  return (
    <section id="process" className="section_process bg-[#111815] py-32 text-white md:py-44">
      <div className="container_large padding_global">
        <div className="process_wrapper mx-auto max-w-4xl">
          <div className="process_heading mx-auto max-w-2xl text-center">
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-400">Process</p>
            <h2 className="heading_section text-3xl font-semibold leading-tight md:text-4xl">
              Start with a short request. We&apos;ll follow up with the technical brief.
            </h2>
          </div>
          <ol className="grid_process mt-16 border-y border-white/10">
            {steps.map((step, index) => (
              <li key={step} className="card_step grid gap-5 border-b border-white/10 py-7 last:border-b-0 md:grid-cols-[96px_1fr] md:items-center">
                <span className="text_label text-sm font-medium text-neutral-500">0{index + 1}</span>
                <p className="text_body text-lg text-neutral-200 md:text-xl">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
