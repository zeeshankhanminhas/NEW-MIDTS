import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="section_privacy bg-white py-32 text-[var(--ink)] md:py-44">
        <div className="container_large padding_global">
          <div className="privacy_wrapper mx-auto max-w-3xl">
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">Privacy policy</p>
            <h1 className="heading_section text-4xl font-semibold leading-tight md:text-5xl">How MIDTS handles enquiry data.</h1>
            <div className="privacy_content mt-12 grid gap-10 border-y border-black/10 py-10">
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">What we collect</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  We collect the information you submit through the initial request form, including name, work email, company, project type, timeline, file readiness, complexity, and brief requirement notes.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">How we use it</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  We use enquiry information to understand the request, send the technical brief, assess scope, and respond about timing and quotation after review.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">Confidential project data</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  Engineering files and project details are treated as confidential. NDA handling can be agreed before detailed technical files are shared.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">Contact</h2>
                <div className="text_body mt-4 grid gap-2 text-base leading-7 text-[var(--muted)]">
                  <a className="text_link w-fit text-[var(--ink)] underline-offset-4 hover:underline" href="mailto:intake@midts.com">
                    intake@midts.com
                  </a>
                  <a className="text_link w-fit text-[var(--ink)] underline-offset-4 hover:underline" href="tel:+441223656090">
                    01223 656 090
                  </a>
                  <p>1010 Cambourne Business Center, Cambridge CB23 6DP</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
