const points = [
  'Capacity for urgent CAD, CAM, and documentation overflow',
  'Works around your current tools, standards, and delivery rhythm',
  'Built for quiet handoffs, fast communication, and production accuracy',
];

export default function TrustStrip() {
  return (
    <section className="bg-[#f6f4ed] py-8 text-[#111815]">
      <div className="container_large padding_global">
        <div className="grid gap-4 border-y border-black/10 py-7 text-sm font-semibold md:grid-cols-3">
          {points.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
