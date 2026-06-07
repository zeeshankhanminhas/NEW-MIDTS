'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Why MIDTS', href: '/#why-midts' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

const logoSrc = 'data:image/png;base64,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';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 8);
    }

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  function closeMenu() {
    setIsOpen(false);
  }

  const headerStateClass = isScrolled
    ? 'border-white/15 bg-[#050705]/95 shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
    : 'border-white/10 bg-[#050705]/90 shadow-none';

  return (
    <header
      className={`section_header sticky top-0 z-50 border-b py-3 text-white backdrop-blur transition-[border-color,box-shadow,background-color] duration-300 md:py-4 ${headerStateClass}`}
    >
      <div className="container_large padding_global">
        <div className="header_wrapper flex items-center justify-between gap-6">
          <Link className="brand_link flex items-center" href="/" aria-label="MIDTS home" onClick={closeMenu}>
            <img
              src={logoSrc}
              alt="MIDTS Engineering Overflow Capacity Partner"
              className="h-8 w-auto object-contain md:h-10"
            />
          </Link>
          <nav className="nav_primary hidden items-center gap-5 text-sm text-white md:flex md:gap-7" aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} className="text_link transition hover:text-white" href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            className="button_primary motion_button hidden min-h-10 items-center justify-center rounded-md bg-white px-5 py-2 text-xs font-medium uppercase text-black transition hover:bg-white md:inline-flex"
            href="/#contact"
          >
            Submit Requirement
          </Link>
          <button
            className="button_menu motion_button inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/40 text-white md:hidden"
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
          <nav className="nav_mobile mt-3 grid border-t border-white/40 pt-3 text-sm text-white md:hidden" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.href} className="text_link border-b border-white/30 py-2.5 transition last:border-b-0 hover:text-white" href={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
            <Link className="text_link py-2.5 font-semibold uppercase" href="/#contact" onClick={closeMenu}>
              Submit Requirement
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
