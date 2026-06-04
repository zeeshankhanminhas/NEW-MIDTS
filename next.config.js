/** @type {import('next').NextConfig} */
const useRepositoryBasePath = process.env.GITHUB_PAGES === 'true';

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
