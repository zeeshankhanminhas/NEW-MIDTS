const signals = [
  'Deadlines tightening',
  'Hiring takes time',
  'Capacity stretched',
  'Projects cannot wait',
];

export default function Problem() {
  return (
    <section className="section_problem border-t border-black/10 bg-[var(--paper)] py-32 text-[var(--ink)] md:py-44">
      <div className="container_large padding_global">
        <div className="problem_wrapper mx-auto max-w-2xl text-center">
          <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">The pressure point</p>
          <h2 className="heading_section mx-auto max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
            Your team is at capacity.
          </h2>
          <p className="text_body mx-auto mt-10 max-w-xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            Deadlines are tightening. Hiring takes time you don&apos;t have. Projects don&apos;t wait.
          </p>
          <div className="grid_signals mt-14 grid gap-4 border-y border-black/10 py-5 text-xs font-medium uppercase text-[var(--subtle)] sm:grid-cols-2 md:grid-cols-4">
            {signals.map((signal) => (
              <p key={signal} className="text_signal md:border-l md:border-black/10 md:first:border-l-0">
                {signal}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
