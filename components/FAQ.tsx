const faqs = [
  {
    question: 'What file formats do you work with?',
    answer:
      'We accept all major CAD and production formats: STEP, DXF, DWG, STL, PDF markups, and native files from SolidWorks, AutoCAD, Fusion 360, Inventor, CATIA, and Creo.',
  },
  {
    question: 'How is pricing calculated?',
    answer:
      'All work is quoted per project after scope review. You receive a fixed cost and delivery timeline before approving work.',
  },
  {
    question: 'What happens if the output does not match the requirement?',
    answer:
      'Deliverables are checked against the agreed brief before release. Defined revisions within the original scope are included.',
  },
  {
    question: 'Do I need to sign an NDA before sharing files?',
    answer:
      'No technical files are needed at initial intake. NDA review is available before any drawings or models are shared.',
  },
  {
    question: 'Is there a minimum project size or volume commitment?',
    answer:
      'No minimum volume or ongoing commitment is required. MIDTS supports individual overflow tasks and repeat production requirements.',
  },
  {
    question: 'How long does the initial review take?',
    answer:
      'Initial review is typically completed within one UK business day. If clarification is needed, we contact you using the work email provided.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section_faq py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="faq_wrapper max-w-4xl">
          <h2 className="heading_section mb-8 text-3xl font-medium md:text-4xl">Common questions before submitting.</h2>
          <div className="grid_faq grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card_faq rounded-lg border border-neutral-800 p-5">
                <summary className="cursor-pointer text-base font-medium text-neutral-200 md:text-lg">{faq.question}</summary>
                <p className="text_body mt-4 text-base text-neutral-400 md:text-lg">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
