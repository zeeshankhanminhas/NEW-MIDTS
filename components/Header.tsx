'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Why MIDTS', href: '/#why-midts' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="section_header sticky top-0 z-50 border-b border-white/10 bg-[#050705]/90 py-4 text-white backdrop-blur">
      <div className="container_large padding_global">
        <div className="header_wrapper flex items-center justify-between gap-6">
          <Link className="brand_link text-lg font-semibold" href="/" aria-label="MIDTS home" onClick={closeMenu}>
            MIDTS
          </Link>
          <nav className="nav_primary hidden items-center gap-5 text-sm text-neutral-300 md:flex md:gap-7" aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} className="text_link transition hover:text-white" href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="button_menu inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-neutral-200 md:hidden"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="grid gap-1.5" aria-hidden="true">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </button>
        </div>
        {isOpen ? (
          <nav className="nav_mobile mt-4 grid border-t border-white/10 pt-4 text-sm text-neutral-300 md:hidden" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.href} className="text_link border-b border-white/10 py-3 transition last:border-b-0 hover:text-white" href={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
