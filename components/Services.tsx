const services = [
  {
    title: 'CAD overflow support',
    text: 'Drafting, modelling, revisions, and drawing packages when internal resource is maxed out.',
  },
  {
    title: 'CAM preparation',
    text: 'Manufacturing-aware support for clean handoffs, setup checks, and production-ready outputs.',
  },
  {
    title: 'Engineering documentation',
    text: 'Clear release packs, markups, and supplier-ready files that reduce back-and-forth.',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 text-[#111815] md:py-28">
      <div className="container_large padding_global">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase text-teal-700">Services</p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Practical engineering support, shaped around the work already on your desk.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <article key={service.title} className="rounded-lg border border-black/10 bg-[#f6f4ed] p-6 shadow-sm">
              <p className="text-sm font-bold text-teal-700">0{index + 1}</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-4 leading-7 text-[#526158]">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
