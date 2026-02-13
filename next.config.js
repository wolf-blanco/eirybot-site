/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
