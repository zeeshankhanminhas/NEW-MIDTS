'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitJsonPayload } from '@/components/formSubmission';

const fieldClass =
  'field_input border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[var(--ink)] outline-none transition placeholder:text-neutral-400 focus:border-black';
const labelClass = 'field_group grid gap-2 text-xs font-medium uppercase text-[var(--subtle)]';
export default function VendorPricingForm() {
  const searchParams = useSearchParams();
  const leadId = useMemo(() => String(searchParams.get('leadId') || searchParams.get('lead_id') || '').trim(), [searchParams]);
  const vendorId = useMemo(() => String(searchParams.get('vendorId') || searchParams.get('vendor_id') || '').trim(), [searchParams]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (!leadId || !vendorId) {
        throw new Error('Missing lead or vendor reference.');
      }
      const form = event.currentTarget;
      const formData = new FormData(form);
      const payload: Record<string, string> = {};

      formData.forEach((value, key) => {
        if (typeof value === 'string') payload[key] = value;
      });

      await submitJsonPayload({
        ...payload,
        formStage: 'vendorPricing',
        leadId,
        vendorId,
        source: 'WebsiteVendorPricing',
        pageUrl: window.location.href,
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Submission failed.';
      setErrorMessage(`${message} Please reply to the MIDTS email with your pricing details.`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!leadId || !vendorId) {
    return (
      <section className="padding_global py-24">
        <div className="container_large grid gap-6 border-t border-black/10 pt-10">
          <p className="text-xs font-medium uppercase text-[var(--subtle)]">Vendor pricing</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-[var(--ink)] md:text-6xl">Pricing link invalid</h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
            This vendor pricing form needs a lead reference and vendor reference in the link. Please use the link from the MIDTS email.
          </p>
        </div>
      </section>
    );
  }

  return (
    <form className="form_vendor_pricing grid gap-8" onSubmit={handleSubmit}>
      <div className="grid gap-5 border-b border-black/10 pb-8 md:grid-cols-2">
        <div className="grid gap-2">
          <p className="text-xs font-medium uppercase text-[var(--subtle)]">Lead reference</p>
          <p className="text-lg font-medium text-[var(--ink)]">{leadId}</p>
        </div>
        <div className="grid gap-2">
          <p className="text-xs font-medium uppercase text-[var(--subtle)]">Vendor reference</p>
          <p className="text-lg font-medium text-[var(--ink)]">{vendorId}</p>
        </div>
      </div>

      <input type="hidden" name="formStage" value="vendorPricing" readOnly />
      <input type="hidden" name="leadId" value={leadId} readOnly />
      <input type="hidden" name="vendorId" value={vendorId} readOnly />

      <div className="grid gap-8 md:grid-cols-[1fr_0.45fr]">
        <label className={labelClass} htmlFor="vendor-cost">
          Vendor Cost
          <input
            className={fieldClass}
            id="vendor-cost"
            name="vendorCost"
            type="number"
            min="1"
            step="0.01"
            placeholder="875.00"
            required
            disabled={isSubmitting}
          />
        </label>
        <label className={labelClass} htmlFor="currency">
          Currency
          <select className={fieldClass} id="currency" name="currency" required defaultValue="GBP" disabled={isSubmitting}>
            <option>GBP</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </label>
      </div>

      <label className={labelClass} htmlFor="eta">
        ETA / Turnaround
        <input className={fieldClass} id="eta" name="eta" type="text" placeholder="4 working days" required disabled={isSubmitting} />
      </label>

      <label className={labelClass} htmlFor="vendor-notes">
        Notes For MIDTS
        <textarea
          className={`${fieldClass} field_textarea min-h-32 resize-y`}
          id="vendor-notes"
          name="vendorNotes"
          placeholder="Include assumptions, exclusions, file requirements, and delivery conditions."
          required
          disabled={isSubmitting}
        />
      </label>

      <div className="form_actions grid gap-4 border-t border-black/10 pt-8 md:grid-cols-[auto_1fr] md:items-center">
        <button className="button_primary min-h-12 rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-medium uppercase text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-neutral-500" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Submit pricing'}
        </button>
        <p className="text_body text-sm text-[var(--subtle)]">This sends pricing to MIDTS for review before a client quote is created.</p>
      </div>

      {submitted ? (
        <p className="text_success rounded-md border border-black/10 bg-[var(--paper)] p-4 text-sm text-[var(--muted)]" role="status">
          Pricing submitted. MIDTS will review it before preparing the client quote.
        </p>
      ) : null}
      {errorMessage ? (
        <p className="text_error rounded-md border border-black/10 p-4 text-sm text-[var(--ink)]" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
