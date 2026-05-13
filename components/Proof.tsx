const trustSignals = ['Confidential handling of engineering data', 'UK-based coordination', 'Dedicated engineering support'];

export default function Proof() {
  return (
    <section className="section_proof py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="proof_wrapper rounded-xl border border-neutral-800 p-8">
          <h2 className="heading_section mb-6 text-3xl font-medium md:text-4xl">Why MIDTS</h2>
          <p className="text_body mb-8 text-base text-neutral-400 md:text-lg">
            We are an overflow engineering partner that extends your delivery capacity when timelines tighten.
          </p>
          <div className="grid_proof grid gap-4 md:grid-cols-3">
            {trustSignals.map((signal) => (
              <div key={signal} className="card_trust rounded-lg border border-neutral-800 p-5 text-sm text-neutral-300">
                {signal}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
