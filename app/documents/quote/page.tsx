import type { Metadata } from 'next';
import MIDTSLogo from '@/src/components/brand/MIDTSLogo';
import DocumentFooter from '@/src/components/documents/DocumentFooter';
import DocumentHeader from '@/src/components/documents/DocumentHeader';
import DocumentPage from '@/src/components/documents/DocumentPage';
import MetadataGrid from '@/src/components/documents/MetadataGrid';
import StatusBadge from '@/src/components/documents/StatusBadge';
import { quoteData } from '@/src/lib/documents/quote-data';
import { midtsBrand } from '@/src/lib/midts-brand';

export const metadata: Metadata = {
  title: 'Quote | MIDTS',
  description: 'Controlled MIDTS quote document.',
};

const coverMetadata = [
  { label: 'Prepared For', value: quoteData.preparedFor },
  { label: 'Reference', value: quoteData.reference },
  { label: 'Date Issued', value: quoteData.dateIssued },
  { label: 'Revision', value: quoteData.revision },
  { label: 'Validity', value: quoteData.validity },
  { label: 'Prepared By', value: quoteData.preparedBy },
];

const controlMetadata = [
  { label: 'Prepared For', value: quoteData.preparedFor },
  { label: 'Prepared By', value: quoteData.preparedBy },
  { label: 'Project Reference', value: quoteData.projectReference },
  { label: 'Document Status', value: <StatusBadge status={quoteData.status} /> },
];

const commercialItems = [
  { label: 'Currency', value: quoteData.currency },
  { label: 'Subtotal', value: quoteData.totals.subtotal },
  { label: 'VAT', value: quoteData.totals.vat },
  { label: 'Quote Total', value: quoteData.totals.total },
];

function IndexedList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item} className="grid grid-cols-[8mm_1fr] gap-3 border-t border-white/18 pt-3">
          <p className="text-[9px] font-semibold text-[#b4975a]">{String(index + 1).padStart(2, '0')}</p>
          <p className="text-[11px] leading-5 text-white/76">{item}</p>
        </div>
      ))}
    </div>
  );
}

function ConditionGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="grid grid-cols-[25mm_1fr] gap-5">
      <h3 className="border-t border-white/18 pt-3 text-[10px] font-semibold uppercase tracking-normal text-[#b4975a]">
        {title}
      </h3>
      <IndexedList items={items} />
    </section>
  );
}

export default function QuotePage() {
  return (
    <>
      <DocumentPage>
        <div className={`flex min-h-[297mm] flex-1 flex-col ${midtsBrand.document.coverPageClassName}`}>
          <header className="flex items-start justify-between">
            <MIDTSLogo inverse />
            <p className="text-right text-[10px] font-semibold uppercase leading-5 tracking-normal text-white/62">
              {quoteData.reference}
              <br />
              Rev {quoteData.revision}
            </p>
          </header>

          <main className="mt-[42mm]">
            <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>
              Controlled Commercial Document
            </p>
            <h1 className={`mt-8 max-w-[142mm] text-white ${midtsBrand.typography.coverTitleClassName}`}>
              Quote
            </h1>
            <div className={midtsBrand.componentStyles.coverDividerClassName} />
            <p className="mt-8 max-w-[114mm] text-3xl font-semibold leading-tight text-white">
              Commercial scope and controlled pricing for engineering support.
            </p>
            <p className={midtsBrand.componentStyles.coverMessageTextClassName}>{quoteData.scopeSummary}</p>
          </main>

          <MetadataGrid items={coverMetadata} variant="cover" />

          <DocumentFooter variant="cover" />
        </div>
      </DocumentPage>

      <DocumentPage>
        <div className="flex flex-1 flex-col px-[20mm] py-[18mm]">
          <DocumentHeader documentType={quoteData.documentType} reference={quoteData.reference} />

          <main className="mt-8 grid grid-cols-[30mm_1fr] gap-x-10">
            <aside className="pt-1">
              <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>Quote Control</p>
              <div className="mt-4 h-[1px] w-12 bg-[#050705]" />
              <p className="mt-4 text-[9px] font-semibold uppercase leading-4 tracking-normal text-[#4b5651]">
                Scope
                <br />
                Commercial
                <br />
                Basis
              </p>
            </aside>

            <section>
              <h2 className="max-w-[108mm] text-[38px] font-semibold leading-[0.98] tracking-normal text-[#050705]">
                Quoted Works
              </h2>
              <p className="mt-5 max-w-[108mm] border-l-2 border-[#b4975a] pl-5 text-[14px] leading-6 text-[#111815]">
                {quoteData.scopeSummary}
              </p>
            </section>
          </main>

          <div className="mt-8">
            <MetadataGrid items={controlMetadata} />
          </div>

          <section className="mt-8">
            <div className="grid grid-cols-[30mm_1fr] gap-x-10">
              <div>
                <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>Commercial Lines</p>
              </div>

              <div className="border-y border-[#050705]">
                {quoteData.lineItems.map((lineItem) => (
                  <div key={lineItem.item} className="grid grid-cols-[10mm_1fr_22mm_25mm] border-b border-[#d8d8d2] py-3.5 last:border-b-0">
                    <p className="text-[9px] font-semibold text-[#b4975a]">{lineItem.item}</p>
                    <div className="pr-6">
                      <p className="text-[12px] font-semibold leading-5 text-[#050705]">{lineItem.description}</p>
                      <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-normal text-[#4b5651]">
                        Qty {lineItem.quantity} / Rate {lineItem.rate}
                      </p>
                    </div>
                    <p className="text-right text-[9px] font-semibold uppercase text-[#4b5651]">Total</p>
                    <p className="text-right text-[15px] font-semibold leading-none text-[#050705]">{lineItem.total}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 ml-[40mm] border-y border-[#050705]">
              <dl className="grid grid-cols-4">
                {commercialItems.map((item, index) => (
                  <div key={item.label} className={`py-4 ${index > 0 ? 'border-l border-[#d8d8d2] pl-4' : ''}`}>
                    <dt className={midtsBrand.metadataStyles.labelClassName}>{item.label}</dt>
                    <dd className="mt-2 text-[15px] font-semibold leading-5 text-[#050705]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <DocumentFooter reference={`${quoteData.reference} / Rev ${quoteData.revision}`} />
        </div>
      </DocumentPage>

      <DocumentPage>
        <div className={`flex min-h-[297mm] flex-1 flex-col ${midtsBrand.document.coverPageClassName}`}>
          <header className="flex items-start justify-between">
            <MIDTSLogo inverse />
            <p className="text-right text-[10px] font-semibold uppercase leading-5 tracking-normal text-white/62">
              Approval Basis
              <br />
              {quoteData.reference}
            </p>
          </header>

          <main className="mt-[30mm] grid grid-cols-[58mm_1fr] gap-12">
            <section>
              <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>Commercial Conditions</p>
              <h2 className="mt-7 max-w-[58mm] text-[43px] font-semibold leading-[0.98] tracking-normal text-white">
                Approval
                <br />
                Basis.
              </h2>
              <div className={midtsBrand.componentStyles.coverDividerClassName} />
              <p className="mt-8 max-w-[55mm] text-[13px] leading-6 text-white/76">{quoteData.approval.confirmationText}</p>
            </section>

            <section className="grid gap-7 pt-1">
              <ConditionGroup title="Assumptions" items={quoteData.assumptions} />
              <ConditionGroup title="Exclusions" items={quoteData.exclusions} />
              <ConditionGroup title="Payment Terms" items={quoteData.paymentTerms} />
            </section>
          </main>

          <section className="mt-auto border-t border-white/18 pt-6">
            <div className="grid grid-cols-2 gap-10">
              {[quoteData.approval.clientParty, quoteData.approval.supplierParty].map((party) => (
                <div key={party}>
                  <div className="h-10 border-b border-white" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-normal text-white">{party}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-normal text-white/54">Signature / confirmation</p>
                </div>
              ))}
            </div>
          </section>

          <DocumentFooter variant="cover" />
        </div>
      </DocumentPage>
    </>
  );
}
