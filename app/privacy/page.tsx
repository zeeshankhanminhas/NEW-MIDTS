import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="section_privacy py-20 md:py-32">
        <div className="container_large padding_global">
          <div className="privacy_wrapper max-w-3xl">
            <h1 className="heading_hero mb-6 text-5xl font-semibold leading-tight md:text-6xl">Privacy Policy</h1>
            <p className="text_body mb-8 text-base text-neutral-400 md:text-lg">
              MIDTS uses enquiry details only to review requirements, respond to project requests, and coordinate approved work.
            </p>
            <div className="grid gap-8 text-base text-neutral-400 md:text-lg">
              <section>
                <h2 className="heading_section mb-4 text-3xl font-medium text-white md:text-4xl">Information we collect</h2>
                <p>We collect contact details, company information, project type, and requirement summaries submitted through the enquiry form.</p>
              </section>
              <section>
                <h2 className="heading_section mb-4 text-3xl font-medium text-white md:text-4xl">How we use it</h2>
                <p>We use submitted information to assess project fit, prepare quotes, clarify technical requirements, and manage delivery communication.</p>
              </section>
              <section>
                <h2 className="heading_section mb-4 text-3xl font-medium text-white md:text-4xl">Confidentiality</h2>
                <p>Technical files are not required for initial intake. NDA review is available before drawings, models, or production data are shared.</p>
              </section>
              <section>
                <h2 className="heading_section mb-4 text-3xl font-medium text-white md:text-4xl">Analytics</h2>
                <p>Analytics may be used to understand site performance and improve the enquiry flow. Analytics should be configured without collecting unnecessary personal data.</p>
              </section>
              <section>
                <h2 className="heading_section mb-4 text-3xl font-medium text-white md:text-4xl">Contact</h2>
                <p>For privacy questions, contact MIDTS through the enquiry form and include “Privacy” in the requirement summary.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
