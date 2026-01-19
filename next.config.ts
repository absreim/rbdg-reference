import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    silenceDeprecations: ["import"],
    quietDeps: true,
  },
};

export default nextConfig;
