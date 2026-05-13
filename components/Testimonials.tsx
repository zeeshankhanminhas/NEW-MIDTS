const testimonials: Array<{ quote: string; name: string; role: string }> = [];

export default function Testimonials() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section_testimonials bg-white py-32 text-[var(--ink)] md:py-44">
      <div className="container_large padding_global">
        <div className="testimonials_wrapper mx-auto max-w-4xl">
          <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">Client feedback</p>
          <div className="grid_testimonials grid gap-6">
            {testimonials.map((item) => (
              <article key={`${item.name}-${item.role}`} className="card_testimonial border-y border-black/10 py-8">
                <p className="text_body text-xl leading-8 text-[var(--muted)]">{item.quote}</p>
                <p className="text_label mt-6 text-sm font-medium uppercase text-[var(--subtle)]">
                  {item.name} | {item.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
