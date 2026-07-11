import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'export',
  basePath: '/team-page',
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);