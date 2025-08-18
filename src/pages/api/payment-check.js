import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent"; // ⬅️ untuk Fixie

export async function GET({ url }) {
  try {
    const reference = url.searchParams.get("reference");

    if (!reference) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Reference is required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = "ceLsUlkLPxn4XmsS0zUHi20vFbHejpxgMZhbwNGr";
    const FIXIE_URL = "http://fixie:qzN0pxTHPwP0GHH@criterium.usefixie.com:80";

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server misconfigured: missing TRIPAY_API_KEY",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const agent = FIXIE_URL ? new HttpsProxyAgent(FIXIE_URL) : undefined;

    const response = await axios.get(
      "https://tripay.co.id/api-sandbox/transaction/check-status?reference=" +
        reference,
      {
        headers: { Authorization: "Bearer " + apiKey },
        validateStatus: (status) => status < 999,
        ...(agent ? { httpAgent: agent, httpsAgent: agent, proxy: false } : {}),
        timeout: 15000,
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: response.data.message,
        data: response.data.data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(
      "Tripay Check Error:",
      error?.response?.data || error.message
    );
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
