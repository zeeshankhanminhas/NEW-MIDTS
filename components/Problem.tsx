const signals = [
  'Internal CAD team fully booked',
  'CAM work waiting on clean geometry',
  'Engineering packs needed before release',
  'Client deadlines fixed but capacity variable',
];

export default function Problem() {
  return (
    <section className="bg-[#f6f4ed] py-20 text-[#111815] md:py-28">
      <div className="container_large padding_global grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-teal-700">The pressure point</p>
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Your pipeline is healthy. Your team is just out of hours.
          </h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-[#44524b]">
            MIDTS gives you flexible technical capacity for the work that cannot sit in a queue. We support overflow CAD/CAM, revision cycles, and documentation handoff so your core team can stay focused on the highest-value decisions.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {signals.map((signal) => (
              <div key={signal} className="rounded-md border border-black/10 bg-white p-4 text-sm font-semibold shadow-sm">
                {signal}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
