'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FileUploadZone from '@/components/FileUploadZone';

const fieldClass =
  'field_input border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[var(--ink)] outline-none transition placeholder:text-neutral-400 focus:border-black';
const labelClass = 'field_group grid gap-2 text-xs font-medium uppercase text-[var(--subtle)]';
const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL || '';
const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN || '';

export default function Step2TechnicalIntakeForm() {
  const searchParams = useSearchParams();
  const leadId = useMemo(() => String(searchParams.get('leadId') || '').trim(), [searchParams]);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (!leadId) throw new Error('Missing lead ID.');
      if (!webhookUrl || !webhookToken) throw new Error('Webhook configuration is missing.');

      const form = event.currentTarget;
      const formData = new FormData(form);
      const body = new URLSearchParams();

      const uploadMetadata = files.map((file) => ({ name: file.name, sizeBytes: file.size, type: file.type || 'unknown' }));

      formData.set('formStage', 'step2');
      formData.set('webhookToken', webhookToken);
      formData.set('leadId', leadId);
      formData.set('source', 'WebsiteStep2');
      formData.set('pageUrl', window.location.href);
      formData.set('uploadMetadata', JSON.stringify(uploadMetadata));

      formData.forEach((value, key) => {
        if (typeof value === 'string') body.append(key, value);
      });

      await fetch(webhookUrl, { method: 'POST', mode: 'no-cors', body });

      setSubmitted(true);
      setFiles([]);
      form.reset();
    } catch {
      setErrorMessage('Something went wrong. Please email intake@midts.com with your lead reference.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!leadId) {
    return <p className="rounded-md border border-black/10 p-4 text-sm text-[var(--muted)]">Missing leadId in link. Please use your MIDTS Step 2 URL.</p>;
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit}>
      <input type="hidden" name="formStage" value="step2" readOnly />
      <input type="hidden" name="leadId" value={leadId} readOnly />
      <input type="hidden" name="uploadMetadata" value={JSON.stringify(files.map((f) => ({ name: f.name, sizeBytes: f.size, type: f.type || 'unknown' })))} readOnly />

      <div className="grid gap-2">
        <p className="text-xs font-medium uppercase text-[var(--subtle)]">Lead reference</p>
        <p className="text-lg font-medium text-[var(--ink)]">{leadId}</p>
      </div>

      <label className={labelClass} htmlFor="technical-requirement">Technical Requirement
        <textarea className={`${fieldClass} min-h-36 resize-y`} id="technical-requirement" name="technicalRequirement" required disabled={isSubmitting} />
      </label>

      <div className="grid gap-8 md:grid-cols-3">
        <label className={labelClass} htmlFor="timeline-urgency">Timeline / Urgency
          <select className={fieldClass} id="timeline-urgency" name="timelineUrgency" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select timeline</option><option>Urgent: 24-72 hours</option><option>This week</option><option>This month</option><option>Flexible</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="files-ready">Files / Drawings Ready
          <select className={fieldClass} id="files-ready" name="filesDrawingsReady" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select status</option><option>Yes, files are ready</option><option>Partially</option><option>Not yet</option><option>Not sure</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="requirement-complexity">Requirement Complexity
          <select className={fieldClass} id="requirement-complexity" name="requirementComplexity" required defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select complexity</option><option>Simple</option><option>Moderate</option><option>Complex</option><option>Mixed / unsure</option>
          </select>
        </label>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <label className={labelClass} htmlFor="budget-estimate">Budget / Estimate
          <input className={fieldClass} id="budget-estimate" name="budgetEstimate" type="text" placeholder="Optional" disabled={isSubmitting} />
        </label>
        <label className={labelClass} htmlFor="notes">Notes
          <input className={fieldClass} id="notes" name="notes" type="text" placeholder="Optional" disabled={isSubmitting} />
        </label>
      </div>

      <div className="grid gap-2">
        <p className="text-xs font-medium uppercase text-[var(--subtle)]">Technical Files (metadata only for now)</p>
        <FileUploadZone files={files} onFilesChange={setFiles} disabled={isSubmitting} />
      </div>

      <div className="grid gap-4 border-t border-black/10 pt-8 md:grid-cols-[auto_1fr] md:items-center">
        <button className="button_primary min-h-12 rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-medium uppercase text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-neutral-500" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Submit technical intake'}
        </button>
        <p className="text-sm text-[var(--subtle)]">This sends Step 2 text payload and upload metadata only.</p>
      </div>

      {submitted ? <p className="rounded-md border border-black/10 bg-[var(--paper)] p-4 text-sm text-[var(--muted)]">Technical intake submitted successfully.</p> : null}
      {errorMessage ? <p className="rounded-md border border-black/10 p-4 text-sm text-[var(--ink)]">{errorMessage}</p> : null}
    </form>
  );
}
