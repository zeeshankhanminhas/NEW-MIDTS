import type { MidtsDocumentType } from '@/src/lib/midts-brand';

export type CapabilityStatementSection = {
  eyebrow?: string;
  title: string;
  blockTitle?: string;
  body: string[];
};

export type CapabilityStatementData = {
  documentType: MidtsDocumentType;
  reference: string;
  cover: {
    title: string;
    messageTitle: string;
    message: string;
    metadata: Array<{
      label: string;
      value: string;
    }>;
  };
  sections: CapabilityStatementSection[];
  closing: {
    title: string;
    body: string[];
  };
};

export const capabilityStatementData: CapabilityStatementData = {
  documentType: 'capabilityStatement',
  reference: 'MIDTS-CS-CLIENT-001',
  cover: {
    title: 'Capability\nStatement',
    messageTitle: 'Engineering Capacity On Demand',
    message: "Overflow CAD/CAM support for teams that can't slow down.",
    metadata: [
      { label: 'Prepared For', value: 'Client Name' },
      { label: 'Reference', value: 'MIDTS-CS-CLIENT-001' },
      { label: 'Date Issued', value: 'June 2026' },
      { label: 'Revision', value: 'A' },
      { label: 'Prepared By', value: 'MIDTS' },
      { label: 'Validity', value: '30 Days From Issue' },
    ],
  },
  sections: [
    {
      title: 'Engineering Capacity Without Hiring',
      body: [
        'MIDTS provides overflow CAD/CAM engineering support for manufacturing, production, and technical teams requiring additional engineering capacity without increasing permanent headcount.',
      ],
    },
    {
      title: 'Core Services',
      body: [
        'CAD Modelling — Controlled 3D modelling support for production, design development, and supplier communication.',
        'CAM Programming — Structured CAM programming support for manufacturing teams requiring additional machining capacity.',
        'Reverse Engineering — Measurement-led recreation of components where legacy data, drawings, or CAD files are incomplete.',
        'Production Drawings — Clear technical drawings prepared for manufacture, review, approval, or controlled release.',
        'Technical Documentation — Concise engineering documentation that supports traceability, review, and handover.',
        'Overflow Engineering Support — Responsive CAD/CAM capacity during workload peaks, project pressure, and temporary resource constraints.',
      ],
    },
    {
      title: 'Engagement Model',
      body: [
        'Requirement — Confirm the engineering need, inputs, constraints, and expected output.',
        'Technical Review — Review supplied data, feasibility, risks, and delivery requirements.',
        'Proposal — Define scope, deliverables, assumptions, timing, and commercial basis.',
        'Approval — Confirm acceptance before work begins.',
        'Execution — Complete the agreed CAD/CAM or documentation work under controlled scope.',
        'Controlled Handover — Return outputs with the required files, notes, and release context.',
      ],
    },
  ],
  closing: {
    title: 'Why MIDTS',
    body: [
      'Structured.',
      'Responsive.',
      'Controlled.',
      'MIDTS supports engineering teams requiring overflow capacity during periods of increased workload, project pressure, and temporary resource constraints.',
    ],
  },
};