/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async redirects() {
    return ["kollab", "meridian"].map((project) => ({
      source: `/assets/${project}.png`,
      destination: `/work/${project}.webp`,
      permanent: true,
    }));
  },
};

export default nextConfig;
