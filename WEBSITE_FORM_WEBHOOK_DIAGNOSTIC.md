# MIDTS Website Form Webhook Diagnostic

## Scope

This diagnostic compares the Stage 10 Apps Script website webhook contract in this repository with the public website form implementation in `zeeshankhanminhas/NEW-MIDTS` as inspected on GitHub.

## Finding

The Apps Script Stage 10 payload test proves the backend can create a lead when it receives a valid payload with the configured `WEBSITE_WEBHOOK_TOKEN`. The live website form can still appear to submit successfully while no lead is created because the website uses a `fetch()` call with `mode: 'no-cors'` and never reads the Apps Script response.

That means any Apps Script rejection is hidden from the browser, including:

- wrong or old Apps Script Web App URL,
- using `/dev` instead of the public `/exec` deployment URL,
- missing production environment variables,
- token mismatch,
- Web App access/deployment permission issue,
- Apps Script returning `Website webhook token is missing or invalid.`,
- Apps Script returning validation errors.

## Evidence from this Apps Script repository

- `doPost(e)` is the real public entry point for website submissions and forwards requests to `WebsiteWebhookService.handlePostEvent(e)`.
- `runStage10WebsiteWebhookPayloadTest()` creates a fake internal Apps Script event and calls the handler directly, so it does not verify that the live website reaches the deployed Web App URL.
- The webhook requires a submitted token named `webhookToken`, `webhook_token`, `formToken`, `token`, or `WEBSITE_WEBHOOK_TOKEN` to exactly match the configured `WEBSITE_WEBHOOK_TOKEN`.
- The website's field names `full_name`, `work_email`, `company`, `project_type`, `timeline_urgency`, `files_drawings_ready`, `requirement_complexity`, and `brief_requirement` are already accepted by the Apps Script webhook, so the primary issue is not field-name mapping.

## Evidence from the website repository

In `components/EnquiryForm.tsx`, the website:

- reads `NEXT_PUBLIC_MIDTS_WEBHOOK_URL` and `NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN`,
- throws only if those values are empty,
- creates a `URLSearchParams` body,
- sets `webhookToken`, `source`, and `pageUrl`,
- posts with `fetch(webhookUrl, { method: 'POST', mode: 'no-cors', body })`,
- immediately marks the submission as successful without checking Apps Script's JSON response.

Because `no-cors` returns an opaque response, the frontend cannot see whether Apps Script returned success or failure.

## Most likely root cause

The most likely root cause is not `LeadService` or Google Sheets. The backend test creates a lead, so the Apps Script lead creation path works.

The live website is probably failing in one of these places while hiding the failure:

1. `NEXT_PUBLIC_MIDTS_WEBHOOK_URL` is missing, wrong, old, or points at `/dev` instead of `/exec`.
2. `NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN` does not exactly match `WEBSITE_WEBHOOK_TOKEN` in the Apps Script Settings sheet or Script Properties.
3. The Apps Script Web App deployment has not been updated after Stage 10, or access is not set to `Anyone`.
4. The request reaches Apps Script but Apps Script returns a JSON error that the website cannot read because of `mode: 'no-cors'`.

## Fast verification checklist

1. In the deployed website environment, confirm:
   - `NEXT_PUBLIC_MIDTS_WEBHOOK_URL` is the Apps Script Web App URL ending in `/exec`.
   - `NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN` exactly matches the Apps Script `WEBSITE_WEBHOOK_TOKEN` value.
2. Submit the website form once.
3. Open Apps Script **Executions**.
   - If there is no recent `doPost` execution, the website is not reaching Apps Script.
   - If there is a `doPost` execution, inspect the returned message/error.
4. Run a direct deployed URL test with URL-encoded fields:

```bash
curl -L -X POST 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec' \
  -d 'webhookToken=YOUR_CONFIGURED_TOKEN' \
  -d 'full_name=Website Curl Test' \
  -d 'work_email=test@example.com' \
  -d 'company=MIDTS Test' \
  -d 'project_type=CAD Enquiry' \
  -d 'brief_requirement=Testing deployed website webhook directly'
```

Expected successful response:

```json
{
  "success": true,
  "message": "Website lead created successfully.",
  "data": {
    "leadId": "MIDTS-L-..."
  }
}
```

## Recommended website fix

For production debugging, temporarily remove `mode: 'no-cors'` and read the response body, or route submissions through a same-origin Next.js API route that posts to Apps Script server-side. The same-origin API route is preferred because it avoids exposing the webhook token in public `NEXT_PUBLIC_*` browser variables.

Recommended server-side shape:

1. Browser posts to `/api/enquiry`.
2. Next.js API route reads private environment variables:
   - `MIDTS_WEBHOOK_URL`
   - `MIDTS_WEBHOOK_TOKEN`
3. API route posts `URLSearchParams` to Apps Script.
4. API route reads Apps Script JSON and returns real success/failure to the browser.

This makes the website show the real Apps Script error instead of a false success state.

## Known limitation

This document does not change application code. It records the integration issue and the exact checklist for isolating it.
