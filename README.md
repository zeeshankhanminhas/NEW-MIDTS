# NEW-MIDTS

MIDTS landing page built with Next.js and Tailwind, configured for GitHub Pages.

## Website

Live site:

https://zeeshankhanminhas.github.io/NEW-MIDTS/

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

- Use `CONTENT.md` for approved copy and positioning.
- Use `SYSTEM_CONVENTION.md` for component structure and class naming.
- Use `MIDTS_BUILD.md` for current build stage and next tasks.
