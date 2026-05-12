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

const software = ['SOLIDWORKS', 'Fusion 360', 'AutoCAD', 'Inventor', 'STEP / IGES', 'DXF / PDF'];

export default function Services() {
  return (
    <section id="services" className="section_services bg-white py-32 text-[var(--ink)] md:py-44">
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
                  <p className="text_body mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">{service.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="software_strip mt-12 border-y border-black/10 py-6">
            <p className="text_eyebrow text-xs font-semibold uppercase text-neutral-500">Common file and software workflows</p>
            <div className="grid_software mt-5 grid gap-3 text-xs font-medium uppercase text-[var(--subtle)] sm:grid-cols-2 md:grid-cols-3">
              {software.map((item, index) => (
                <p key={item} className="text_software border-t border-black/10 pt-3 sm:border-t-0 sm:border-l sm:pl-4 sm:[&:nth-child(2n+1)]:border-l-0 md:[&:nth-child(2n+1)]:border-l md:[&:nth-child(3n+1)]:border-l-0">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
