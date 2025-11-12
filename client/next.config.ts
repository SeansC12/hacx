import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
  webpack: (config) => {
    config.externals.push("serialport");
    return config;
  },
  serverExternalPackages: ["serialport"],
};

export default nextConfig;
