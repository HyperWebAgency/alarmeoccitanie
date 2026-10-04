import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let the dev server's JS load when the site is opened via 127.0.0.1
  // or the local network IP (e.g. testing on a phone). Without this, buttons do nothing there.
  allowedDevOrigins: ["127.0.0.1", "192.168.*.*"],
};

export default nextConfig;
