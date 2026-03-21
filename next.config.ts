import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  experimental: {
    serverActions: {
      bodySizeLimit: "2gb",
    },
  },
  middlewareClientMaxBodySize: "2gb",
};

export default nextConfig;
