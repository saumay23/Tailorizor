import type { NextConfig } from "next";
import transpileModules from "next-transpile-modules";

const withTM =
  transpileModules(
    [
      "chrome-aws-lambda",
      "puppeteer-core",
    ]
  );

const nextConfig: NextConfig =
  {
    /* config options here */
  };

export default nextConfig;
