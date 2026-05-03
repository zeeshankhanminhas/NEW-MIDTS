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
    <section id="services" className="section_services bg-white py-20 text-[#111815] md:py-32">
      <div className="container_large padding_global">
        <div className="services_wrapper">
          <div className="services_heading mb-8 max-w-3xl">
            <p className="text_eyebrow mb-4 text-sm font-semibold uppercase text-teal-700">Services</p>
            <h2 className="heading_section text-3xl font-medium leading-tight md:text-4xl">
              How we support your team
            </h2>
          </div>
          <div className="grid_services grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.title} className="card_service rounded-lg border border-black/10 bg-[#f6f4ed] p-6 shadow-sm">
                <p className="text_label text-sm font-bold text-teal-700">0{index + 1}</p>
                <h3 className="heading_card mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="text_body mt-4 text-base text-[#526158] md:text-lg">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
