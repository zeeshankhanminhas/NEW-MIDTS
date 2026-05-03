const capabilities = [
  'Production-ready CAD support',
  'Reverse engineering support',
  'Manufacturing drawing support',
];

export default function Hero() {
  return (
    <section id="top" className="section_hero border-b border-white/10 bg-[#050705] py-36 md:py-52">
      <div className="container_large padding_global">
        <div className="hero_wrapper mx-auto max-w-2xl text-center">
          <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-400">
            Overflow engineering partner
          </p>
          <h1 className="heading_hero mx-auto max-w-2xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            <span className="block">Overflow CAD/CAM support</span>
            <span className="block">for teams that can&apos;t slow down.</span>
          </h1>
          <p className="text_body mx-auto mt-10 max-w-xl text-lg leading-8 text-neutral-300 md:text-xl">
            Production-ready CAD, reverse engineering, and drawing support - delivered when your internal capacity is stretched.
          </p>
          <div className="hero_actions mt-14">
            <a className="button_primary inline-flex min-h-14 items-center justify-center rounded-md bg-white px-8 py-4 text-sm font-medium uppercase text-black transition hover:bg-neutral-200" href="#contact">
              Start your request
            </a>
            <p className="text_support mx-auto mt-6 max-w-xl text-sm text-neutral-500">
              For CAD/CAM overflow, reverse engineering, and production drawings.
            </p>
          </div>

          <aside className="card_capabilities mt-16 rounded-lg border border-white/10 bg-white/[0.03] p-6 text-left" aria-label="Engineering support capabilities">
            <p className="text_label text-sm font-semibold uppercase text-neutral-400">Support scope</p>
            <div className="grid_capabilities mt-6 grid gap-4 md:grid-cols-3">
              {capabilities.map((capability) => (
                <p key={capability} className="text_body border-t border-white/10 pt-4 text-base text-neutral-300">
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
