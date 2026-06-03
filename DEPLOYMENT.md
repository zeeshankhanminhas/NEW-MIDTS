# Hostinger Deployment

The MIDTS website is configured as a static Next.js export for upload to Hostinger.

## Build

Run these commands from the project root:

```bash
npm ci
npm run build
```

The deployable website is generated in:

```bash
out/
```

## Upload To Hostinger

1. Open Hostinger hPanel.
2. Go to `Websites` and open the MIDTS site.
3. Open `File Manager`.
4. Open `public_html`.
5. Upload the contents of the local `out/` folder into `public_html`.
6. Make sure `index.html` sits directly inside `public_html`, not inside a nested `out` folder.

## Required Environment Variables

Set these before building the site:

```bash
NEXT_PUBLIC_MIDTS_WEBHOOK_URL=your_apps_script_web_app_url
NEXT_PUBLIC_MIDTS_WEBHOOK_TOKEN=your_shared_webhook_token
```

These values are baked into the static frontend at build time, so rebuild and re-upload after changing them.

## Domain

Production URLs and metadata use:

```bash
https://midts.co.uk
```

Do not build with a GitHub Pages base path for Hostinger.
