import type { ReactNode } from 'react';
import { midtsBrand } from '@/src/lib/midts-brand';

type ContentBlockProps = {
  title?: string;
  children: ReactNode;
};

export default function ContentBlock({ title, children }: ContentBlockProps) {
  return (
    <section className={midtsBrand.componentStyles.contentBlockClassName}>
      {title ? <h3 className={`mb-4 ${midtsBrand.typography.contentTitleClassName}`}>{title}</h3> : null}
      <div className={`text-[#111815] ${midtsBrand.typography.bodyClassName} ${midtsBrand.typography.bodyStackClassName}`}>
        {children}
      </div>
    </section>
  );
}
