import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '109.120.191.8',
        port: '8080',
        pathname: '/api/v1/image/recipe/**',
        search: '',
      },
    ]
  },
  output: "standalone",
  reactStrictMode: false,
};

export default nextConfig;
