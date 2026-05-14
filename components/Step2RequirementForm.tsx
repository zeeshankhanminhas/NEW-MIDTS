'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const fieldClass =
  'field_input border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[var(--ink)] outline-none transition placeholder:text-neutral-400 focus:border-black';
const labelClass = 'field_group grid gap-2 text-xs font-medium uppercase text-[var(--subtle)]';
const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL || '';
const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN || '';

export default function Step2RequirementForm() {
  const searchParams = useSearchParams();
  const leadId = useMemo(() => String(searchParams.get('leadId') || searchParams.get('lead_id') || '').trim(), [searchParams]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (!leadId) {
        throw new Error('Missing lead ID.');
      }
      if (!webhookUrl || !webhookToken) {
        throw new Error('Webhook configuration is missing.');
      }

      const form = event.currentTarget;
      const formData = new FormData(form);
      const body = new URLSearchParams();

      formData.set('formStage', 'step2');
      formData.set('webhookToken', webhookToken);
      formData.set('leadId', leadId);
      formData.set('source', 'WebsiteStep2');
      formData.set('pageUrl', window.location.href);

      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          body.append(key, value);
        }
      });

      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        body,
      });

      setSubmitted(true);
      form.reset();
    } catch {
      setErrorMessage('Something went wrong. Please email intake@midts.com with your lead reference.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!leadId) {
    return (
      <section className="padding_global py-24">
        <div className="container_large grid gap-6 border-t border-black/10 pt-10">
          <p className="text-xs font-medium uppercase text-[var(--subtle)]">Step 2 technical requirement</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-[var(--ink)] md:text-6xl">Request link invalid</h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
            This Step 2 form needs a lead reference in the link. Please use the link from your MIDTS email or contact intake@midts.com.
          </p>
        </div>
      </section>
    );
  }

  return (
    <form className="form_step2 grid gap-8" onSubmit={handleSubmit}>
      <div className="grid gap-3">
        <p className="text-xs font-medium uppercase text-[var(--subtle)]">Lead reference</p>
        <p className="text-lg font-medium text-[var(--ink)]">{leadId}</p>
      </div>

      <input type="hidden" name="formStage" value="step2" readOnly />
      <input type="hidden" name="leadId" value={leadId} readOnly />

      <label className={labelClass} htmlFor="technical-requirement">
        Technical Requirement
        <textarea
          className={`${fieldClass} field_textarea min-h-36 resize-y`}
          id="technical-requirement"
          name="technicalRequirement"
          placeholder="Describe the part, drawing, CAD/CAM task, tolerances, source files, expected output, and any manufacturing constraints."
          required
          disabled={isSubmitting}
        />
      </label>

      <div className="grid gap-8 md:grid-cols-3">
        <label className={labelClass} htmlFor="timeline-urgency">
          Timeline / Urgency
          <select className={fieldClass} id="timeline-urgency" name="timelineUrgency" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select timeline</option>
            <option>Urgent: 24-72 hours</option>
            <option>This week</option>
            <option>This month</option>
            <option>Exploring support</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="files-ready">
          Files / Drawings Ready
          <select className={fieldClass} id="files-ready" name="filesDrawingsReady" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select status</option>
            <option>Yes, files are ready</option>
            <option>Partially</option>
            <option>Not yet</option>
            <option>Not sure</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="requirement-complexity">
          Requirement Complexity
          <select className={fieldClass} id="requirement-complexity" name="requirementComplexity" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select complexity</option>
            <option>Simple drafting / drawing support</option>
            <option>CAD modelling</option>
            <option>Reverse engineering</option>
            <option>CAM / manufacturing support</option>
            <option>Mixed or unsure</option>
          </select>
        </label>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <label className={labelClass} htmlFor="budget">
          Budget
          <input className={fieldClass} id="budget" name="budget" type="text" placeholder="Optional" disabled={isSubmitting} />
        </label>
        <label className={labelClass} htmlFor="phone">
          Phone
          <input className={fieldClass} id="phone" name="phone" type="tel" placeholder="Optional" disabled={isSubmitting} />
        </label>
      </div>

      <div className="form_actions grid gap-4 border-t border-black/10 pt-8 md:grid-cols-[auto_1fr] md:items-center">
        <button className="button_primary min-h-12 rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-medium uppercase text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-neutral-500" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Submit technical requirement'}
        </button>
        <p className="text_body text-sm text-[var(--subtle)]">This updates your existing MIDTS lead.</p>
      </div>

      {submitted ? (
        <p className="text_success rounded-md border border-black/10 bg-[var(--paper)] p-4 text-sm text-[var(--muted)]" role="status">
          Your technical requirement has been submitted. MIDTS will review the details and qualify the request.
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
