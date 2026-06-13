import { midtsBrand } from '@/src/lib/midts-brand';

const basePath = process.env.GITHUB_PAGES === 'true' ? '/NEW-MIDTS' : '';
const logoSrc = `${basePath}/midts-logo.svg`;

type MIDTSLogoProps = {
  inverse?: boolean;
};

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
