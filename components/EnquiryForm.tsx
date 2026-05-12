'use client';

import { FormEvent, useState } from 'react';

type AutomationMeta = {
  leadId: string;
  step1CompletedAt: string;
};

const fieldClass =
  'field_input border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[var(--ink)] outline-none transition placeholder:text-neutral-400 focus:border-black';
const labelClass = 'field_group grid gap-2 text-xs font-medium uppercase text-[var(--subtle)]';
const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL || '';
const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN || '';

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [automationMeta, setAutomationMeta] = useState<AutomationMeta>({
    leadId: '',
    step1CompletedAt: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (!webhookUrl || !webhookToken) {
        throw new Error('Webhook configuration is missing.');
      }

      const form = event.currentTarget;
      const completedAt = new Date().toISOString();
      const leadId = `midts-${completedAt.replace(/[^0-9]/g, '')}`;
      const formData = new FormData(form);
      const body = new URLSearchParams();

      formData.set('lead_id', leadId);
      formData.set('step_1_completed_at', completedAt);
      formData.set('webhookToken', webhookToken);
      formData.set('source', 'Website');
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

      setAutomationMeta({ leadId, step1CompletedAt: completedAt });
      setSubmitted(true);
      form.reset();
    } catch {
      setErrorMessage('Something went wrong. Please email intake@midts.com instead.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form_enquiry grid gap-8" onSubmit={handleSubmit}>
      <p className="text_body max-w-xl text-sm leading-6 text-[var(--subtle)]">
        Submit the first request so we can send the Step 2 technical requirement form.
      </p>

      <input type="hidden" name="lead_id" value={automationMeta.leadId} readOnly />
      <input type="hidden" name="step_1_completed_at" value={automationMeta.step1CompletedAt} readOnly />
      <input type="hidden" name="step_2_completed" value="false" readOnly />
      <input type="hidden" name="nurture_state" value="Active" readOnly />
      <input type="hidden" name="reminder_status" value="Pending" readOnly />
      <input type="hidden" name="formHoneypot" value="" readOnly />
      {/* Scoring integration placeholders for future backend or Apps Script mapping. */}
      <input type="hidden" name="lead_score" value="" readOnly />
      <input type="hidden" name="qualification_status" value="Pending" readOnly />
      <input type="hidden" name="high_value_flag" value="false" readOnly />

      <div className="grid gap-8 md:grid-cols-2">
        <label className={labelClass} htmlFor="full-name">
          Full Name
          <input className={fieldClass} id="full-name" name="full_name" type="text" required disabled={isSubmitting} />
        </label>
        <label className={labelClass} htmlFor="work-email">
          Work Email
          <input className={fieldClass} id="work-email" name="work_email" type="email" required disabled={isSubmitting} />
        </label>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <label className={labelClass} htmlFor="company">
          Company
          <input className={fieldClass} id="company" name="company" type="text" required disabled={isSubmitting} />
        </label>
        <label className={labelClass} htmlFor="project-type">
          Project Type
          <select className={fieldClass} id="project-type" name="project_type" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select project type</option>
            <option>Overflow CAD drafting support</option>
            <option>Manufacturing-ready CAM assistance</option>
            <option>Engineering documentation handoff</option>
            <option>Other CAD/CAM requirement</option>
          </select>
        </label>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <label className={labelClass} htmlFor="timeline-urgency">
          Timeline / Urgency
          <select className={fieldClass} id="timeline-urgency" name="timeline_urgency" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select timeline</option>
            <option>Urgent: 24-72 hours</option>
            <option>This week</option>
            <option>This month</option>
            <option>Exploring support</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="files-ready">
          Files / Drawings Ready
          <select className={fieldClass} id="files-ready" name="files_drawings_ready" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select status</option>
            <option>Yes, files are ready</option>
            <option>Partially</option>
            <option>Not yet</option>
            <option>Not sure</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="requirement-complexity">
          Requirement Complexity
          <select className={fieldClass} id="requirement-complexity" name="requirement_complexity" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select complexity</option>
            <option>Simple drafting / drawing support</option>
            <option>CAD modelling</option>
            <option>Reverse engineering</option>
            <option>CAM / manufacturing support</option>
            <option>Mixed or unsure</option>
          </select>
        </label>
      </div>
      <label className={labelClass} htmlFor="brief-requirement">
        Brief Requirement
        <textarea className={`${fieldClass} field_textarea min-h-24 resize-y`} id="brief-requirement" name="brief_requirement" placeholder="Briefly describe the work. The technical detail comes in Step 2." required disabled={isSubmitting} />
      </label>
      <div className="form_actions grid gap-4 border-t border-black/10 pt-8 md:grid-cols-[auto_1fr] md:items-center">
        <button className="button_primary min-h-12 rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-medium uppercase text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-neutral-500" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Start a request'}
        </button>
        <p className="text_body text-sm text-[var(--subtle)]">Technical brief follows by email.</p>
      </div>
      {submitted ? (
        <p className="text_success rounded-md border border-black/10 bg-[var(--paper)] p-4 text-sm text-[var(--muted)]" role="status">
          We&apos;ve received your initial request. Check your email to complete the technical requirement form.
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
