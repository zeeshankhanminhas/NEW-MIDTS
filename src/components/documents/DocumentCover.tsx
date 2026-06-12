import MIDTSLogo from '@/src/components/brand/MIDTSLogo';
import { midtsBrand, type MidtsDocumentType } from '@/src/lib/midts-brand';
import DocumentFooter from './DocumentFooter';
import MetadataGrid from './MetadataGrid';

type CoverMetadataItem = {
  label: string;
  value: string;
};

type DocumentCoverProps = {
  documentType: MidtsDocumentType;
  title: string;
  messageTitle: string;
  message: string;
  metadata: CoverMetadataItem[];
};

export default function DocumentCover({ title, messageTitle, message, metadata }: DocumentCoverProps) {
  return (
    <div className={`flex min-h-[297mm] flex-1 flex-col ${midtsBrand.document.coverPageClassName}`}>
      <header>
        <MIDTSLogo inverse />
      </header>

      <section className="mt-[42mm]">
        <h1 className={`max-w-[150mm] whitespace-pre-line text-white ${midtsBrand.typography.coverTitleClassName}`}>
          {title}
        </h1>
        <div className={midtsBrand.componentStyles.coverDividerClassName} />
        <div className={midtsBrand.componentStyles.coverBodyClassName}>
          <p className={`text-white ${midtsBrand.typography.coverMessageClassName}`}>{messageTitle}</p>
          <p className={midtsBrand.componentStyles.coverMessageTextClassName}>{message}</p>
        </div>
      </section>

      <MetadataGrid items={metadata} variant="cover" />

      <DocumentFooter variant="cover" />
    </div>
  );
}
