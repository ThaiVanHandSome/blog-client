import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"]
  },
  unstable_includeFiles: [
    "node_modules/next/dist/compiled/@edge-runtime/primitives/**/*.+(js|json)"
  ],
  theme: {
    extends: {
      colors: {
        bBlue: {
          100: "#e2f0fc",
          200: "#bfe1f8",
          300: "#86caf3",
          400: "#46aeea",
          500: "#1c89c9",
          600: "#1175b8",
          700: "#0f5e95",
          800: "#10507c",
          900: "#134367"
        },
        bPurple: {
          500: "#9400d3"
        }
      }
    }
  }
};

export default nextConfig;
