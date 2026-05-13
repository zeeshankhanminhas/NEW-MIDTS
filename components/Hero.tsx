export default function Hero() {
  return (
    <section id="top" className="section_hero py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="hero_wrapper max-w-4xl">
          {/* Hero heading */}
          <p className="text_label mb-4 text-sm uppercase tracking-[0.2em] text-neutral-500">MIDTS</p>
          <h1 className="heading_hero mb-6 text-5xl font-semibold leading-tight md:text-6xl">
            Overflow CAD/CAM Support for Engineering Teams
          </h1>
          {/* Hero subtext */}
          <p className="text_body mb-8 text-base text-neutral-400 md:text-lg">Fast. Precise. On-demand engineering execution.</p>
          <a href="#enquiry" className="button_primary inline-flex rounded-md border border-white px-6 py-3 text-sm font-medium uppercase tracking-wide">
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
