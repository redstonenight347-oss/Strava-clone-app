import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@repo/db", "@repo/map-utils", "@repo/types", "@repo/validation"],
};

export default nextConfig;
