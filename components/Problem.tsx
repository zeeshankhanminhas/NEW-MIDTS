const signals = [
  'Deadlines are tightening',
  'Hiring takes time',
  'Internal capacity is stretched',
  'Projects do not wait',
];

export default function Problem() {
  return (
    <section className="section_problem bg-[#f6f4ed] py-20 text-[#111815] md:py-32">
      <div className="container_large padding_global">
        <div className="problem_wrapper grid gap-12 border-b border-black/10 pb-20 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="text_eyebrow mb-4 text-sm font-semibold uppercase text-teal-700">The pressure point</p>
            <h2 className="heading_section max-w-2xl text-3xl font-medium leading-tight md:text-4xl">
              Your team is at capacity.
            </h2>
          </div>
          <div>
            <p className="text_body max-w-2xl text-base leading-8 text-[#44524b] md:text-lg">
              Deadlines are tightening. Hiring takes time you don&apos;t have. Projects don&apos;t wait.
            </p>
            <div className="grid_signals mt-8 grid gap-4 sm:grid-cols-2">
              {signals.map((signal) => (
                <div key={signal} className="card_signal rounded-lg border border-black/10 bg-white p-5 text-base font-medium shadow-sm">
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
