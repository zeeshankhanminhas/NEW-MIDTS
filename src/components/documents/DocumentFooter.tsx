import { midtsBrand } from '@/src/lib/midts-brand';

type DocumentFooterProps = {
  reference?: string;
  variant?: 'default' | 'cover';
};

export default function DocumentFooter({ reference, variant = 'default' }: DocumentFooterProps) {
  if (variant === 'cover') {
    return (
      <footer className={midtsBrand.document.coverFooterClassName}>
        <p>{midtsBrand.company.website}</p>
        <p>{midtsBrand.company.confidentialityLabel}</p>
      </footer>
    );
  }

  return (
    <footer className={midtsBrand.document.footerClassName}>
      <p>{reference}</p>
      <p>{midtsBrand.company.website}</p>
      <p>{midtsBrand.company.confidentialityLabel}</p>
    </footer>
  );
}
