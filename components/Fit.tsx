const goodFit = ['Defined CAD/CAM overflow tasks', 'Clear drawing, model, or revision requirements', 'Teams that need extra capacity without hiring'];
const poorFit = ['Undefined R&D ownership', 'Emergency work without technical scope', 'Projects requiring on-site production control'];

export default function Fit() {
  return (
    <section id="fit" className="section_fit py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="fit_wrapper">
          <h2 className="heading_section mb-8 text-3xl font-medium md:text-4xl">Where MIDTS fits.</h2>
          <div className="grid_fit grid gap-6 md:grid-cols-2">
            <article className="card_fit rounded-lg border border-neutral-800 p-6">
              <h3 className="heading_card mb-6 text-xl font-medium">Works well for</h3>
              <ul className="grid gap-4 text-base text-neutral-400 md:text-lg">
                {goodFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card_fit rounded-lg border border-neutral-800 p-6">
              <h3 className="heading_card mb-6 text-xl font-medium">Not the right fit for</h3>
              <ul className="grid gap-4 text-base text-neutral-400 md:text-lg">
                {poorFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
