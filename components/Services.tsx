const services = [
  {
    title: 'Overflow CAD drafting support',
    text: 'Drafting, modelling, revisions, and drawing packages when internal resource is stretched.',
  },
  {
    title: 'Manufacturing-ready CAM assistance',
    text: 'Practical support for clean handoffs, setup checks, and production-ready outputs.',
  },
  {
    title: 'Engineering documentation handoff',
    text: 'Clear release packs, markups, and supplier-ready files that reduce back-and-forth.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section_services bg-white py-32 text-[#111815] md:py-44">
      <div className="container_large padding_global">
        <div className="services_wrapper mx-auto max-w-4xl">
          <div className="services_heading mx-auto max-w-2xl text-center">
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">Services</p>
            <h2 className="heading_section text-3xl font-semibold leading-tight md:text-4xl">
              Focused support for engineering teams under delivery pressure.
            </h2>
          </div>
          <div className="grid_services mt-16 border-y border-black/10">
            {services.map((service, index) => (
              <article key={service.title} className="card_service grid gap-6 border-b border-black/10 py-8 last:border-b-0 md:grid-cols-[96px_1fr] md:items-start">
                <p className="text_label text-sm font-medium text-neutral-400">0{index + 1}</p>
                <div>
                  <h3 className="heading_card text-xl font-semibold md:text-2xl">{service.title}</h3>
                  <p className="text_body mt-4 max-w-2xl text-base leading-7 text-[#526158] md:text-lg">{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
