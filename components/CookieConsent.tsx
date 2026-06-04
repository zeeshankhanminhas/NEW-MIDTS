'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'midts_cookie_consent';
type ConsentChoice = 'accepted' | 'rejected';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const storedChoice = window.localStorage.getItem(CONSENT_KEY);
      setIsVisible(storedChoice !== 'accepted' && storedChoice !== 'rejected');
    } catch {
      setIsVisible(true);
    }
  }, []);

  function saveChoice(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } finally {
      setIsVisible(false);
    }
  }

  if (!isVisible) return null;

  return (
    <section
      className="cookie_banner fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f7f7f5] px-5 py-5 text-[var(--ink)] shadow-[0_-12px_40px_rgba(0,0,0,0.08)] sm:px-6 md:px-10"
      aria-label="Cookie consent"
    >
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-2">
          <p className="text-sm font-semibold uppercase text-[var(--ink)]">Cookie preferences</p>
          <p className="max-w-3xl text-sm leading-6 text-[var(--muted)]">
            MIDTS uses essential browser storage for the site to work. Optional analytics cookies are not loaded unless you consent. Read the{' '}
            <Link className="font-medium text-[var(--ink)] underline underline-offset-4" href="/privacy/">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link className="font-medium text-[var(--ink)] underline underline-offset-4" href="/cookie-policy/">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:min-w-[22rem]">
          <button
            className="motion_button min-h-11 rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-medium uppercase text-white transition hover:bg-black"
            type="button"
            onClick={() => saveChoice('accepted')}
          >
            Accept Analytics
          </button>
          <button
            className="motion_button min-h-11 rounded-md border border-black/20 px-5 py-3 text-sm font-medium uppercase text-[var(--ink)] transition hover:border-black"
            type="button"
            onClick={() => saveChoice('rejected')}
          >
            Reject Non-Essential
          </button>
        </div>
      </div>
    </section>
  );
}
