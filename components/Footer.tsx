import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="section_footer py-20">
      <div className="container_large padding_global">
        <div className="footer_wrapper flex flex-col gap-4 border-t border-neutral-800 pt-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>MIDTS — Overflow CAD/CAM engineering support.</p>
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
