import type { Metadata } from 'next';
import CommercialSummary from '@/src/components/documents/CommercialSummary';
import ContentBlock from '@/src/components/documents/ContentBlock';
import DocumentFooter from '@/src/components/documents/DocumentFooter';
import DocumentHeader from '@/src/components/documents/DocumentHeader';
import DocumentPage from '@/src/components/documents/DocumentPage';
import MetadataGrid from '@/src/components/documents/MetadataGrid';
import SectionDivider from '@/src/components/documents/SectionDivider';
import SignatureBlock from '@/src/components/documents/SignatureBlock';
import StatusBadge from '@/src/components/documents/StatusBadge';
import { quoteData } from '@/src/lib/documents/quote-data';
import { midtsBrand } from '@/src/lib/midts-brand';

export const metadata: Metadata = {
  title: 'Quote | MIDTS',
  description: 'Controlled MIDTS quote document.',
};

const metadataItems = [
  { label: 'Prepared For', value: quoteData.preparedFor },
  { label: 'Prepared By', value: quoteData.preparedBy },
  { label: 'Quote Reference', value: quoteData.reference },
  { label: 'Project Reference', value: quoteData.projectReference },
  { label: 'Date Issued', value: quoteData.dateIssued },
  { label: 'Revision', value: quoteData.revision },
  { label: 'Validity', value: quoteData.validity },
  { label: 'Status', value: <StatusBadge status={quoteData.status} /> },
];

const commercialItems = [
  { label: 'Currency', value: quoteData.currency },
  { label: 'Subtotal', value: quoteData.totals.subtotal },
  { label: 'VAT', value: quoteData.totals.vat },
  { label: 'Quote Total', value: quoteData.totals.total },
];

export default function QuotePage() {
  return (
    <>
      <DocumentPage>
        <div className={midtsBrand.document.bodyFrameClassName}>
          <DocumentHeader documentType={quoteData.documentType} reference={quoteData.reference} />

          <section className={midtsBrand.document.bodyFirstSectionClassName}>
            <p className={`${midtsBrand.typography.smallUppercaseClassName} text-[#b4975a]`}>
              Controlled Commercial Document
            </p>
            <h1 className={`mt-4 max-w-[128mm] text-[#050705] ${midtsBrand.typography.coverTitleClassName}`}>
              Quote
            </h1>
            <p className={`mt-8 max-w-[132mm] text-[#111815] ${midtsBrand.typography.bodyClassName}`}>
              {quoteData.scopeSummary}
            </p>
          </section>

          <div className="mt-12">
            <MetadataGrid items={metadataItems} />
          </div>

          <DocumentFooter reference={`${quoteData.reference} / Rev ${quoteData.revision}`} />
        </div>
      </DocumentPage>

      <DocumentPage>
        <div className={midtsBrand.document.bodyFrameClassName}>
          <DocumentHeader documentType={quoteData.documentType} reference={quoteData.reference} />

          <section className={midtsBrand.document.bodyFirstSectionClassName}>
            <SectionDivider eyebrow="Commercial Scope" title="Quoted Works" />

            <div className="overflow-hidden border-y border-[#050705]">
              <table className="w-full border-collapse text-left text-sm text-[#111815]">
                <thead>
                  <tr className="border-b border-[#050705] text-[10px] font-semibold uppercase text-[#b4975a]">
                    <th className="w-[12mm] py-4 pr-4">Item</th>
                    <th className="py-4 pr-4">Description</th>
                    <th className="w-[24mm] py-4 pr-4">Qty</th>
                    <th className="w-[28mm] py-4 pr-4">Rate</th>
                    <th className="w-[28mm] py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteData.lineItems.map((lineItem) => (
                    <tr key={lineItem.item} className="border-b border-[#d8d8d2] last:border-b-0">
                      <td className="py-4 pr-4 align-top text-xs font-semibold text-[#050705]">{lineItem.item}</td>
                      <td className="py-4 pr-4 align-top leading-6">{lineItem.description}</td>
                      <td className="py-4 pr-4 align-top font-semibold">{lineItem.quantity}</td>
                      <td className="py-4 pr-4 align-top font-semibold">{lineItem.rate}</td>
                      <td className="py-4 text-right align-top font-semibold text-[#050705]">{lineItem.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <CommercialSummary items={commercialItems} />
            </div>
          </section>

          <DocumentFooter reference={`${quoteData.reference} / Rev ${quoteData.revision}`} />
        </div>
      </DocumentPage>

      <DocumentPage>
        <div className={midtsBrand.document.bodyFrameClassName}>
          <DocumentHeader documentType={quoteData.documentType} reference={quoteData.reference} />

          <section className={`${midtsBrand.document.bodyFirstSectionClassName} grid gap-8 sm:grid-cols-3`}>
            <ContentBlock title="Assumptions">
              <ul>
                {quoteData.assumptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ContentBlock>

            <ContentBlock title="Exclusions">
              <ul>
                {quoteData.exclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ContentBlock>

            <ContentBlock title="Payment Terms">
              <ul>
                {quoteData.paymentTerms.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ContentBlock>
          </section>

          <section className={midtsBrand.document.bodySectionClassName}>
            <ContentBlock title="Approval">
              <p>{quoteData.approval.confirmationText}</p>
            </ContentBlock>
            <SignatureBlock parties={[quoteData.approval.clientParty, quoteData.approval.supplierParty]} />
          </section>

          <DocumentFooter reference={`${quoteData.reference} / Rev ${quoteData.revision}`} />
        </div>
      </DocumentPage>
    </>
  );
}
