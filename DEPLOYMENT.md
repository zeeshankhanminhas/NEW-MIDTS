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
