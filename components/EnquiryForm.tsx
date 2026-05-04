'use client';

import { FormEvent, useState } from 'react';

type AutomationMeta = {
  leadId: string;
  step1CompletedAt: string;
};

const fieldClass =
  'field_input border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[#111815] outline-none transition placeholder:text-neutral-400 focus:border-black';
const labelClass = 'field_group grid gap-2 text-xs font-medium uppercase text-[#6a746e]';

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [automationMeta, setAutomationMeta] = useState<AutomationMeta>({
    leadId: '',
    step1CompletedAt: '',
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const completedAt = new Date().toISOString();
    const leadId = `midts-${completedAt.replace(/[^0-9]/g, '')}`;

    setAutomationMeta({ leadId, step1CompletedAt: completedAt });
    setSubmitted(true);
  }

  return (
    <form className="form_enquiry grid gap-8" onSubmit={handleSubmit}>
      <p className="text_body max-w-xl text-sm leading-6 text-[#6a746e]">
        Submit the first request so we can send the Step 2 technical requirement form.
      </p>

      <input type="hidden" name="lead_id" value={automationMeta.leadId} readOnly />
      <input type="hidden" name="step_1_completed_at" value={automationMeta.step1CompletedAt} readOnly />
      <input type="hidden" name="step_2_completed" value="false" readOnly />
      <input type="hidden" name="nurture_state" value="Active" readOnly />
      <input type="hidden" name="reminder_status" value="Pending" readOnly />

      <div className="grid gap-8 md:grid-cols-2">
        <label className={labelClass} htmlFor="full-name">
          Full Name
          <input className={fieldClass} id="full-name" name="full_name" type="text" required />
        </label>
        <label className={labelClass} htmlFor="work-email">
          Work Email
          <input className={fieldClass} id="work-email" name="work_email" type="email" required />
        </label>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <label className={labelClass} htmlFor="company">
          Company
          <input className={fieldClass} id="company" name="company" type="text" required />
        </label>
        <label className={labelClass} htmlFor="project-type">
          Project Type
          <select className={fieldClass} id="project-type" name="project_type" required defaultValue="">
            <option value="" disabled>Select project type</option>
            <option>Overflow CAD drafting support</option>
            <option>Manufacturing-ready CAM assistance</option>
            <option>Engineering documentation handoff</option>
            <option>Other CAD/CAM requirement</option>
          </select>
        </label>
      </div>
      <label className={labelClass} htmlFor="brief-requirement">
        Brief Requirement
        <textarea className={`${fieldClass} field_textarea min-h-24 resize-y`} id="brief-requirement" name="brief_requirement" placeholder="Briefly describe the work. The technical detail comes in Step 2." required />
      </label>
      <div className="form_actions grid gap-4 border-t border-black/10 pt-8 md:grid-cols-[auto_1fr] md:items-center">
        <button className="button_primary min-h-12 rounded-md bg-[#111815] px-7 py-3 text-sm font-medium uppercase text-white transition hover:bg-black" type="submit">
          Start a request
        </button>
        <p className="text_body text-sm text-[#6a746e]">Technical brief follows by email.</p>
      </div>
      {submitted ? (
        <p className="text_success rounded-md border border-black/10 bg-[#f6f4ed] p-4 text-sm text-[#44524b]" role="status">
          We&apos;ve received your initial request. Check your email to complete the technical requirement form.
        </p>
      ) : null}
    </form>
  );
}
