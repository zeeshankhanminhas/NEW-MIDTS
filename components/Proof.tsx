const proof = [
  'Clean technical communication with no bloated project management layer',
  'Support for urgent overflow without long hiring or onboarding cycles',
  'Outputs prepared for design review, manufacturing, or client handoff',
];

export default function Proof() {
  return (
    <section className="bg-[#f6f4ed] py-20 text-[#111815] md:py-28">
      <div className="container_large padding_global">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase text-teal-700">Why teams use MIDTS</p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Extra engineering hands without losing control of quality.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {proof.map((item) => (
            <article key={item} className="border-l-4 border-teal-600 bg-white p-6 shadow-sm">
              <p className="leading-7 text-[#44524b]">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
