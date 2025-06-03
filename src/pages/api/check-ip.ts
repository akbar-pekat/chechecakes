import { HttpsProxyAgent } from "https-proxy-agent";
import type { APIRoute } from "astro";

// Tambahkan ini jika menggunakan output: 'hybrid' di astro.config.mjs
export const prerender = false;

export const GET: APIRoute = async () => {
  const FIXIE_URL = process.env.FIXIE_URL || import.meta.env.FIXIE_URL;

  // Siapkan fetchOptions dengan HttpsProxyAgent jika FIXIE_URL tersedia
  const fetchOptions = {};
  if (FIXIE_URL) {
    Object.assign(fetchOptions, { agent: new HttpsProxyAgent(FIXIE_URL) });
  }

  try {
    // Gunakan layanan yang mengembalikan IP address
    const response = await fetch(
      "https://api.ipify.org?format=json",
      fetchOptions
    );
    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        ip: data.ip,
        usingFixie: FIXIE_URL ? true : false,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
