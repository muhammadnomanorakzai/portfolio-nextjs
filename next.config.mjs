/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fdepmoimoahhokpcihkd.supabase.co",
      },
    ],
  },
  experimental: {},
  productionBrowserSourceMaps: false,
};

export default nextConfig;
