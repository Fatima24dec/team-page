import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  output: 'export',
};

export default withNextIntl(nextConfig);