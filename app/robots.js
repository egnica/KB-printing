import { businessInfo } from "./lib/services";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${businessInfo.url}/sitemap.xml`,
  };
}
