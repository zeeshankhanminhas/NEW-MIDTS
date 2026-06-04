'use client';

import { useEffect, useMemo, useState } from 'react';
import { submitStructuredPayload } from '@/components/formSubmission';

const fieldClass =
  'field_input border-0 border-b border-black/20 bg-transparent px-0 py-3 text-[var(--ink)] outline-none transition placeholder:text-neutral-400 focus:border-black disabled:text-neutral-500';
const labelClass = 'field_group grid gap-2 text-xs font-medium uppercase text-[var(--subtle)]';
const buttonClass =
  'min-h-12 rounded-md px-7 py-3 text-sm font-medium uppercase transition disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500';

type QuoteAction = 'getQuote' | 'acceptQuote' | 'rejectQuote';
type LoadState = 'idle' | 'loading' | 'ready' | 'error' | 'accepted' | 'rejected';
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type StructuredResponse<T = Record<string, unknown>> = {
  success: boolean;
  message: string;
  data?: T;
};

type PublicQuote = {
  quoteId: string;
  leadClientName: string;
  company: string;
  projectType: string;
  quoteAmount: string | number;
  currency: string;
  validUntil: string;
  notes: string;
  status: string;
};

type QuoteResponseData = {
  quote?: Partial<PublicQuote>;
  quoteResult?: StructuredResponse;
  projectResult?: StructuredResponse;
};

type Props = {
  initialQuoteId?: string;
  initialToken?: string;
};

function normalizeQuote(rawQuote?: Partial<PublicQuote>): PublicQuote | null {
  if (!rawQuote) return null;

  return {
    quoteId: String(rawQuote.quoteId || ''),
    leadClientName: String(rawQuote.leadClientName || ''),
    company: String(rawQuote.company || ''),
    projectType: String(rawQuote.projectType || ''),
    quoteAmount: rawQuote.quoteAmount ?? '',
    currency: String(rawQuote.currency || ''),
    validUntil: String(rawQuote.validUntil || ''),
    notes: String(rawQuote.notes || ''),
    status: String(rawQuote.status || ''),
  };
}

function formatAmount(amount: string | number, currency: string) {
  const numericAmount = typeof amount === 'number' ? amount : Number(amount);
  if (Number.isFinite(numericAmount) && currency) {
    try {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(numericAmount);
    } catch {
      return `${currency} ${numericAmount.toLocaleString('en-GB')}`;
    }
  }

  return [currency, amount].filter(Boolean).join(' ') || 'Provided in quote email';
}

function mapBackendMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes('missing quote access token') || normalized.includes('invalid quote access token')) {
    return 'This quote link is invalid or has expired. Please contact MIDTS.';
  }
  if (normalized.includes('already been accepted') || normalized.includes('status is accepted')) {
    return 'This quote has already been accepted.';
  }
  if (normalized.includes('already been rejected') || normalized.includes('status is rejected')) {
    return 'This quote has already been rejected.';
  }
  if (normalized.includes('quote accepted, but project creation failed')) {
    return 'Your quote was accepted, but project setup could not be completed automatically. MIDTS has been notified.';
  }

  return message || 'Something went wrong. Please contact MIDTS.';
}

export default function QuoteAcceptanceForm({ initialQuoteId = '', initialToken = '' }: Props) {
  const quoteId = useMemo(() => initialQuoteId.trim(), [initialQuoteId]);
  const token = useMemo(() => initialToken.trim(), [initialToken]);
  const [quote, setQuote] = useState<PublicQuote | null>(null);
  const [notes, setNotes] = useState('');
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('Loading your quote...');

  async function sendQuoteAction(action: QuoteAction, clientNotes = '') {
    return submitStructuredPayload<QuoteResponseData>({
      formStage: 'quote_acceptance',
      action,
      quoteId,
      token,
      notes: clientNotes,
      source: 'Quote Acceptance Page',
      pageUrl: window.location.href,
    });
  }

  useEffect(() => {
    let cancelled = false;

    async function loadQuote() {
      if (!quoteId || !token) {
        setLoadState('error');
        setMessage('This quote link is incomplete. Please use the link from your MIDTS email.');
        return;
      }

      setLoadState('loading');
      setMessage('Loading your quote...');

      try {
        const result = await sendQuoteAction('getQuote');
        if (cancelled) return;

        if (!result.success) {
          setLoadState('error');
          setMessage(mapBackendMessage(result.message));
          return;
        }

        const publicQuote = normalizeQuote(result.data?.quote);
        if (!publicQuote) {
          setLoadState('error');
          setMessage('Quote details could not be loaded. Please contact MIDTS.');
          return;
        }

        setQuote(publicQuote);
        if (publicQuote.status.toLowerCase() === 'accepted') {
          setLoadState('accepted');
          setMessage('This quote has already been accepted.');
        } else if (publicQuote.status.toLowerCase() === 'rejected') {
          setLoadState('rejected');
          setMessage('This quote has already been rejected.');
        } else {
          setLoadState('ready');
          setMessage(result.message || 'Quote loaded.');
        }
      } catch (error) {
        if (cancelled) return;
        const errorMessage = error instanceof Error ? error.message : 'Quote details could not be loaded.';
        setLoadState('error');
        setMessage(mapBackendMessage(errorMessage));
      }
    }

    loadQuote();

    return () => {
      cancelled = true;
    };
  }, [quoteId, token]);

  async function handleAction(action: Exclude<QuoteAction, 'getQuote'>) {
    setSubmitState('submitting');
    setMessage(action === 'acceptQuote' ? 'Accepting your quote...' : 'Recording your response...');

    try {
      const result = await sendQuoteAction(action, notes.trim());
      if (!result.success) {
        setSubmitState('error');
        setMessage(mapBackendMessage(result.message));
        return;
      }

      setSubmitState('success');
      if (action === 'acceptQuote') {
        setLoadState('accepted');
        setQuote((current) => (current ? { ...current, status: 'Accepted' } : current));
        setMessage('Thank you. Your quote has been accepted and your MIDTS project has been created.');
      } else {
        setLoadState('rejected');
        setQuote((current) => (current ? { ...current, status: 'Rejected' } : current));
        setMessage('Your quote response has been recorded.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Quote response failed.';
      setSubmitState('error');
      setMessage(mapBackendMessage(errorMessage));
    }
  }

  const isBusy = loadState === 'loading' || submitState === 'submitting';
  const canRespond = loadState === 'ready' && submitState !== 'submitting';

  return (
    <div className="quote_acceptance_panel grid gap-8">
      <div
        className={`rounded-md border border-black/10 p-4 text-sm ${loadState === 'error' || submitState === 'error' ? 'text-[var(--ink)]' : 'bg-[var(--paper)] text-[var(--muted)]'}`}
        role={loadState === 'error' || submitState === 'error' ? 'alert' : 'status'}
      >
        {message}
      </div>

      {quote ? (
        <div className="grid gap-5 rounded-md border border-black/10 bg-white p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">Quote ID</p>
              <p className="mt-1 text-base font-semibold text-[var(--ink)]">{quote.quoteId}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">Current Status</p>
              <p className="mt-1 text-base font-semibold text-[var(--ink)]">{quote.status || 'Sent'}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">Lead / Client</p>
              <p className="mt-1 text-base text-[var(--ink)]">{quote.leadClientName || 'Provided in quote email'}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">Company</p>
              <p className="mt-1 text-base text-[var(--ink)]">{quote.company || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">Project Type</p>
              <p className="mt-1 text-base text-[var(--ink)]">{quote.projectType || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">Quote Amount</p>
              <p className="mt-1 text-base text-[var(--ink)]">{formatAmount(quote.quoteAmount, quote.currency)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">Currency</p>
              <p className="mt-1 text-base text-[var(--ink)]">{quote.currency || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[var(--subtle)]">Valid Until</p>
              <p className="mt-1 text-base text-[var(--ink)]">{quote.validUntil || 'Not provided'}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-[var(--subtle)]">Notes / Scope Summary</p>
            <p className="mt-2 whitespace-pre-line text-base leading-7 text-[var(--muted)]">{quote.notes || 'No public scope summary provided.'}</p>
          </div>
        </div>
      ) : null}

      {quote ? (
        <div className="grid gap-6">
          <label className={labelClass} htmlFor="quote-client-notes">
            Client Notes
            <textarea
              className={`${fieldClass} field_textarea min-h-28 resize-y`}
              id="quote-client-notes"
              name="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Optional: PO reference, preferred start date, rejection reason, or requested changes."
              disabled={!canRespond}
            />
          </label>

          <div className="form_actions grid gap-4 border-t border-black/10 pt-8 md:grid-cols-3">
            <button
              className={`${buttonClass} bg-[var(--ink)] text-white hover:bg-black`}
              type="button"
              onClick={() => handleAction('acceptQuote')}
              disabled={!canRespond}
            >
              {isBusy && submitState === 'submitting' ? 'Submitting' : 'Accept Quote'}
            </button>
            <button
              className={`${buttonClass} border border-black/20 text-[var(--ink)] hover:border-black`}
              type="button"
              onClick={() => handleAction('rejectQuote')}
              disabled={!canRespond}
            >
              Reject Quote
            </button>
            <button className={`${buttonClass} border border-black/20 text-[var(--ink)] hover:border-black`} type="button" disabled>
              Request Changes
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
