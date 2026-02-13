import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/politica-de-privacidad",
        destination: "/es/privacy",
        permanent: true,
      },
      {
        source: "/politica-de-privacidad/",
        destination: "/es/privacy",
        permanent: true,
      },
      {
        source: "/about_us",
        destination: "/es/about",
        permanent: true,
      },
      {
        source: "/about_us/",
        destination: "/es/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
