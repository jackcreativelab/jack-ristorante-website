/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/jack-ristorante-website',
  assetPrefix: '/jack-ristorante-website/',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/jack-ristorante-website',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;