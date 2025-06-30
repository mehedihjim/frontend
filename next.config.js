const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bksseds.ussrms.xyz",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "sports-backend.test",
        port: "",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
