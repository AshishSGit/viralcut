import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/clip/", "/dashboard/"],
      },
    ],
    sitemap: "https://clippified.com/sitemap.xml",
  };
}
