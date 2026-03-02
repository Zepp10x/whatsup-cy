import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/whatsup-cy',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/whatsup-cy',
  },
};

export default nextConfig;
