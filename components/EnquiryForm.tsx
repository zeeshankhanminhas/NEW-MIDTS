'use client';

import { FormEvent, useState } from 'react';

type AutomationMeta = {
  leadId: string;
  step1CompletedAt: string;
};

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
    <form className="form_enquiry grid gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-5" onSubmit={handleSubmit}>
      <p className="text_body text-sm text-teal-50/70">
        Submit the first request so we can send the Step 2 technical requirement form.
      </p>

      <input type="hidden" name="lead_id" value={automationMeta.leadId} readOnly />
      <input type="hidden" name="step_1_completed_at" value={automationMeta.step1CompletedAt} readOnly />
      <input type="hidden" name="step_2_completed" value="false" readOnly />
      <input type="hidden" name="nurture_state" value="Active" readOnly />
      <input type="hidden" name="reminder_status" value="Pending" readOnly />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="full-name">
          Full Name
          <input className="field_input rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition placeholder:text-teal-50/40 focus:border-teal-300" id="full-name" name="full_name" type="text" required />
        </label>
        <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="work-email">
          Work Email
          <input className="field_input rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition placeholder:text-teal-50/40 focus:border-teal-300" id="work-email" name="work_email" type="email" required />
        </label>
      </div>
      <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="company">
        Company
        <input className="field_input rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition placeholder:text-teal-50/40 focus:border-teal-300" id="company" name="company" type="text" required />
      </label>
      <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="project-type">
        Project Type
        <select className="field_select rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition focus:border-teal-300" id="project-type" name="project_type" required defaultValue="">
          <option value="" disabled>Select project type</option>
          <option>Overflow CAD drafting support</option>
          <option>Manufacturing-ready CAM assistance</option>
          <option>Engineering documentation handoff</option>
          <option>Other CAD/CAM requirement</option>
        </select>
      </label>
      <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="brief-requirement">
        Brief Requirement
        <textarea className="field_textarea min-h-28 rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition placeholder:text-teal-50/40 focus:border-teal-300" id="brief-requirement" name="brief_requirement" placeholder="Briefly describe the work. The technical detail comes in Step 2." required />
      </label>
      <button className="button_primary min-h-12 rounded-md bg-teal-300 px-6 py-3 text-sm font-medium uppercase text-black transition hover:bg-teal-200" type="submit">
        Start a request
      </button>
      {submitted ? (
        <p className="text_success rounded-md border border-teal-300/30 bg-teal-300/10 p-4 text-sm text-teal-50" role="status">
          We&apos;ve received your initial request. Check your email to complete the technical requirement form.
        </p>
      ) : null}
    </form>
  );
}
