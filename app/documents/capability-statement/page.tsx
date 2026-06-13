import type { Metadata } from 'next';
import MIDTSLogo from '@/src/components/brand/MIDTSLogo';
import DocumentCover from '@/src/components/documents/DocumentCover';
import DocumentFooter from '@/src/components/documents/DocumentFooter';
import DocumentHeader from '@/src/components/documents/DocumentHeader';
import DocumentPage from '@/src/components/documents/DocumentPage';
import { midtsBrand } from '@/src/lib/midts-brand';
import { capabilityStatementData } from '@/src/lib/documents/capability-statement-data';

export const metadata: Metadata = {
  title: 'Capability Statement | MIDTS',
  description: 'MIDTS capability statement for overflow CAD/CAM engineering support.',
};

function splitLine(line: string) {
  const [label, detail] = line.split(' — ');
  return { label, detail };
}

function ServiceItem({ line, index }: { line: string; index: number }) {
  const { label, detail } = splitLine(line);

  return (
    <div className="group relative min-h-[29mm] border-t border-[#d8d8d2] pt-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-[9px] font-semibold leading-none text-[#b4975a]">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <p className="text-[10px] font-semibold uppercase leading-none tracking-normal text-[#050705]">{label}</p>
          <p className="mt-2 max-w-[55mm] text-[11px] leading-[1.45] text-[#4b5651]">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ line, index }: { line: string; index: number }) {
  const { label } = splitLine(line);

  return (
    <div className="relative border-t border-[#050705] pt-3">
      <p className="text-[9px] font-semibold text-[#b4975a]">{String(index + 1).padStart(2, '0')}</p>
      <p className="mt-2 text-[9px] font-semibold uppercase leading-[1.25] tracking-normal text-[#050705]">{label}</p>
    </div>
  );
}

export default function CapabilityStatementPage() {
  const data = capabilityStatementData;
  const [capacitySection, servicesSection, engagementSection] = data.sections;
  const [structured, responsive, controlled, closingStatement] = data.closing.body;

  return (
    <>
      <DocumentPage>
        <DocumentCover
          documentType={data.documentType}
          title={data.cover.title}
          messageTitle={data.cover.messageTitle}
          message={data.cover.message}
          metadata={data.cover.metadata}
        />
      </DocumentPage>

      <DocumentPage>
        <div className="flex flex-1 flex-col px-[20mm] py-[18mm]">
          <DocumentHeader documentType={data.documentType} reference={data.reference} />

          <main className="mt-10 grid grid-cols-[34mm_1fr] gap-x-12">
            <aside className="pt-1">
              <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>Capability</p>
              <div className="mt-5 h-[1px] w-14 bg-[#050705]" />
              <p className="mt-5 text-[9px] font-semibold uppercase leading-4 tracking-normal text-[#4b5651]">
                Overflow<br />Engineering<br />Partner
              </p>
            </aside>

            <section>
              <h1 className="max-w-[116mm] text-[45px] font-semibold leading-[0.98] tracking-[-0.02em] text-[#050705]">
                {capacitySection.title}
              </h1>
              <p className="mt-7 max-w-[112mm] border-l-2 border-[#b4975a] pl-6 text-[16px] leading-7 text-[#111815]">
                {capacitySection.body[0]}
              </p>
            </section>
          </main>

          <section className="mt-12 grid grid-cols-[34mm_1fr] gap-x-12">
            <div>
              <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>{servicesSection.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-5">
              {servicesSection.body.map((line, index) => (
                <ServiceItem key={line} line={line} index={index} />
              ))}
            </div>
          </section>

          <section className="mt-11 grid grid-cols-[34mm_1fr] gap-x-12">
            <div>
              <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>{engagementSection.title}</p>
            </div>
            <div className="grid grid-cols-6 gap-x-5">
              {engagementSection.body.map((line, index) => (
                <ProcessStep key={line} line={line} index={index} />
              ))}
            </div>
          </section>

          <DocumentFooter reference={data.reference} />
        </div>
      </DocumentPage>

      <DocumentPage>
        <div className={`flex min-h-[297mm] flex-1 flex-col ${midtsBrand.document.coverPageClassName}`}>
          <header>
            <MIDTSLogo inverse />
          </header>

          <main className="mt-[52mm] max-w-[142mm]">
            <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>Why MIDTS</p>
            <h2 className="mt-8 text-[58px] font-semibold leading-[0.98] tracking-normal text-white">
              {structured}<br />
              {responsive}<br />
              {controlled}
            </h2>
            <div className={midtsBrand.componentStyles.coverDividerClassName} />
            <p className="mt-10 max-w-[118mm] text-xl leading-9 text-white/82">{closingStatement}</p>
          </main>

          <footer className="mt-auto border-t border-white/18 pt-6">
            <p className="text-2xl font-semibold leading-none text-white">MIDTS</p>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-normal text-[#b4975a]">
              Overflow Engineering Partner
            </p>
            <p className="mt-2 text-sm font-semibold text-white/70">midts.com</p>
          </footer>
        </div>
      </DocumentPage>
    </>
  );
}
