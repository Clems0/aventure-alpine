import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "discord.com",
      },
      {
        protocol: "https",
        hostname: "www.twitch.tv",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
    domains: [
      "avatars.githubusercontent.com",
      "jeromeobiols.com",
      "www.mmv.fr",
    ],
  },
};

export default nextConfig;
