import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        buffer: false,
      };
    }

    // Handle @react-pdf/renderer
    config.resolve.alias = {
      ...config.resolve.alias,
      "@react-pdf/renderer": "@react-pdf/renderer/lib/react-pdf.browser.js",
    };

    return config;
  },
  turbopack: {
    // Empty turbopack config to silence the warning
    // Turbopack will handle @react-pdf/renderer differently
  },
};

export default nextConfig;
