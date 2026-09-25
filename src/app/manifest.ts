import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shafa Holding",
    short_name: "Shafa",
    description: "Building a Legacy of Resilience and Progress.",
    start_url: "/",
    display: "standalone",
    background_color: "#07130D",
    theme_color: "#07130D",
  };
}
