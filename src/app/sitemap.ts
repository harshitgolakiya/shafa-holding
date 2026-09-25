import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = ["", "/about", "/businesses", "/businesses/investment", "/businesses/construction", "/contact"];

  return paths.map((path, index) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : path === "/contact" ? 0.6 : 0.8,
  }));
}
