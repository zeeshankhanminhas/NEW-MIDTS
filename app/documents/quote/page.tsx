import type { Metadata } from 'next';
import MIDTSLogo from '@/src/components/brand/MIDTSLogo';
import CommercialSummary from '@/src/components/documents/CommercialSummary';
import DocumentFooter from '@/src/components/documents/DocumentFooter';
import DocumentHeader from '@/src/components/documents/DocumentHeader';
import DocumentPage from '@/src/components/documents/DocumentPage';
import MetadataGrid from '@/src/components/documents/MetadataGrid';
import SectionDivider from '@/src/components/documents/SectionDivider';
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
    <div className="grid gap-5">
      {items.map((item, index) => (
        <div key={item} className="grid grid-cols-[10mm_1fr] gap-4 border-t border-white/18 pt-4">
          <p className="text-[9px] font-semibold text-[#b4975a]">{String(index + 1).padStart(2, '0')}</p>
          <p className="max-w-[78mm] text-[12px] leading-6 text-white/76">{item}</p>
        </div>
      ))}
    </div>
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

          <main className="mt-10 grid grid-cols-[34mm_1fr] gap-x-12">
            <aside className="pt-1">
              <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>Quote Control</p>
              <div className="mt-5 h-[1px] w-14 bg-[#050705]" />
              <p className="mt-5 text-[9px] font-semibold uppercase leading-4 tracking-normal text-[#4b5651]">
                Scope
                <br />
                Commercial
                <br />
                Basis
              </p>
            </aside>

            <section>
              <h2 className="max-w-[116mm] text-[45px] font-semibold leading-[0.98] tracking-normal text-[#050705]">
                Quoted Works
              </h2>
              <p className="mt-7 max-w-[112mm] border-l-2 border-[#b4975a] pl-6 text-[16px] leading-7 text-[#111815]">
                {quoteData.scopeSummary}
              </p>
            </section>
          </main>

          <div className="mt-10">
            <MetadataGrid items={controlMetadata} />
          </div>

          <section className="mt-10">
            <div className="grid grid-cols-[34mm_1fr] gap-x-12">
              <div>
                <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>Commercial Lines</p>
              </div>

              <div className="border-y border-[#050705]">
                {quoteData.lineItems.map((lineItem) => (
                  <div key={lineItem.item} className="grid grid-cols-[12mm_1fr_26mm_28mm] border-b border-[#d8d8d2] py-5 last:border-b-0">
                    <p className="text-[9px] font-semibold text-[#b4975a]">{lineItem.item}</p>
                    <div className="pr-8">
                      <p className="text-[13px] font-semibold leading-5 text-[#050705]">{lineItem.description}</p>
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-normal text-[#4b5651]">
                        Qty {lineItem.quantity} / Rate {lineItem.rate}
                      </p>
                    </div>
                    <p className="text-right text-[11px] font-semibold uppercase text-[#4b5651]">Total</p>
                    <p className="text-right text-[18px] font-semibold leading-none text-[#050705]">{lineItem.total}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 ml-[46mm]">
              <CommercialSummary items={commercialItems} />
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

          <main className="mt-[34mm]">
            <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>Commercial Conditions</p>
            <h2 className="mt-8 max-w-[144mm] text-[56px] font-semibold leading-[0.98] tracking-normal text-white">
              Assumptions.
              <br />
              Exclusions.
              <br />
              Approval.
            </h2>
            <div className={midtsBrand.componentStyles.coverDividerClassName} />

            <section className="mt-12 grid grid-cols-3 gap-10">
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-normal text-[#b4975a]">Assumptions</h3>
                <div className="mt-5">
                  <IndexedList items={quoteData.assumptions} />
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-normal text-[#b4975a]">Exclusions</h3>
                <div className="mt-5">
                  <IndexedList items={quoteData.exclusions} />
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-normal text-[#b4975a]">Payment Terms</h3>
                <div className="mt-5">
                  <IndexedList items={quoteData.paymentTerms} />
                </div>
              </div>
            </section>
          </main>

          <section className="mt-auto border-t border-white/18 pt-7">
            <p className="max-w-[126mm] text-[14px] leading-7 text-white/78">{quoteData.approval.confirmationText}</p>
            <div className="mt-9 grid grid-cols-2 gap-10">
              {[quoteData.approval.clientParty, quoteData.approval.supplierParty].map((party) => (
                <div key={party}>
                  <div className="h-12 border-b border-white" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-normal text-white">{party}</p>
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
