import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/db","@repo/validation"],
};

export default nextConfig;
