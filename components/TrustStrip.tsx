const points = [
  'Built for design and manufacturing teams',
  'Aligned to your timeline and workflow',
  'Precise output with minimal handoff friction',
];

export default function TrustStrip() {
  return (
    <section className="section_trust bg-[#f6f4ed] py-20 text-[#111815] md:py-32">
      <div className="container_large padding_global">
        <div className="trust_wrapper grid gap-6 border-y border-black/10 py-8 text-sm font-semibold md:grid-cols-3">
          {points.map((point) => (
            <p key={point} className="text_body">
              {point}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
