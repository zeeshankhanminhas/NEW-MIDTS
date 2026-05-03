const metrics = [
  { value: '24-48h', label: 'Typical start window' },
  { value: 'CAD/CAM', label: 'Production support' },
  { value: 'On demand', label: 'Extra capacity' },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#050705]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.24),transparent_34%),linear-gradient(115deg,rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="container_large padding_global py-8 md:py-10">
        <header className="flex items-center justify-between gap-6">
          <a href="#top" className="text-lg font-semibold tracking-tight text-white">
            MIDTS
          </a>
          <nav className="hidden items-center gap-7 text-sm text-neutral-300 md:flex" aria-label="Primary navigation">
            <a className="transition hover:text-white" href="#services">Services</a>
            <a className="transition hover:text-white" href="#process">Process</a>
            <a className="transition hover:text-white" href="#contact">Contact</a>
          </nav>
        </header>
      </div>

      <div id="top" className="container_large padding_global grid min-h-[78vh] items-center gap-12 pb-20 pt-8 md:grid-cols-[1.05fr_0.95fr] md:pb-28 md:pt-14">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase text-teal-300">
            Overflow engineering support
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
            CAD/CAM capacity when deadlines cannot move.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 md:text-xl">
            MIDTS helps design, manufacturing, and dental engineering teams clear urgent CAD/CAM work without slowing internal production.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="rounded-md bg-teal-300 px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-teal-200" href="mailto:hello@midts.co.uk?subject=MIDTS%20project%20request">
              Request support
            </a>
            <a className="rounded-md border border-white/20 px-6 py-3 text-sm font-bold uppercase text-white transition hover:border-white/50" href="#services">
              View services
            </a>
          </div>
        </div>

        <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur md:p-7" aria-label="Delivery snapshot">
          <p className="text-sm font-semibold uppercase text-teal-200">Live delivery model</p>
          <div className="mt-6 grid gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="border-t border-white/10 pt-4">
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-neutral-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
