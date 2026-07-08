/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile the shared workspace package (ships TypeScript source).
  transpilePackages: ['@vaultway/shared'],
};

export default nextConfig;
