const points = [
  'UK-facing engineering communication',
  'NDA-ready workflow for confidential projects',
  'Structured intake for fast turnaround',
  'CAD/CAM overflow support on demand',
];

export default function TrustStrip() {
  return (
    <section className="section_trust border-y border-black/15 bg-white py-10 text-[var(--ink)]">
      <div className="container_large padding_global">
        <div className="trust_wrapper motion_fade_up grid gap-4 border-y border-black/15 py-6 text-sm font-semibold text-[var(--ink)] sm:grid-cols-2 md:grid-cols-4">
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
