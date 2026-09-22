import type { NextConfig } from "next";

/**
 * Export statique : `npm run build` produit le HTML dans /out,
 * puis `npm run export:html` le transforme en site HTML autonome (voir scripts/export-html.mjs).
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
