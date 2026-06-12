import { midtsBrand } from '@/src/lib/midts-brand';

type MIDTSLogoProps = {
  inverse?: boolean;
};

const logoSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/midts-logo.svg`;

export default function MIDTSLogo({ inverse = false }: MIDTSLogoProps) {
  return (
    <div>
      <img
        src={logoSrc}
        alt={midtsBrand.company.name}
        className={inverse ? midtsBrand.componentStyles.logoImageInverseClassName : midtsBrand.componentStyles.logoImageClassName}
      />
      <p className={`${midtsBrand.componentStyles.logoDescriptorClassName} ${midtsBrand.typography.coverDescriptorClassName}`}>
        {midtsBrand.company.coverDescriptor}
      </p>
    </div>
  );
}
