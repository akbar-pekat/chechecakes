import axios from "axios";
import crypto from "crypto";
import { HttpsProxyAgent } from "https-proxy-agent";

export async function POST({ request }) {
  try {
    const { amount, merchant_ref, customer_data } = await request.json();

    if (!amount || !merchant_ref) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Amount and merchant_ref are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = "DEV-lI9srMGzs3C5BYnQpOjkTjBfvHB0ITNGvToxxzBx";
    const privateKey = "o6mML-3yiL3-5vtPr-tbQC6-uPpJm";
    const merchant_code = "T44365";
    const FIXIE_URL = "http://fixie:qzN0pxTHPwP0GHH@criterium.usefixie.com:80";

    if (!apiKey || !privateKey || !merchant_code) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server misconfigured: missing Tripay env vars",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const expiry = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    const signature = crypto
      .createHmac("sha256", privateKey)
      .update(merchant_code + merchant_ref + amount)
      .digest("hex");

    const customerName = customer_data?.name ?? "";
    const customerEmail = "customer@chechecakes.biz.id";
    const customerPhone = customer_data?.phone ?? "";
    const paymentMethod = customer_data?.paymentMethod ?? "";

    let orderItems = [];
    if (
      Array.isArray(customer_data?.cartItems) &&
      customer_data.cartItems.length > 0
    ) {
      orderItems = customer_data.cartItems.map((item) => ({
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
      }));
    }

    const payload = {
      method: paymentMethod,
      merchant_ref,
      amount,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      order_items: orderItems,
      return_url: "https://chechecakes.biz.id/payment/tf",
      expired_time: expiry,
      signature,
    };

    const agent = FIXIE_URL ? new HttpsProxyAgent(FIXIE_URL) : undefined;

    try {
      const response = await axios.post(
        "https://tripay.co.id/api-sandbox/transaction/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          validateStatus: (status) => status < 999,
          ...(agent
            ? { httpAgent: agent, httpsAgent: agent, proxy: false }
            : {}),
          timeout: 15000,
        }
      );

      return new Response(
        JSON.stringify({
          success: true,
          signature,
          merchant_code,
          merchant_ref,
          amount,
          payment_data: response.data,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (axiosError) {
      console.error(
        "Tripay API Error:",
        axiosError?.response?.data || axiosError.message
      );
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to process payment with Tripay",
          details: axiosError?.response?.data ?? null,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Payment signature generation error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to generate payment signature",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
