import type { Metadata } from 'next';
import MIDTSLogo from '@/src/components/brand/MIDTSLogo';
import ContentBlock from '@/src/components/documents/ContentBlock';
import DocumentCover from '@/src/components/documents/DocumentCover';
import DocumentFooter from '@/src/components/documents/DocumentFooter';
import DocumentHeader from '@/src/components/documents/DocumentHeader';
import DocumentPage from '@/src/components/documents/DocumentPage';
import SectionDivider from '@/src/components/documents/SectionDivider';
import { midtsBrand } from '@/src/lib/midts-brand';
import { capabilityStatementData } from '@/src/lib/documents/capability-statement-data';

export const metadata: Metadata = {
  title: 'Capability Statement | MIDTS',
  description: 'MIDTS capability statement for overflow CAD/CAM engineering support.',
};

function BodyParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
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
        <div className={midtsBrand.document.bodyFrameClassName}>
          <DocumentHeader documentType={data.documentType} reference={data.reference} />

          <div className={midtsBrand.document.bodyFirstSectionClassName}>
            <SectionDivider eyebrow={capacitySection.eyebrow} title={capacitySection.title} />
            <ContentBlock title={capacitySection.blockTitle}>
              <BodyParagraphs paragraphs={capacitySection.body} />
            </ContentBlock>
          </div>

          <div className={midtsBrand.document.bodySectionClassName}>
            <SectionDivider eyebrow={servicesSection.eyebrow} title={servicesSection.title} />
            <ContentBlock title={servicesSection.blockTitle}>
              <BodyParagraphs paragraphs={servicesSection.body} />
            </ContentBlock>
          </div>

          <div className={midtsBrand.document.bodySectionClassName}>
            <SectionDivider eyebrow={engagementSection.eyebrow} title={engagementSection.title} />
            <ContentBlock title={engagementSection.blockTitle}>
              <BodyParagraphs paragraphs={engagementSection.body} />
            </ContentBlock>
          </div>

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
