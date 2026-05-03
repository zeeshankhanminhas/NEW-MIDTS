const services = [
  'Overflow CAD drafting support',
  'Manufacturing-ready CAM assistance',
  'Engineering documentation handoff',
];

export default function Services() {
  return (
    <section className="section_services py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="services_wrapper">
          <h2 className="heading_section mb-8 text-3xl font-medium md:text-4xl">How we support your team</h2>
          <div className="grid_services grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service} className="card_service rounded-lg border border-neutral-800 p-6">
                <p className="text_body text-base text-neutral-300 md:text-lg">{service}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
