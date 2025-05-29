// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";

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
    AstroPWA({
      mode: "production",
      base: "/",
      scope: "/",
      includeAssets: ["favicon.svg", "logo.png"],
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Cheche Cakes",
        short_name: "ChecheCakes",
        description: "Pesan kue favoritmu lewat WhatsApp",
        start_url: "/",
        theme_color: "#351500",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        orientation: "portrait",
        lang: "id",
        icons: [
          {
            src: "logo-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "logo-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "logo-maskable-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "logo-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshot-mobile.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Cheche Cakes Mobile View",
          },
          {
            src: "screenshot-desktop.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Cheche Cakes Desktop View",
          },
        ],
      },
      workbox: {
        navigateFallback: "/404",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\/$/],
      },
    }),
  ],
});
