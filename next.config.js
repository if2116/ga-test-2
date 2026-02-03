const createNextIntlPlugin = require('next-intl/plugin');

// Use i18n config from root directory
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'npm-test-2';
const isGhPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGhPages ? `/${repo}` : '';

const nextConfig = {
  output: isGhPages ? 'export' : undefined,
  trailingSlash: true,

  basePath,
  assetPrefix: isGhPages ? `${basePath}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
