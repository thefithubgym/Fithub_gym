import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/about", "/memberships", "/gallery", "/contact", "/testimonials/submit"],
      disallow: ["/admin/", "/api/", "/_next/"],
    },
    sitemap: "https://fithubgym.in/sitemap.xml",
  };
}
