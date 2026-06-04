const workflow = [
  {
    title: 'Client upload',
    text: 'Secure submission of drawings, sketches, models, or reference files.',
    icon: 'upload',
  },
  {
    title: 'Initial review',
    text: 'Feasibility check, scope definition, and clarification where needed.',
    icon: 'review',
  },
  {
    title: 'Scope and quote',
    text: 'Clear breakdown of deliverables, timeline, and cost.',
    icon: 'clipboard',
  },
  {
    title: 'Execution and QA',
    text: 'CAD/CAM support, detailing, and internal quality validation.',
    icon: 'gear',
  },
  {
    title: 'Delivery pack',
    text: 'Structured files, drawings, and documentation ready for use.',
    icon: 'package',
  },
];

const drawingDetails = [
  'Fully dimensioned 2D drawings',
  'Dimensions and tolerances',
  'Material notes',
  'Revision history',
  'Project metadata',
];

const fileTree = [
  { level: 0, label: '/MIDTS-PRJ-001/', indent: 'pl-0' },
  { level: 1, label: 'CAD/', indent: 'pl-5' },
  { level: 2, label: 'part_model.step', indent: 'pl-10' },
  { level: 2, label: 'assembly.step', indent: 'pl-10' },
  { level: 1, label: 'Drawings/', indent: 'pl-5' },
  { level: 2, label: 'part_drawing_v1.pdf', indent: 'pl-10' },
  { level: 2, label: 'assembly_drawing_v1.pdf', indent: 'pl-10' },
  { level: 1, label: 'Exports/', indent: 'pl-5' },
  { level: 2, label: 'dxf_files/', indent: 'pl-10' },
  { level: 1, label: 'QA_Report.pdf', indent: 'pl-5' },
  { level: 1, label: 'Revision_Log.xlsx', indent: 'pl-5' },
];

const deliveryChecks = [
  'Clear file naming conventions',
  'Version-controlled outputs',
  'QA-reviewed before delivery',
  'Compatible with manufacturing workflows',
];

function LineIcon({ type }: { type: string }) {
  const common = 'stroke-current';

  return (
    <svg className="h-10 w-10 text-current" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {type === 'upload' ? (
        <>
          <path className={common} d="M24 32V10" strokeWidth="1.6" strokeLinecap="round" />
          <path className={common} d="M15 19l9-9 9 9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path className={common} d="M12 28v8h24v-8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
      {type === 'review' ? (
        <>
          <path className={common} d="M13 10h18v28H13z" strokeWidth="1.6" />
          <circle className={common} cx="30" cy="30" r="7" strokeWidth="1.6" />
          <path className={common} d="M35 35l5 5" strokeWidth="1.6" strokeLinecap="round" />
        </>
      ) : null}
      {type === 'clipboard' ? (
        <>
          <path className={common} d="M16 11h16l3 5v24H13V16z" strokeWidth="1.6" strokeLinejoin="round" />
          <path className={common} d="M20 22h12M20 29h12M20 36h8" strokeWidth="1.6" strokeLinecap="round" />
        </>
      ) : null}
      {type === 'gear' ? (
        <>
          <circle className={common} cx="18" cy="24" r="5" strokeWidth="1.6" />
          <circle className={common} cx="31" cy="17" r="4" strokeWidth="1.6" />
          <circle className={common} cx="32" cy="32" r="5" strokeWidth="1.6" />
          <path className={common} d="M23 22l4-3M23 27l5 3" strokeWidth="1.6" strokeLinecap="round" />
        </>
      ) : null}
      {type === 'package' ? (
        <>
          <path className={common} d="M14 17l10-5 10 5v14l-10 5-10-5z" strokeWidth="1.6" strokeLinejoin="round" />
          <path className={common} d="M14 17l10 5 10-5M24 22v14" strokeWidth="1.6" strokeLinejoin="round" />
          <circle className={common} cx="35" cy="35" r="7" strokeWidth="1.6" />
          <path className={common} d="M32 35l2 2 4-5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
    </svg>
  );
}

function DrawingPreview() {
  return (
    <div className="drawing_preview border border-black/20 bg-white p-4">
      <svg viewBox="0 0 640 420" className="h-auto w-full text-[var(--ink)]" fill="none" aria-label="Sample technical drawing preview">
        <rect x="18" y="18" width="604" height="384" stroke="currentColor" strokeWidth="1" />
        <path d="M74 154h118l38-46h150l40 46h80v70h-84l-36 44H230l-40-44H74z" stroke="currentColor" strokeWidth="2" />
        <path d="M134 154v70M226 109v160M382 109v160M472 154v70" stroke="currentColor" strokeWidth="1" />
        <circle cx="314" cy="188" r="52" stroke="currentColor" strokeWidth="2" />
        <circle cx="314" cy="188" r="21" stroke="currentColor" strokeWidth="1" />
        <path d="M88 91h136M404 91h96M88 296h130M416 296h100" stroke="currentColor" strokeWidth="1" />
        <path d="M88 84v14M224 84v14M404 84v14M500 84v14M88 289v14M218 289v14M416 289v14M516 289v14" stroke="currentColor" strokeWidth="1" />
        <text x="142" y="78" fontSize="16" fill="currentColor">120</text>
        <text x="440" y="78" fontSize="16" fill="currentColor">80</text>
        <text x="136" y="286" fontSize="16" fill="currentColor">95</text>
        <text x="452" y="286" fontSize="16" fill="currentColor">4x 09 THRU</text>
        <path d="M456 318h128v64H456z" stroke="currentColor" strokeWidth="1" />
        <path d="M456 340h128M500 318v64" stroke="currentColor" strokeWidth="1" />
        <text x="470" y="335" fontSize="12" fill="currentColor">MIDTS</text>
        <text x="470" y="360" fontSize="11" fill="currentColor">PART NAME</text>
        <text x="506" y="360" fontSize="11" fill="currentColor">MOUNTING BRACKET</text>
        <text x="470" y="378" fontSize="11" fill="currentColor">DWG</text>
        <text x="506" y="378" fontSize="11" fill="currentColor">MIDTS-PRJ-001</text>
        <path d="M58 318h300v64H58zM58 340h300M112 318v64M240 318v64" stroke="currentColor" strokeWidth="1" />
        <text x="70" y="335" fontSize="11" fill="currentColor">REV</text>
        <text x="124" y="335" fontSize="11" fill="currentColor">DESCRIPTION</text>
        <text x="252" y="335" fontSize="11" fill="currentColor">DATE</text>
        <text x="70" y="360" fontSize="11" fill="currentColor">A</text>
        <text x="124" y="360" fontSize="11" fill="currentColor">INITIAL RELEASE</text>
        <text x="252" y="360" fontSize="11" fill="currentColor">20-05-2026</text>
      </svg>
    </div>
  );
}

export default function ProofOfWork() {
  return (
    <>
      <section id="process" className="section_proof_work border-y border-white/10 bg-[var(--black)] py-32 text-white md:py-44">
        <div className="container_large padding_global">
          <div className="proof_work_wrapper mx-auto max-w-6xl">
            <div className="proof_work_heading motion_fade_up max-w-2xl">
              <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-200">Our process</p>
              <h2 className="heading_section text-4xl font-semibold leading-tight md:text-5xl">
                Not a promise. A visible workflow.
              </h2>
              <p className="text_body mt-8 max-w-xl text-base leading-7 text-white md:text-lg">
                Every project follows a controlled engineering process, from intake to delivery, with defined checkpoints and quality control at each stage.
              </p>
            </div>

            <div className="grid_workflow mt-16 grid gap-4 md:grid-cols-5">
              {workflow.map((item, index) => (
                <article key={item.title} className="card_workflow motion_fade_up border border-white/20 bg-[var(--black)] p-5">
                  <p className="text_label text-sm font-semibold text-neutral-200">0{index + 1}</p>
                  <div className="mt-7 text-white">
                    <LineIcon type={item.icon} />
                  </div>
                  <h3 className="heading_card mt-7 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text_body mt-4 text-sm leading-6 text-white">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="proof_note motion_fade_up mt-8 border-y border-white/20 px-5 py-5 text-sm text-white">
              Every stage is logged, reviewed, and controlled, not passed loosely between freelancers.
            </div>
          </div>
        </div>
      </section>

      <section className="section_deliverables border-y border-black/15 bg-white py-32 text-[var(--ink)] md:py-44">
        <div className="container_large padding_global">
          <div className="proof_work_wrapper mx-auto max-w-6xl">
            <div className="proof_output_grid motion_fade_up grid gap-12 border-y border-black/20 py-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="sample_output">
                <p className="text_eyebrow mb-6 text-sm font-semibold uppercase text-[var(--subtle)]">Sample output</p>
                <h3 className="heading_section max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
                  Example output: production-ready drawing pack.
                </h3>
                <p className="text_body mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
                  A typical MIDTS drawing package includes fully dimensioned technical drawings, tolerance definitions, and revision-controlled documentation ready for manufacturing or internal use.
                </p>
                <div className="mt-8">
                  <DrawingPreview />
                </div>
                <div className="grid_drawing_details mt-6 grid gap-4 border-y border-black/20 py-5 text-xs font-semibold uppercase text-[var(--subtle)] sm:grid-cols-2 lg:grid-cols-5">
                  {drawingDetails.map((detail) => (
                    <p key={detail} className="text_detail lg:border-l lg:border-black/20 lg:first:border-l-0 lg:pl-4">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>

              <div className="delivery_pack border border-black/20 p-6 md:p-8">
                <p className="text_eyebrow mb-6 text-sm font-semibold uppercase text-[var(--subtle)]">Delivery</p>
                <h3 className="heading_section max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
                  What you actually receive.
                </h3>
                <p className="text_body mt-6 max-w-xl text-base leading-7 text-[var(--muted)]">
                  Every project is delivered as a structured, ready-to-use package, not a loose collection of files.
                </p>
                <div className="card_file_tree mt-8 border border-black/20 p-6 font-mono text-sm text-[var(--ink)]">
                  {fileTree.map((item) => (
                    <p key={`${item.level}-${item.label}`} className={`text_file py-1 ${item.indent}`}>
                      {item.level < 2 ? '+ ' : '- '}{item.label}
                    </p>
                  ))}
                </div>
                <div className="delivery_checks mt-6 border-y border-black/20 py-5">
                  {deliveryChecks.map((check) => (
                    <p key={check} className="text_check py-2 text-sm text-[var(--muted)]">
                      {check}
                    </p>
                  ))}
                </div>
                <div className="delivery_statement mt-6 bg-[var(--black)] px-6 py-5 text-sm font-semibold text-white">
                  No guesswork. No missing files. No rework loops.
                </div>
              </div>
            </div>

            <div className="proof_cta mt-16 grid gap-8 border-y border-black/20 px-6 py-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text_eyebrow mb-4 text-sm font-semibold uppercase text-[var(--subtle)]">Ready to start?</p>
                <h3 className="heading_card text-2xl font-semibold md:text-3xl">
                  Send your drawings. Get clarity. Move forward.
                </h3>
                <p className="text_body mt-3 text-sm text-[var(--muted)]">Quick response. Clear scope. Zero pressure.</p>
              </div>
              <div className="proof_cta_actions flex flex-wrap gap-4">
                <a className="button_primary motion_button inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-medium uppercase text-white transition hover:bg-black" href="#contact">
                  Start your request
                </a>
                <a className="button_secondary motion_button inline-flex min-h-12 items-center justify-center rounded-md border border-black/30 px-7 py-3 text-sm font-medium uppercase text-[var(--ink)] transition hover:border-black" href="#services">
                  View services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
