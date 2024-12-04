import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daily Pomo",
    short_name: "Pomo",
    description: "This is a web-based Pomodoro timer application.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f9f9",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
