'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FileUploadZone from '@/components/FileUploadZone';
import { buildBody, filesToBase64, submitToAppsScript } from '@/components/formSubmission';

const fieldClass =
  'field_input border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[var(--ink)] outline-none transition placeholder:text-neutral-400 focus:border-black';
const labelClass = 'field_group grid gap-2 text-xs font-medium uppercase text-[var(--subtle)]';

export default function Step2TechnicalIntakeForm() {
  const searchParams = useSearchParams();
  const leadId = useMemo(() => String(searchParams.get('leadId') || '').trim(), [searchParams]);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadPhase, setUploadPhase] = useState<'idle' | 'text_submitting' | 'encoding' | 'upload_submitting' | 'failed' | 'complete'>('idle');
    const [includedFileUpload, setIncludedFileUpload] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage('');
    setIsSubmitting(true);
    setUploadProgress(0);
    setUploadPhase('text_submitting');

    try {
      if (!leadId) throw new Error('Missing lead ID.');

      const form = event.currentTarget;
      const formData = new FormData(form);
      const payload: Record<string, string> = {};
      formData.forEach((value, key) => {
        if (typeof value === 'string') payload[key] = value;
      });

      const hadFiles = files.length > 0;
      await submitToAppsScript(buildBody({
        ...payload,
        formStage: 'step2',
        leadId,
        source: 'WebsiteStep2',
        pageUrl: window.location.href,
      }));

      if (hadFiles) {
        setUploadPhase('encoding');
        setUploadProgress(15);
        const encodedFiles = await filesToBase64(files, (completed, total) => {
          const percent = Math.round((completed / total) * 60) + 15;
          setUploadProgress(percent);
        });

        setUploadPhase('upload_submitting');
        const uploadPayload = encodedFiles.map((file, index) => ({
          uploadId: `${leadId}-${Date.now()}-${index + 1}`,
          name: file.name,
          type: file.type,
          size: file.size,
          base64: file.base64,
        }));

        await submitToAppsScript(buildBody({
          formStage: 'step2_file_upload',
          leadId,
          source: 'WebsiteStep2FileUpload',
          pageUrl: window.location.href,
          files: JSON.stringify(uploadPayload),
        }));
        setUploadProgress(100);
      }

      setUploadProgress(100);
      setUploadPhase('complete');
      setIncludedFileUpload(hadFiles);
      setSubmitted(true);
      setFiles([]);
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Submission failed.';
      setErrorMessage(`${message} Please email intake@midts.com with your lead reference.`);
      setUploadProgress(0);
      setUploadPhase('failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!leadId) {
    return <p className="rounded-md border border-black/10 p-4 text-sm text-[var(--muted)]">Missing leadId in link. Please use your MIDTS Step 2 URL.</p>;
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit}>
      <input type="hidden" name="leadId" value={leadId} readOnly />

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

      <div className="grid gap-2">
        <p className="text-xs font-medium uppercase text-[var(--subtle)]">Technical Files</p>
        <FileUploadZone files={files} onFilesChange={setFiles} disabled={isSubmitting} />
        {isSubmitting ? <p className="text-xs text-[var(--subtle)]">Upload progress: {uploadProgress}%</p> : null}
        {uploadPhase === 'text_submitting' ? <p className="text-xs text-[var(--subtle)]">Submitting Step 2 intake details.</p> : null}
        {uploadPhase === 'encoding' ? <p className="text-xs text-[var(--subtle)]">Encoding files for secure transfer.</p> : null}
        {uploadPhase === 'upload_submitting' ? <p className="text-xs text-[var(--subtle)]">Submitting upload queue to file intake service.</p> : null}
        {uploadPhase === 'failed' ? <p className="text-xs text-[var(--subtle)]">Upload failed. Your queue is preserved — review and resubmit.</p> : null}
      </div>

      <div className="grid gap-4 border-t border-black/10 pt-8 md:grid-cols-[auto_1fr] md:items-center">
        <button className="button_primary min-h-12 rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-medium uppercase text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-neutral-500" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Submit technical intake'}
        </button>
        <p className="text-sm text-[var(--subtle)]">This sends Step 2 details and encoded upload payload.</p>
      </div>

      {submitted ? <p className="rounded-md border border-black/10 bg-[var(--paper)] p-4 text-sm text-[var(--muted)]">Technical intake submitted{includedFileUpload ? ' with file upload.' : '.'} Step 2 submitted. File upload sent. Check Drive/File Logs for confirmation.</p> : null}
      {errorMessage ? <p className="rounded-md border border-black/10 p-4 text-sm text-[var(--ink)]">{errorMessage}</p> : null}
    </form>
  );
}
