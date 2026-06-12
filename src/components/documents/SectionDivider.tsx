import { midtsBrand } from '@/src/lib/midts-brand';

type SectionDividerProps = {
  eyebrow?: string;
  title: string;
};

export default function SectionDivider({ eyebrow, title }: SectionDividerProps) {
  return (
    <div className={midtsBrand.componentStyles.sectionDividerClassName}>
      {eyebrow ? (
        <p className={`${midtsBrand.typography.smallUppercaseClassName} ${midtsBrand.componentStyles.sectionEyebrowClassName}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-3 text-[#050705] ${midtsBrand.typography.sectionTitleClassName}`}>{title}</h2>
    </div>
  );
}
