/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? '/NEW-MIDTS' : undefined,
  assetPrefix: isGitHubPages ? '/NEW-MIDTS/' : undefined,
};

module.exports = nextConfig;