const faqs = [
  {
    question: 'Can you quote from the initial request?',
    answer:
      'We review the initial request first, then ask for the technical brief where needed. Quote follows technical review so scope, timing, and deliverables are clear.',
  },
  {
    question: 'What files can we send?',
    answer:
      'Typical inputs include CAD files, drawings, sketches, scan data, DXF files, PDFs, photos, or reference parts. Step 2 collects the detail needed for review.',
  },
  {
    question: 'Is confidential engineering data handled under NDA?',
    answer:
      'Yes. The workflow is NDA-ready for confidential projects and controlled file handoff.',
  },
  {
    question: 'What type of support is MIDTS built for?',
    answer:
      'MIDTS is built for CAD/CAM overflow, reverse engineering, production drawings, documentation packs, and supplier-ready engineering outputs.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section_faq border-t border-black/10 bg-[var(--paper)] py-32 text-[var(--ink)] md:py-44">
      <div className="container_large padding_global">
        <div className="faq_wrapper mx-auto max-w-4xl">
          <div className="faq_heading motion_fade_up mx-auto max-w-2xl text-center">
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">FAQ</p>
            <h2 className="heading_section text-3xl font-semibold leading-tight md:text-4xl">
              Common questions before sending a request.
            </h2>
          </div>
          <div className="grid_faq mt-16 border-y border-black/10">
            {faqs.map((item) => (
              <article key={item.question} className="card_faq motion_fade_up grid gap-4 border-b border-black/10 py-7 last:border-b-0 md:grid-cols-[0.75fr_1fr]">
                <h3 className="heading_card text-lg font-semibold">{item.question}</h3>
                <p className="text_body text-base leading-7 text-[var(--muted)]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
