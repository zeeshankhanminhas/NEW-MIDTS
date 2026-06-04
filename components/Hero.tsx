const capabilities = [
  'Production-ready CAD support',
  'Reverse engineering support',
  'Manufacturing drawing support',
];

export default function Hero() {
  return (
    <section id="top" className="section_hero motion_hero border-b border-white/10 bg-[var(--black)] py-36 md:py-52">
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
            <a className="button_primary motion_button inline-flex min-h-14 items-center justify-center rounded-md bg-white px-8 py-4 text-sm font-medium uppercase text-black transition hover:bg-[var(--technical)]" href="#contact">
              Start your request
            </a>
            <p className="text_support mx-auto mt-6 max-w-xl text-sm text-neutral-500">
              For CAD/CAM overflow, reverse engineering, and production drawings.
            </p>
          </div>

          <aside className="scope_wrapper mt-14 border-y border-white/10 py-5" aria-label="Engineering support capabilities">
            <div className="grid_capabilities grid gap-4 text-center text-xs font-medium uppercase text-neutral-500 md:grid-cols-3">
              {capabilities.map((capability) => (
                <p key={capability} className="text_scope md:border-l md:border-white/10 md:first:border-l-0">
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
