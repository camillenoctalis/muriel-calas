import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Muriel Calas — Préparatrice mentale",
    short_name: "Muriel Calas",    description: "Préparation mentale en Occitanie et en visio, partout en France.",
    start_url: "/",
    display: "browser",
    background_color: "#faf7f2",
    theme_color: "#faf7f2",
    lang: "fr",
    icons: [
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

export const dynamic = "force-static";
