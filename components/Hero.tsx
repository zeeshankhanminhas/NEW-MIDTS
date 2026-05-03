export default function Hero() {
  return (
    <section className="section_hero py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="hero_wrapper max-w-4xl">
          {/* Hero heading */}
          <h1 className="heading_hero mb-6 text-5xl font-semibold leading-tight md:text-6xl">
            Overflow CAD/CAM support for teams that can&apos;t slow down.
          </h1>
          {/* Hero subtext */}
          <p className="text_body mb-8 text-base text-neutral-400 md:text-lg">
            We integrate with your workflow and deliver precise engineering output when your internal capacity is stretched.
          </p>
          <button className="button_primary rounded-md border border-white px-6 py-3 text-sm font-medium uppercase tracking-wide">
            Request a quote
          </button>
        </div>
      </div>
    </section>
  );
}
