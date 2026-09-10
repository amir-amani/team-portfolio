import type { NextConfig } from "next";
import { basePath } from "./src/lib/paths";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};
export default nextConfig;
