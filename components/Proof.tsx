const reasons = [
  {
    title: 'Capacity without hiring',
    text: 'Add engineering execution when the workload spikes, without waiting on recruitment or long onboarding cycles.',
  },
  {
    title: 'Controlled technical handoff',
    text: 'Work moves through a structured intake, review, and delivery flow so scope and files stay clear.',
  },
  {
    title: 'Output ready for use',
    text: 'Drawing packs, CAD files, and documentation are prepared for manufacturing, internal review, or supplier handoff.',
  },
];

export default function Proof() {
  return (
    <section id="why-midts" className="section_proof border-y border-white/10 bg-[var(--black)] py-32 text-white md:py-44">
      <div className="container_large padding_global">
        <div className="proof_wrapper mx-auto max-w-4xl">
          <div className="proof_heading motion_fade_up mx-auto max-w-2xl text-center">
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-200">Why MIDTS</p>
            <h2 className="heading_section mx-auto max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
              Built for teams that need reliable engineering output, not more coordination overhead.
            </h2>
          </div>
          <div className="grid_proof mt-16 border-y border-white/15">
            {reasons.map((reason, index) => (
              <article key={reason.title} className="card_reason motion_fade_up grid gap-6 border-b border-white/15 py-8 last:border-b-0 md:grid-cols-[96px_1fr] md:items-start">
                <p className="text_label text-sm font-medium text-neutral-300">0{index + 1}</p>
                <div>
                  <h3 className="heading_card text-xl font-semibold md:text-2xl">{reason.title}</h3>
                  <p className="text_body mt-4 max-w-2xl text-base leading-7 text-white md:text-lg">{reason.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
