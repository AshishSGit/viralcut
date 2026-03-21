const nextConfig = {
  serverExternalPackages: [],
  experimental: {
    serverActions: {
      bodySizeLimit: "2gb",
    },
  },
  middlewareClientMaxBodySize: "2gb",
};

export default nextConfig;
