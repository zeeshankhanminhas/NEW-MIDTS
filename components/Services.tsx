const services = [
  'Overflow CAD drafting support',
  'Manufacturing-ready CAM assistance',
  'Engineering documentation handoff',
];

const software = ['SolidWorks', 'AutoCAD', 'Fusion 360', 'Inventor', 'CATIA', 'Creo', 'STEP', 'DXF / DWG', 'STL', 'PDF markups'];

export default function Services() {
  return (
    <section id="services" className="section_services py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="services_wrapper">
          <h2 className="heading_section mb-8 text-3xl font-medium md:text-4xl">How we support your team</h2>
          <div className="grid_services mb-8 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service} className="card_service rounded-lg border border-neutral-800 p-6">
                <p className="text_body text-base text-neutral-300 md:text-lg">{service}</p>
              </article>
            ))}
          </div>
          <div className="services_software_wrapper rounded-lg border border-neutral-800 p-6">
            <p className="text_label mb-4 text-sm uppercase tracking-[0.2em] text-neutral-500">Works with</p>
            <div className="grid_software flex flex-wrap gap-3">
              {software.map((item) => (
                <span key={item} className="rounded-full border border-neutral-800 px-3 py-2 text-sm text-neutral-400">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
