import type { Metadata } from 'next';
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

          <DocumentFooter reference={data.reference} />
        </div>
      </DocumentPage>

      <DocumentPage>
        <div className={midtsBrand.document.bodyFrameClassName}>
          <DocumentHeader documentType={data.documentType} reference={data.reference} />

          <div className={midtsBrand.document.bodyFirstSectionClassName}>
            <SectionDivider eyebrow={engagementSection.eyebrow} title={engagementSection.title} />
            <ContentBlock title={engagementSection.blockTitle}>
              <BodyParagraphs paragraphs={engagementSection.body} />
            </ContentBlock>
          </div>

          <div className={midtsBrand.document.bodyClosingClassName}>
            <ContentBlock title={data.closing.title}>
              <BodyParagraphs paragraphs={data.closing.body} />
            </ContentBlock>
          </div>

          <DocumentFooter reference={data.reference} />
        </div>
      </DocumentPage>
    </>
  );
}
