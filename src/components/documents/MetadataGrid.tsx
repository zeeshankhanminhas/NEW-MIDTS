import type { ReactNode } from 'react';
import { midtsBrand } from '@/src/lib/midts-brand';

type MetadataItem = {
  label: string;
  value: ReactNode;
};

type MetadataGridProps = {
  items: MetadataItem[];
  variant?: 'default' | 'cover';
};

export default function MetadataGrid({ items, variant = 'default' }: MetadataGridProps) {
  const isCover = variant === 'cover';

  return (
    <div className={isCover ? midtsBrand.metadataStyles.coverWrapperClassName : undefined}>
      <dl className={isCover ? midtsBrand.metadataStyles.coverGridClassName : midtsBrand.metadataStyles.gridClassName}>
        {items.map((item, index) => (
          <div
            key={item.label}
            className={
              isCover
                ? ''
                : `${midtsBrand.metadataStyles.itemClassName} ${
                    index % 2 === 0 ? midtsBrand.metadataStyles.itemBorderClassName : ''
                  }`
            }
          >
            <dt className={isCover ? midtsBrand.metadataStyles.inverseLabelClassName : midtsBrand.metadataStyles.labelClassName}>
              {item.label}
            </dt>
            <dd className={`mt-2 ${isCover ? midtsBrand.metadataStyles.inverseValueClassName : midtsBrand.metadataStyles.valueClassName}`}>
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
