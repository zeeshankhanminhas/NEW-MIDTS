'use client';

import { FormEvent, useState } from 'react';

const webhookUrl = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_URL;
const webhookToken = process.env.NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN;

export default function EnquiryForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = new URLSearchParams();

    formData.forEach((value, key) => {
      payload.append(key, String(value));
    });

    payload.append('webhookToken', webhookToken || '');
    payload.append('source', 'MIDTS Website');
    payload.append('pageUrl', window.location.href);

    if (!webhookUrl || !webhookToken) {
      setStatus('error');
      setMessage('Website webhook URL or token is not configured yet. Add NEXT_PUBLIC_MIDTS_WEBHOOK_URL and NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN before launch.');
      return;
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      });

      form.reset();
      setStatus('success');
      setMessage('Your request has been received. We will respond shortly.');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again or email your requirements directly.');
    }
  }

  return (
    <section id="enquiry" className="section_enquiry py-20 md:py-32">
      <div className="container_large padding_global">
        <div className="enquiry_wrapper grid gap-8 rounded-xl border border-neutral-800 p-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text_label mb-4 text-sm uppercase tracking-[0.2em] text-neutral-500">Project intake</p>
            <h2 className="heading_section mb-6 text-3xl font-medium md:text-4xl">Start your confidential overflow request.</h2>
            <p className="text_body mb-6 text-base text-neutral-400 md:text-lg">
              Share the minimum detail needed to review fit, scope, and urgency. No technical files are required at this stage.
            </p>
            <ul className="grid gap-3 text-sm text-neutral-400">
              <li>No commitment before scope approval.</li>
              <li>NDA available before file sharing.</li>
              <li>Quote returned after requirement review.</li>
            </ul>
          </div>

          <form className="form_enquiry grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm text-neutral-300">
              Full Name *
              <input className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-neutral-500" name="full_name" autoComplete="name" required />
            </label>
            <label className="grid gap-2 text-sm text-neutral-300">
              Work Email *
              <input className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-neutral-500" type="email" name="work_email" autoComplete="email" required />
            </label>
            <label className="grid gap-2 text-sm text-neutral-300">
              Company *
              <input className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-neutral-500" name="company" autoComplete="organization" required />
            </label>
            <label className="grid gap-2 text-sm text-neutral-300">
              Project Type *
              <select className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-neutral-500" name="project_type" required>
                <option value="">Select one</option>
                <option>2D technical drawings</option>
                <option>3D CAD modelling</option>
                <option>CAD/CAM preparation</option>
                <option>Drawing conversion</option>
                <option>Revision support</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-neutral-300">
              Requirement Summary *
              <textarea className="min-h-32 rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-neutral-500" name="brief_requirement" required />
            </label>
            <button className="button_primary rounded-md border border-white px-6 py-3 text-sm font-medium uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting...' : 'Start Your Project'}
            </button>
            {message ? (
              <p className={status === 'success' ? 'text_success text-sm text-green-400' : 'text_error text-sm text-red-400'} role="status">
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
