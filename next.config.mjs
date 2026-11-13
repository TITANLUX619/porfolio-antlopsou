/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async redirects() {
    return [{
      source: "/:locale(es|en)/work/trento-consulting",
      destination: "/:locale/work/trento-desarrollo",
      permanent: true,
    }];
  },
};

export default nextConfig;
