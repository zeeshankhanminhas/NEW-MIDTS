const steps = [
  {
    title: 'Share the requirement',
    text: 'Send drawings, models, standards, timelines, and the outcome you need delivered.',
  },
  {
    title: 'Scope and quote',
    text: 'We confirm feasibility, clarify unknowns, and agree the delivery path before work begins.',
  },
  {
    title: 'Production support starts',
    text: 'MIDTS works inside your preferred handoff rhythm with concise updates and clean revisions.',
  },
  {
    title: 'Files ready for handoff',
    text: 'You receive checked CAD/CAM or documentation output ready for the next production step.',
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-[#111815] py-20 text-white md:py-28">
      <div className="container_large padding_global grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-teal-300">Process</p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Fast to start, controlled through delivery.
          </h2>
        </div>
        <ol className="grid gap-4">
          {steps.map((step, index) => (
            <li key={step.title} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 md:grid-cols-[64px_1fr]">
              <span className="text-3xl font-semibold text-teal-300">{index + 1}</span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 leading-7 text-neutral-300">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
