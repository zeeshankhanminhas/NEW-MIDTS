# NEW-MIDTS

MIDTS landing page built with Next.js and Tailwind, configured for GitHub Pages.

## Website

Live site:

https://zeeshankhanminhas.github.io/NEW-MIDTS/

## Lead Flow

The front-end reflects the MIDTS nurture architecture:

1. Step 1 form captures the initial project request.
2. Confirmation email sends the Step 2 technical requirement form.
3. Nurture reminders continue while Step 2 is incomplete.
4. Lead is qualified after Step 2 completion.
5. Quote review starts after qualification.

The current deployed site includes the Step 1 front-end and hidden automation field names. Brevo/backend integration is still pending.

## Build

```bash
npm install
npm run build
```

The project uses static export through `next.config.js`, so `npm run build` creates the `out` folder for deployment.

## Deployment

The repository includes `.github/workflows/pages.yml`, which builds the static Next.js export and deploys the `out` folder with GitHub Pages.

GitHub Pages should use GitHub Actions as the source.

## Project Rules

- Use `CONTENT.md` for approved copy, positioning, and automation flow.
- Use `SYSTEM_CONVENTION.md` for component structure and class naming.
- Use `MIDTS_BUILD.md` for current build stage and next tasks.
