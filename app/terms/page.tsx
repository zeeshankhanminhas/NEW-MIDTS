import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata = {
  title: 'Website Terms | MIDTS',
  description: 'Website terms for using the MIDTS website and enquiry forms.',
  alternates: {
    canonical: '/terms/',
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="section_terms bg-white py-32 text-[var(--ink)] md:py-44">
        <div className="container_large padding_global">
          <div className="terms_wrapper mx-auto max-w-3xl">
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">Website terms</p>
            <h1 className="heading_section text-4xl font-semibold leading-tight md:text-5xl">Terms for using this website.</h1>
            <p className="text_body mt-6 text-sm leading-6 text-[var(--muted)]">Last updated: 3 June 2026</p>
            <div className="terms_content mt-12 grid gap-10 border-y border-black/10 py-10">
              <section className="terms_block">
                <h2 className="heading_card text-xl font-semibold">Website use</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  This website is provided to explain MIDTS services and receive project enquiries. You agree not to misuse the website, interfere with its operation, or submit unlawful or harmful material.
                </p>
              </section>
              <section className="terms_block">
                <h2 className="heading_card text-xl font-semibold">Enquiries and quotes</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  Submitting an enquiry does not create a contract or guarantee that MIDTS can accept the work. Any quote, timeline, scope, or commercial term is subject to technical review and written confirmation.
                </p>
              </section>
              <section className="terms_block">
                <h2 className="heading_card text-xl font-semibold">Technical files</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  You are responsible for ensuring you have the right to share any drawings, CAD files, specifications, or other project materials submitted through the website or by email.
                </p>
              </section>
              <section className="terms_block">
                <h2 className="heading_card text-xl font-semibold">Confidentiality</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  MIDTS treats submitted engineering and project information as confidential. Specific NDA terms or project confidentiality requirements should be agreed in writing before detailed files are shared.
                </p>
              </section>
              <section className="terms_block">
                <h2 className="heading_card text-xl font-semibold">Website information</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  The website content is general information only. MIDTS aims to keep it accurate, but it should not be treated as technical, legal, financial, or professional advice for a specific project.
                </p>
              </section>
              <section className="terms_block">
                <h2 className="heading_card text-xl font-semibold">Liability</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  Nothing in these terms limits liability where it would be unlawful to do so. To the fullest extent permitted by law, MIDTS is not responsible for losses arising from website downtime, incomplete enquiries, or reliance on general website content.
                </p>
              </section>
              <section className="terms_block">
                <h2 className="heading_card text-xl font-semibold">Governing law</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  These website terms are governed by the laws of England and Wales.
                </p>
              </section>
              <section className="terms_block">
                <h2 className="heading_card text-xl font-semibold">Contact</h2>
                <a className="text_link mt-4 block w-fit text-base text-[var(--ink)] underline-offset-4 hover:underline" href="mailto:intake@midts.com">
                  intake@midts.com
                </a>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
