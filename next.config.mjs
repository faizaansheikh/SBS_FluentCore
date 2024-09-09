/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['fluentui-next-appdir-directive', { paths: ['@griffel', '@fluentui'] }]],
  },
  reactStrictMode: false,
};

export default nextConfig;
