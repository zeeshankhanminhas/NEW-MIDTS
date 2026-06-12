import { midtsBrand, type MidtsDocumentStatus } from '@/src/lib/midts-brand';

type StatusBadgeProps = {
  status: MidtsDocumentStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-normal ${midtsBrand.statusStyles[status]}`}
    >
      {midtsBrand.statusLabels[status]}
    </span>
  );
}
