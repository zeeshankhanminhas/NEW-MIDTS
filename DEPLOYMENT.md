# Deployment

The public site at `https://zeeshankhanminhas.github.io/NEW-MIDTS/` is served by GitHub Pages.

## Why the live site can still look old

Committing Next.js source files is not enough to update GitHub Pages. The site must be built into static files and deployed from the generated `out/` directory.

This repo includes a GitHub Actions workflow at `.github/workflows/pages.yml` that:

1. Runs on every push to `main`.
2. Installs dependencies with `npm ci`.
3. Builds the static Next.js site with `npm run build`.
4. Uploads `out/` to GitHub Pages.

## Required GitHub setting

In GitHub, set:

`Settings` → `Pages` → `Build and deployment` → `Source` → `GitHub Actions`

After the PR is merged into `main`, the workflow should deploy the new Next.js output to GitHub Pages.

## Environment variables

Set these repository/environment variables before launch:

- `NEXT_PUBLIC_MIDTS_WEBHOOK_URL` — Google Apps Script Web App `/exec` endpoint for the enquiry form.
- `NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN` — exact token matching `WEBSITE_WEBHOOK_TOKEN` in Apps Script.
- `NEXT_PUBLIC_SITE_URL` — canonical site URL, for example `https://midts.co.uk` after the custom domain is live.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — Plausible domain value, for example `midts.co.uk`.


## Where to add token values

Do not hard-code webhook tokens or tracking values in the codebase. Add them in GitHub instead:

1. Open the GitHub repository.
2. Go to `Settings` → `Secrets and variables` → `Actions`.
3. Add these repository secrets:
   - Name: `NEXT_PUBLIC_MIDTS_WEBHOOK_URL`
   - Value: your full Google Apps Script Web App URL ending in `/exec`.
   - Name: `NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN`
   - Value: the exact `WEBSITE_WEBHOOK_TOKEN` configured in the Apps Script Settings sheet or Script Properties.
4. Add these repository variables if needed:
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://midts.co.uk` after the custom domain is live.
   - Name: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
   - Value: `midts.co.uk` after Plausible is configured.
5. Re-run the GitHub Pages workflow or push/merge to `main`.

The deploy workflow passes these values into `npm run build`, where Next.js embeds `NEXT_PUBLIC_*` values into the static site.

Important: `NEXT_PUBLIC_*` values are visible in the browser after build. Do not place private API keys here. The website webhook token is included in the public browser build because this is a static site. Treat it as a public form token and protect validation/rate limiting on the Apps Script side.


## Google Apps Script webhook setup

If you are using Apps Script, use the Web App `/exec` URL as the value for `NEXT_PUBLIC_MIDTS_WEBHOOK_URL`.

In Apps Script:

1. Open your script.
2. Click `Deploy` → `New deployment`.
3. Select `Web app`.
4. Set `Execute as` to `Me`.
5. Set `Who has access` to `Anyone`.
6. Deploy and copy the Web App URL ending in `/exec`.
7. Add that full `/exec` URL as the GitHub Actions secret named `NEXT_PUBLIC_MIDTS_WEBHOOK_URL`.
8. Add the exact Apps Script `WEBSITE_WEBHOOK_TOKEN` as the GitHub Actions secret named `NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN`.

The form sends URL-encoded fields using `no-cors` mode so browser submissions work with Apps Script web apps without a CORS preflight. In Apps Script, read values from `e.parameter`. Because `no-cors` responses are opaque, the browser cannot inspect the Apps Script response body or status code. The success message means the browser accepted the submission request; validate receipt in Apps Script/Sheets.

Example Apps Script `doPost` handler:

```js
function doPost(e) {
  const expectedToken = PropertiesService.getScriptProperties().getProperty('WEBSITE_WEBHOOK_TOKEN');

  if (e.parameter.webhookToken !== expectedToken) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Website webhook token is missing or invalid.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');

  sheet.appendRow([
    new Date(),
    e.parameter.full_name,
    e.parameter.work_email,
    e.parameter.company,
    e.parameter.project_type,
    e.parameter.brief_requirement,
    e.parameter.source,
    e.parameter.pageUrl
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'Website lead created successfully.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

If leads still do not appear:

1. Confirm `NEXT_PUBLIC_MIDTS_WEBHOOK_URL` is the Apps Script Web App URL ending in `/exec`, not the editor URL and not `/dev`.
2. Confirm `NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN` exactly matches Apps Script `WEBSITE_WEBHOOK_TOKEN`, then re-run the GitHub Pages workflow after adding or changing secrets. Static builds do not pick up secret changes until rebuilt.
3. Confirm the deployment access is `Anyone`; otherwise public website submissions will not reach `doPost`.
4. Confirm the Google Sheet has a tab named `Leads`, or update the script to match your tab name.
5. Open Apps Script `Executions` to inspect failed runs and permission errors.

## Custom domain

The `public/CNAME` file sets the intended GitHub Pages custom domain to `midts.co.uk`. DNS still needs to be configured in the domain provider before the custom domain will resolve.
