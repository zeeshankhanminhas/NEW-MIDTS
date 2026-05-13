'use client';

import { useState } from 'react';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#fit', label: 'Fit' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="section_header sticky top-0 z-50 border-b border-neutral-900 bg-black/90 backdrop-blur">
      <div className="container_large padding_global">
        <div className="header_wrapper flex items-center justify-between py-4">
          <a href="#top" className="text-sm font-semibold tracking-[0.3em] text-white" onClick={closeMenu}>
            MIDTS
          </a>

          <button
            type="button"
            className="button_menu rounded-md border border-neutral-800 px-3 py-2 text-sm text-neutral-300 md:hidden"
            aria-expanded={isOpen}
            aria-controls="site-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            Menu
          </button>

          <nav id="site-navigation" className="hidden items-center gap-6 text-sm text-neutral-400 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
            <a href="#enquiry" className="button_primary rounded-md border border-white px-4 py-2 text-xs font-medium uppercase tracking-wide text-white">
              Start Your Project
            </a>
          </nav>
        </div>

        {isOpen ? (
          <nav className="header_mobile_wrapper grid gap-3 border-t border-neutral-900 py-4 text-sm text-neutral-300 md:hidden">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="py-2" onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <a href="#enquiry" className="button_primary rounded-md border border-white px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-white" onClick={closeMenu}>
              Start Your Project
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
