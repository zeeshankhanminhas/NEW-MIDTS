const points = [
  'UK-facing engineering support',
  'NDA-ready workflow',
  'Structured intake process',
  'Fast response turnaround',
];

export default function TrustStrip() {
  return (
    <section className="section_trust bg-[#050705] py-8 text-white">
      <div className="container_large padding_global">
        <div className="trust_wrapper grid gap-4 border-y border-white/10 py-6 text-sm font-medium text-neutral-300 sm:grid-cols-2 md:grid-cols-4">
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
