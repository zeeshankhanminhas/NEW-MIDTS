import MIDTSLogo from '@/src/components/brand/MIDTSLogo';
import { midtsBrand, type MidtsDocumentType } from '@/src/lib/midts-brand';

type DocumentHeaderProps = {
  documentType: MidtsDocumentType;
  reference: string;
};

export default function DocumentHeader({ documentType, reference }: DocumentHeaderProps) {
  return (
    <header className={midtsBrand.document.headerClassName}>
      <div>
        <MIDTSLogo />
        <p className={midtsBrand.document.headerDocumentTypeClassName}>{midtsBrand.documentTypeLabels[documentType]}</p>
      </div>
      <p className={midtsBrand.document.headerReferenceClassName}>{reference}</p>
    </header>
  );
}
