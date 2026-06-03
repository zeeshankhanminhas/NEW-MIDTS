import Link from 'next/link';

const contactDetails = [
  { label: 'Email', href: 'mailto:intake@midts.com', text: 'intake@midts.com' },
  { label: 'Phone', href: 'tel:+441223656090', text: '012223 656 090' },
  { label: 'Address', href: null, text: '1010 Cambourne Business Center, Cambridge CB23 6DP' },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/midts/',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:intake@midts.com',
    icon: 'email',
  },
];

function SocialIcon({ type }: { type: string }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {type === 'linkedin' ? (
        <>
          <path d="M7.2 9.2V18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M11 18v-5.1c0-2.2 1.3-3.7 3.3-3.7 2.1 0 3.2 1.4 3.2 3.7V18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 9.5V18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="7.2" cy="6.2" r="1.2" fill="currentColor" />
          <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        </>
      ) : null}
      {type === 'email' ? (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 8l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="section_footer bg-[#050705] py-20 text-white">
      <div className="container_large padding_global">
        <div className="footer_wrapper flex flex-col gap-8 border-t border-white/10 pt-8 text-sm text-neutral-400 md:flex-row md:items-start md:justify-between">
          <div className="footer_content grid gap-5">
            <p className="text_body text-white">MIDTS | Overflow CAD/CAM engineering support.</p>
            <div className="footer_contact grid gap-2">
              {contactDetails.map((item) =>
                item.href ? (
                  <a key={item.label} className="text_link w-fit transition hover:text-white" href={item.href}>
                    {item.text}
                  </a>
                ) : (
                  <p key={item.label} className="text_body max-w-sm">
                    {item.text}
                  </p>
                ),
              )}
            </div>
            <div className="grid gap-2">
              <Link className="text_link w-fit transition hover:text-white" href="/privacy/">
                Privacy Policy
              </Link>
              <Link className="text_link w-fit transition hover:text-white" href="/cookie-policy/">
                Cookie Policy
              </Link>
              <Link className="text_link w-fit transition hover:text-white" href="/terms/">
                Terms
              </Link>
            </div>
          </div>
          <div className="social_links flex items-center gap-3" aria-label="Social and contact links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className="social_link inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-neutral-400 transition hover:border-white/30 hover:text-white"
                href={link.href}
                aria-label={link.label}
                target={link.icon === 'linkedin' ? '_blank' : undefined}
                rel={link.icon === 'linkedin' ? 'noreferrer' : undefined}
              >
                <SocialIcon type={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
