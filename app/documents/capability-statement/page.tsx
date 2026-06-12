import type { Metadata } from 'next';
import DocumentCover from '@/src/components/documents/DocumentCover';
import DocumentPage from '@/src/components/documents/DocumentPage';

export const metadata: Metadata = {
  title: 'Capability Statement Cover | MIDTS',
  description: 'MIDTS document cover foundation preview.',
};

export default function CapabilityStatementPage() {
  return (
    <DocumentPage>
      <DocumentCover
        documentType="capabilityStatement"
        title={'Capability\nStatement'}
        messageTitle="Engineering Capacity On Demand"
        message="Overflow CAD/CAM support for teams that can’t slow down."
        metadata={[
          { label: 'Version', value: '1.0' },
          { label: 'Date', value: 'June 2026' },
          { label: 'Reference', value: 'MIDTS-CS-2026' },
        ]}
      />
    </DocumentPage>
  );
}
