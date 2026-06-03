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
            <p className="text_body mt-6 text-sm leading-6 text-[var(--muted)]">Last updated: 3 June 2026</p>
            <div className="privacy_content mt-12 grid gap-10 border-y border-black/10 py-10">
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">Who we are</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  MIDTS provides CAD/CAM overflow engineering support, reverse engineering support, production drawings, and related technical project services.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">What we collect</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  We collect the information you submit through the website, including name, work email, company, project type, timeline, file readiness, complexity, brief requirement notes, quote responses, and technical files or drawings you choose to provide.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">How we use it</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  We use enquiry and project information to understand your request, send and process technical intake forms, assess scope, prepare quotes, communicate about timing, and manage accepted work.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">Lawful basis</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  We process enquiry and project information where it is necessary to respond before entering into a contract, to perform agreed services, to meet legal obligations, and for legitimate business interests such as managing enquiries, records, and project communications.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">Service providers and project partners</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  Website form submissions may be processed through automation, email, spreadsheet, document storage, and file handling services used by MIDTS. Where a project requires external engineering or vendor support, relevant project information may be shared only as needed to assess or deliver the work.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">Confidential project data</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  Engineering files and project details are treated as confidential. NDA handling can be agreed before detailed technical files are shared.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">How long we keep data</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  We keep enquiry and project records only for as long as needed to respond, manage the project relationship, maintain business records, resolve queries, and meet legal or accounting requirements.
                </p>
              </section>
              <section className="privacy_block">
                <h2 className="heading_card text-xl font-semibold">Your rights</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  Under UK data protection law, you may have rights to access, correct, delete, restrict, or object to the use of your personal data, and to complain to the Information Commissioner&apos;s Office.
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
                  <a className="text_link w-fit text-[var(--ink)] underline-offset-4 hover:underline" href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">
                    ICO complaint guidance
                  </a>
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
