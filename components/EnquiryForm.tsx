'use client';

import { FormEvent, useState } from 'react';

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="form_enquiry grid gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="full-name">
          Full Name
          <input className="field_input rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition placeholder:text-teal-50/40 focus:border-teal-300" id="full-name" name="full-name" type="text" required />
        </label>
        <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="company">
          Company
          <input className="field_input rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition placeholder:text-teal-50/40 focus:border-teal-300" id="company" name="company" type="text" required />
        </label>
      </div>
      <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="project-type">
        Project Type
        <select className="field_select rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition focus:border-teal-300" id="project-type" name="project-type" required defaultValue="">
          <option value="" disabled>Select project type</option>
          <option>Overflow CAD drafting support</option>
          <option>Manufacturing-ready CAM assistance</option>
          <option>Engineering documentation handoff</option>
          <option>Other CAD/CAM requirement</option>
        </select>
      </label>
      <label className="field_group grid gap-2 text-sm font-medium text-teal-50" htmlFor="requirement">
        Requirement
        <textarea className="field_textarea min-h-28 rounded-md border border-white/10 bg-[#092622] px-4 py-3 text-white outline-none transition placeholder:text-teal-50/40 focus:border-teal-300" id="requirement" name="requirement" placeholder="Briefly describe what you need delivered." required />
      </label>
      <button className="button_primary min-h-12 rounded-md bg-teal-300 px-6 py-3 text-sm font-medium uppercase text-black transition hover:bg-teal-200" type="submit">
        Submit requirement
      </button>
      {submitted ? (
        <p className="text_success rounded-md border border-teal-300/30 bg-teal-300/10 p-4 text-sm text-teal-50" role="status">
          Your request has been received. We will respond shortly.
        </p>
      ) : null}
    </form>
  );
}
