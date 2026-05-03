const links = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  return (
    <header className="section_header sticky top-0 z-50 border-b border-white/10 bg-[#050705]/90 py-4 text-white backdrop-blur">
      <div className="container_large padding_global">
        <div className="header_wrapper flex items-center justify-between gap-6">
          <a className="brand_link text-lg font-semibold" href="#top" aria-label="MIDTS home">
            MIDTS
          </a>
          <nav className="nav_primary flex items-center gap-5 text-sm text-neutral-300 md:gap-7" aria-label="Primary navigation">
            {links.map((link) => (
              <a key={link.href} className="text_link transition hover:text-white" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
