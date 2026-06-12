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
  reference: 'MIDTS-CS-2026',
  cover: {
    title: 'Capability\nStatement',
    messageTitle: 'Engineering Capacity On Demand',
    message: 'Overflow CAD/CAM support for teams that can’t slow down.',
    metadata: [
      { label: 'Version', value: '1.0' },
      { label: 'Date', value: 'June 2026' },
      { label: 'Reference', value: 'MIDTS-CS-2026' },
    ],
  },
  sections: [
    {
      eyebrow: 'Capacity',
      title: 'Engineering Capacity Without Hiring',
      body: [
        'MIDTS provides controlled overflow CAD/CAM engineering support for teams that need additional production capacity without adding permanent headcount.',
        'The work is structured around clear requirements, technical review, agreed scope, and controlled handover, so internal teams can keep delivery moving without losing engineering control.',
      ],
    },
    {
      eyebrow: 'Services',
      title: 'Core Services',
      blockTitle: 'Practical Engineering Support',
      body: [
        'CAD Modelling, CAM Programming, Reverse Engineering, Production Drawings, Technical Documentation, and Overflow Engineering Support.',
        'Each service is delivered as a controlled engineering output for review, manufacture, supplier communication, or internal release.',
      ],
    },
    {
      eyebrow: 'Engagement',
      title: 'Engagement Model',
      blockTitle: 'Controlled From Requirement To Handover',
      body: [
        'Requirement, Technical Review, Proposal, Approval, Execution, and Controlled Handover.',
        'This model keeps scope, inputs, timing, and deliverables visible before work begins and traceable when work is handed back.',
      ],
    },
  ],
  closing: {
    title: 'MIDTS',
    body: [
      'midts.com',
      'Overflow Engineering Partner',
    ],
  },
};
