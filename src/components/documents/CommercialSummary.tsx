import { midtsBrand } from '@/src/lib/midts-brand';

type CommercialSummaryProps = {
  items: Array<{
    label: string;
    value: string;
  }>;
};

export default function CommercialSummary({ items }: CommercialSummaryProps) {
  return (
    <section className={midtsBrand.componentStyles.commercialSummaryClassName}>
      <dl className="grid sm:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`${midtsBrand.componentStyles.commercialSummaryItemClassName} ${
              index % 2 === 0 ? `${midtsBrand.metadataStyles.itemBorderClassName} sm:pl-0` : ''
            }`}
          >
            <dt className={midtsBrand.metadataStyles.labelClassName}>{item.label}</dt>
            <dd className={midtsBrand.componentStyles.commercialSummaryValueClassName}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
