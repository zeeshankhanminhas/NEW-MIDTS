const goodFit = [
  'Engineering teams with more work than internal capacity',
  'Manufacturers needing clean drawings or CAD/CAM support',
  'Projects with clear files, sketches, scans, or reference parts',
];

const notFit = [
  'Unclear requirements with no technical starting point',
  'Work that needs instant quoting before review',
  'Projects where confidentiality cannot be agreed upfront',
];

export default function Fit() {
  return (
    <section className="section_fit border-y border-black/15 bg-white py-32 text-[var(--ink)] md:py-44">
      <div className="container_large padding_global">
        <div className="fit_wrapper motion_fade_up mx-auto max-w-5xl border-y border-black/20 py-12">
          <div className="fit_heading max-w-2xl">
            <p className="text_eyebrow mb-6 text-sm font-semibold uppercase text-[var(--subtle)]">Fit</p>
            <h2 className="heading_section text-3xl font-semibold leading-tight md:text-4xl">
              Best when the requirement needs engineering control, not a rushed estimate.
            </h2>
          </div>
          <div className="grid_fit mt-12 grid gap-10 md:grid-cols-2">
            <div className="fit_column">
              <h3 className="heading_card text-lg font-semibold">Works well for</h3>
              <div className="mt-6 grid gap-4 border-t border-black/20 pt-5">
                {goodFit.map((item) => (
                  <p key={item} className="text_body text-sm leading-6 text-[var(--muted)]">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="fit_column">
              <h3 className="heading_card text-lg font-semibold">Not the right fit for</h3>
              <div className="mt-6 grid gap-4 border-t border-black/20 pt-5">
                {notFit.map((item) => (
                  <p key={item} className="text_body text-sm leading-6 text-[var(--muted)]">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
