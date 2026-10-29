/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Bundle the .tsv dataset into the code as a plain string, so it exists on
  // Vercel/serverless (where files read with fs at runtime are NOT included).
  webpack(config) {
    config.module.rules.push({
      test: /\.tsv$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
