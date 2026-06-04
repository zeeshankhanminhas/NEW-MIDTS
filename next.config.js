const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const hasCustomDomain = fs.existsSync(path.join(__dirname, 'public', 'CNAME'));
const useRepositoryBasePath = process.env.GITHUB_PAGES === 'true' && !hasCustomDomain;

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: useRepositoryBasePath ? '/NEW-MIDTS' : undefined,
  assetPrefix: useRepositoryBasePath ? '/NEW-MIDTS/' : undefined,
};

module.exports = nextConfig;
