const proof = [
  'No onboarding friction',
  'No delays',
  'No compromise on precision',
];

export default function Proof() {
  return (
    <section className="section_proof bg-[#f6f4ed] py-32 text-[#111815] md:py-44">
      <div className="container_large padding_global">
        <div className="proof_wrapper mx-auto max-w-2xl text-center">
          <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">Solution</p>
          <h2 className="heading_section mx-auto max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
            We act as an extension of your team.
          </h2>
          <div className="grid_proof mt-14 grid gap-4 border-y border-black/10 py-5 text-xs font-medium uppercase text-[#6a746e] md:grid-cols-3">
            {proof.map((item) => (
              <p key={item} className="text_proof md:border-l md:border-black/10 md:first:border-l-0">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
