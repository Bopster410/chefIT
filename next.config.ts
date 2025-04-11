import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '109.120.191.8',
        port: '8080',
        pathname: '/api/image/recipe/**',
        search: '',
      },
    ]
  },
  output: "standalone"
};

export default nextConfig;
