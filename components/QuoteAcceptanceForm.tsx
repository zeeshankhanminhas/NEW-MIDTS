'use client';

import { FormEvent, useState } from 'react';
import { submitJsonPayload } from '@/components/formSubmission';

const fieldClass =
  'field_input border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[var(--ink)] outline-none transition placeholder:text-neutral-400 focus:border-black disabled:text-neutral-500';
const labelClass = 'field_group grid gap-2 text-xs font-medium uppercase text-[var(--subtle)]';
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  initialQuoteId?: string;
  initialLeadId?: string;
};

export default function QuoteAcceptanceForm({ initialQuoteId = '', initialLeadId = '' }: Props) {
  const [quoteId, setQuoteId] = useState(initialQuoteId);
  const [acceptanceNotes, setAcceptanceNotes] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isSubmitting = submitState === 'submitting';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState('submitting');
    setErrorMessage('');

    try {
      const normalizedQuoteId = quoteId.trim();
      if (!normalizedQuoteId) {
        throw new Error('Quote reference is required.');
      }

      await submitJsonPayload({
        formStage: 'quoteAcceptance',
        quoteId: normalizedQuoteId,
        leadId: initialLeadId.trim(),
        acceptanceNotes: acceptanceNotes.trim() || 'Accepted from MIDTS quote acceptance page.',
        source: 'Quote Acceptance Page',
        pageUrl: window.location.href,
      });

      setSubmitState('success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Quote acceptance failed.';
      setErrorMessage(message);
      setSubmitState('error');
    }
  }

  return (
    <form className="form_quote_acceptance grid gap-8" onSubmit={handleSubmit}>
      <div className="grid gap-8 md:grid-cols-2">
        <label className={labelClass} htmlFor="quote-id">
          Quote Reference
          <input
            className={fieldClass}
            id="quote-id"
            name="quoteId"
            type="text"
            value={quoteId}
            onChange={(event) => setQuoteId(event.target.value)}
            placeholder="QUOTE-..."
            required
            disabled={isSubmitting || submitState === 'success'}
          />
        </label>
        <label className={labelClass} htmlFor="lead-id">
          Lead Reference
          <input className={fieldClass} id="lead-id" name="leadId" type="text" value={initialLeadId || 'Provided in quote email'} readOnly />
        </label>
      </div>

      <label className={labelClass} htmlFor="acceptance-notes">
        Acceptance Notes
        <textarea
          className={`${fieldClass} field_textarea min-h-28 resize-y`}
          id="acceptance-notes"
          name="acceptanceNotes"
          value={acceptanceNotes}
          onChange={(event) => setAcceptanceNotes(event.target.value)}
          placeholder="Optional: PO reference, preferred start date, or any condition already agreed with MIDTS."
          disabled={isSubmitting || submitState === 'success'}
        />
      </label>

      <div className="form_actions grid gap-4 border-t border-black/10 pt-8 md:grid-cols-[auto_1fr] md:items-center">
        <button
          className="button_primary min-h-12 rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-medium uppercase text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-neutral-500"
          type="submit"
          disabled={isSubmitting || submitState === 'success'}
        >
          {isSubmitting ? 'Submitting' : submitState === 'success' ? 'Accepted' : 'Accept quote'}
        </button>
        <p className="text_body text-sm text-[var(--subtle)]">Acceptance is recorded before project creation.</p>
      </div>

      {submitState === 'success' ? (
        <p className="text_success rounded-md border border-black/10 bg-[var(--paper)] p-4 text-sm text-[var(--muted)]" role="status">
          Submitted. Please check confirmation/logs if needed.
        </p>
      ) : null}

      {submitState === 'error' ? (
        <p className="text_error rounded-md border border-black/10 p-4 text-sm text-[var(--ink)]" role="alert">
          {errorMessage || 'Something went wrong. Please reply to your quote email instead.'}
        </p>
      ) : null}
    </form>
  );
}
