/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fouaille.bde-tps.fr",
        pathname: "/storage/images/**",
      },
    ],
  },
};

export default nextConfig;
