const steps = [
  'Share your requirement',
  'We assess and quote',
  'Work begins',
  'Delivery on time',
];

export default function Process() {
  return (
    <section id="process" className="section_process bg-[#111815] py-20 text-white md:py-32">
      <div className="container_large padding_global">
        <div className="process_wrapper grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text_eyebrow mb-4 text-sm font-semibold uppercase text-teal-300">Process</p>
            <h2 className="heading_section text-3xl font-medium leading-tight md:text-4xl">
              Simple, direct process
            </h2>
          </div>
          <ol className="grid_process grid gap-4">
            {steps.map((step, index) => (
              <li key={step} className="card_step grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 text-base text-neutral-300 md:grid-cols-[64px_1fr] md:text-lg">
                <span className="text_label text-3xl font-semibold text-teal-300">{index + 1}</span>
                <p className="text_body">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
