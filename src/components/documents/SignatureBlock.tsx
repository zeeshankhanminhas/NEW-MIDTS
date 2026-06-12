import { midtsBrand } from '@/src/lib/midts-brand';

type SignatureBlockProps = {
  parties: string[];
};

export default function SignatureBlock({ parties }: SignatureBlockProps) {
  return (
    <section className={midtsBrand.componentStyles.signatureBlockClassName}>
      {parties.map((party) => (
        <div key={party}>
          <div className={midtsBrand.componentStyles.signatureLineClassName} />
          <p className={midtsBrand.componentStyles.signaturePartyClassName}>{party}</p>
          <p className={`${midtsBrand.componentStyles.signatureMetaClassName} ${midtsBrand.typography.smallUppercaseClassName}`}>
            Signature / confirmation
          </p>
        </div>
      ))}
    </section>
  );
}
