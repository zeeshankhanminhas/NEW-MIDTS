const proof = [
  'No onboarding friction',
  'No delays',
  'No compromise on precision',
];

export default function Proof() {
  return (
    <section className="section_proof bg-[#f6f4ed] py-20 text-[#111815] md:py-32">
      <div className="container_large padding_global">
        <div className="proof_wrapper grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="proof_heading max-w-4xl">
            <p className="text_eyebrow mb-4 text-sm font-semibold uppercase text-teal-700">Solution</p>
            <h2 className="heading_section text-3xl font-medium leading-tight md:text-4xl">
              We act as an extension of your team.
            </h2>
          </div>
          <div className="grid_proof grid gap-4">
            {proof.map((item) => (
              <article key={item} className="card_proof rounded-lg border border-black/10 bg-white p-6 shadow-sm">
                <p className="text_body text-base font-medium text-[#44524b] md:text-lg">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
