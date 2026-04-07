import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1.0, changeFrequency: "weekly" },
    {
      url: `${SITE_URL}/invoice-generator`,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${SITE_URL}/payslip-generator`,
      priority: 0.85,
      changeFrequency: "weekly",
    },
    {
      url: `${SITE_URL}/qr-code-generator`,
      priority: 0.85,
      changeFrequency: "weekly",
    },
  ];
}
