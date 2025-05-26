// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: "server",
  site: "https://chechecakes.biz.id",
  integrations: [
    sitemap({
      filter: (page) =>
        page !== "https://chechecakes.biz.id/checkout/" &&
        page !== "https://chechecakes.biz.id/payment/cod" &&
        page !== "https://chechecakes.biz.id/payment/ots" &&
        page !== "https://chechecakes.biz.id/payment/tf",
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2025-05-27"),
      customPages: ["https://chechecakes.biz.id/blog/*"],
    }),
  ],
});
