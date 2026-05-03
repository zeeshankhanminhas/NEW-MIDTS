const metrics = [
  { value: 'Step 1', label: 'Initial request' },
  { value: 'Step 2', label: 'Technical brief by email' },
  { value: 'Quote', label: 'After qualification' },
];

export default function Hero() {
  return (
    <section id="top" className="section_hero relative isolate overflow-hidden border-b border-white/10 bg-[#050705] py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.2),transparent_34%),linear-gradient(115deg,rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="container_large padding_global">
        <div className="hero_wrapper grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          <div className="hero_content max-w-4xl">
            <p className="text_eyebrow mb-4 text-sm font-semibold uppercase text-teal-300">
              Overflow engineering partner
            </p>
            <h1 className="heading_hero max-w-5xl text-5xl font-semibold leading-tight text-white md:text-6xl">
              Overflow CAD/CAM support for teams that can&apos;t slow down.
            </h1>
            <p className="text_body mt-6 max-w-2xl text-base text-neutral-300 md:text-lg">
              Start with a short initial request. The technical brief follows by email so we can qualify the work before quoting.
            </p>
            <div className="hero_actions mt-8 flex flex-wrap gap-3">
              <a className="button_primary rounded-md bg-teal-300 px-6 py-3 text-sm font-medium uppercase text-black transition hover:bg-teal-200" href="#contact">
                Start a request
              </a>
              <a className="button_secondary rounded-md border border-white/20 px-6 py-3 text-sm font-medium uppercase text-white transition hover:border-white/50" href="#process">
                See process
              </a>
            </div>
          </div>

          <aside className="card_snapshot rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur" aria-label="Lead qualification flow">
            <p className="text_label text-sm font-semibold uppercase text-teal-200">Qualification flow</p>
            <div className="grid_metrics mt-6 grid gap-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="card_metric border-t border-white/10 pt-4">
                  <p className="heading_metric text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="text_body mt-1 text-sm text-neutral-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
