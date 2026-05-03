const steps = ['Share your requirement', 'We assess and quote', 'Work begins', 'Delivery on time'];

export default function Process() {
  return (
    <section className="section_process py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="process_wrapper max-w-3xl">
          <h2 className="heading_section mb-8 text-3xl font-medium md:text-4xl">Simple, direct process</h2>
          <ol className="grid_process grid gap-4">
            {steps.map((step, index) => (
              <li key={step} className="card_step rounded-lg border border-neutral-800 p-5 text-base text-neutral-300 md:text-lg">
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
