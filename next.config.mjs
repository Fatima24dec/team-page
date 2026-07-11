import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'export',
  turbopack: {},
};

export default withNextIntl(nextConfig);