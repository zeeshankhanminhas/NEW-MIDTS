export default function Footer() {
  return (
    <footer className="bg-[#050705] py-10 text-white">
      <div className="container_large padding_global">
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>MIDTS | Overflow CAD/CAM engineering support.</p>
          <a className="transition hover:text-white" href="mailto:hello@midts.co.uk">
            hello@midts.co.uk
          </a>
        </div>
      </div>
    </footer>
  );
}
