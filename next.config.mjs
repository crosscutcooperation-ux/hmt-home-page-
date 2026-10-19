/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  devIndicators: false,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
