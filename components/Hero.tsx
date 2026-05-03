const capabilities = [
  'Production-ready CAD support',
  'Reverse engineering support',
  'Manufacturing drawing support',
];

export default function Hero() {
  return (
    <section id="top" className="section_hero border-b border-white/10 bg-[#050705] py-24 md:py-40">
      <div className="container_large padding_global">
        <div className="hero_wrapper grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="hero_content max-w-5xl">
            <p className="text_eyebrow mb-6 text-sm font-semibold uppercase text-neutral-400">
              Overflow engineering partner
            </p>
            <h1 className="heading_hero max-w-6xl text-6xl font-semibold leading-tight text-white md:text-8xl">
              Overflow CAD/CAM support for teams that can&apos;t slow down.
            </h1>
            <p className="text_body mt-8 max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl">
              Production-ready CAD, reverse engineering, and drawing support - delivered when your internal capacity is stretched.
            </p>
            <div className="hero_actions mt-10">
              <a className="button_primary inline-flex min-h-12 items-center justify-center rounded-md bg-white px-7 py-3 text-sm font-medium uppercase text-black transition hover:bg-neutral-200" href="#contact">
                Start your request
              </a>
              <p className="text_support mt-4 text-sm text-neutral-500">
                For CAD/CAM overflow, reverse engineering, and production drawings.
              </p>
            </div>
          </div>

          <aside className="card_capabilities rounded-lg border border-white/10 bg-white/[0.03] p-6" aria-label="Engineering support capabilities">
            <p className="text_label text-sm font-semibold uppercase text-neutral-400">Support scope</p>
            <div className="grid_capabilities mt-6 grid gap-4">
              {capabilities.map((capability) => (
                <p key={capability} className="text_body border-t border-white/10 pt-4 text-base text-neutral-300 md:text-lg">
                  {capability}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
