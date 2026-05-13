/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPages
    ? {
        basePath: '/NEW-MIDTS',
        assetPrefix: '/NEW-MIDTS/',
      }
    : {}),
};

module.exports = nextConfig;
