/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@aiworkspace/shared', '@aiworkspace/ui'],
  images: {
    domains: ['aiworkspace-uploads.s3.amazonaws.com', 'gateway.pinata.cloud'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false, 
      net: false, 
      tls: false,
    };
    
    if (isServer) {
      config.externals.push('pino-pretty', '@react-native-async-storage/async-storage');
    }
    
    return config;
  },
};

module.exports = nextConfig;
