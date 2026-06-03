import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata = {
  title: 'Cookie Policy | MIDTS',
  description: 'MIDTS cookie policy for the website and enquiry forms.',
  alternates: {
    canonical: '/cookie-policy/',
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="section_cookie_policy bg-white py-32 text-[var(--ink)] md:py-44">
        <div className="container_large padding_global">
          <div className="cookie_policy_wrapper mx-auto max-w-3xl">
            <p className="text_eyebrow mb-8 text-sm font-semibold uppercase text-neutral-500">Cookie policy</p>
            <h1 className="heading_section text-4xl font-semibold leading-tight md:text-5xl">How MIDTS uses cookies.</h1>
            <p className="text_body mt-6 text-sm leading-6 text-[var(--muted)]">Last updated: 3 June 2026</p>
            <div className="cookie_policy_content mt-12 grid gap-10 border-y border-black/10 py-10">
              <section className="cookie_policy_block">
                <h2 className="heading_card text-xl font-semibold">Current cookie use</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  MIDTS does not currently use analytics, advertising, retargeting, or social media tracking cookies on this website.
                </p>
              </section>
              <section className="cookie_policy_block">
                <h2 className="heading_card text-xl font-semibold">Essential storage</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  The website may use strictly necessary browser storage or cookies only where needed to operate the site, submit forms, protect services, or remember choices required for a requested function.
                </p>
              </section>
              <section className="cookie_policy_block">
                <h2 className="heading_card text-xl font-semibold">Analytics and tracking</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  If analytics, advertising, or other non-essential tracking is added in future, MIDTS will update this policy and request consent before setting those technologies where required.
                </p>
              </section>
              <section className="cookie_policy_block">
                <h2 className="heading_card text-xl font-semibold">Managing cookies</h2>
                <p className="text_body mt-4 text-base leading-7 text-[var(--muted)]">
                  You can block or delete cookies in your browser settings. Essential site functions may not work as expected if browser storage is disabled.
                </p>
              </section>
              <section className="cookie_policy_block">
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
