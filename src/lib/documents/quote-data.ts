import type { MidtsDocumentStatus } from '@/src/lib/midts-brand';

export type QuoteLineItem = {
  item: string;
  description: string;
  quantity: string;
  rate: string;
  total: string;
};

export type QuoteData = {
  documentType: 'quote';
  status: MidtsDocumentStatus;
  preparedFor: string;
  preparedBy: string;
  reference: string;
  projectReference: string;
  dateIssued: string;
  revision: string;
  validity: string;
  currency: string;
  scopeSummary: string;
  lineItems: QuoteLineItem[];
  totals: {
    subtotal: string;
    vat: string;
    total: string;
  };
  assumptions: string[];
  exclusions: string[];
  paymentTerms: string[];
  approval: {
    clientParty: string;
    supplierParty: string;
    confirmationText: string;
  };
};

export const quoteData: QuoteData = {
  documentType: 'quote',
  status: 'issued',
  preparedFor: 'Client Name',
  preparedBy: 'MIDTS',
  reference: 'MIDTS-QT-CLIENT-001',
  projectReference: 'Client Project / Enquiry Reference',
  dateIssued: 'June 2026',
  revision: 'A',
  validity: '30 Days From Issue',
  currency: 'GBP',
  scopeSummary:
    'Controlled engineering support for CAD/CAM activity, technical review, and delivery preparation in line with the supplied project information.',
  lineItems: [
    {
      item: '01',
      description: 'Project intake, file review, and delivery planning',
      quantity: '1',
      rate: '£450.00',
      total: '£450.00',
    },
    {
      item: '02',
      description: 'CAD/CAM engineering support allocation',
      quantity: '2 days',
      rate: '£650.00',
      total: '£1,300.00',
    },
    {
      item: '03',
      description: 'Output review, issue control, and client handover notes',
      quantity: '1',
      rate: '£350.00',
      total: '£350.00',
    },
  ],
  totals: {
    subtotal: '£2,100.00',
    vat: 'Subject to VAT where applicable',
    total: '£2,100.00',
  },
  assumptions: [
    'Source data and project inputs are supplied before work commences.',
    'Client review feedback is consolidated into a single controlled response.',
    'Timescales remain subject to confirmation at acceptance.',
  ],
  exclusions: [
    'Manufacturing, procurement, inspection, or third-party supplier costs.',
    'Additional revisions outside the agreed scope summary.',
    'On-site support unless separately agreed in writing.',
  ],
  paymentTerms: [
    'Quote acceptance is required before work is scheduled.',
    'Payment terms are 14 days from invoice unless otherwise agreed.',
    'Work outside this scope will be quoted or approved separately before proceeding.',
  ],
  approval: {
    clientParty: 'Client Name',
    supplierParty: 'MIDTS',
    confirmationText:
      'Approval confirms acceptance of the quoted scope, commercial value, assumptions, exclusions, and payment terms stated in this document.',
  },
};
