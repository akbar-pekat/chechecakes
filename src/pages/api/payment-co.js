export async function POST({ request }) {
  try {
    const data = await request.json();
    const { name, phone, address, total, orderId } = data;

    const FLIP_API_KEY = import.meta.env.FLIP_API_KEY;

    if (!FLIP_API_KEY) {
      console.error("API key tidak ditemukan");
      return new Response(
        JSON.stringify({
          success: false,
          error: "API key tidak ditemukan",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const REDIRECT_URL = "https://chechecakes.biz.id/payment/tf";

    const form = new URLSearchParams({
      title: `Pembayaran ${orderId}`,
      type: "SINGLE",
      amount: total,
      redirect_url: REDIRECT_URL,
      is_address_required: "1",
      is_phone_number_required: "1",
      step: "2",
      sender_name: name,
      sender_email: "customer@chechecakes.biz.id",
      sender_phone_number: phone,
      sender_address: address,
    });

    const response = await fetch(
      "https://bigflip.id/big_sandbox_api/v2/pwf/bill",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Basic ${FLIP_API_KEY}`,
        },
        body: form,
      }
    );

    const result = await response.json();
    console.log("Full Flip API Response:", JSON.stringify(result));

    let linkUrl = null;
    let linkId = null;

    if (result.link_url) linkUrl = result.link_url;
    else if (result.data?.link_url) linkUrl = result.data.link_url;
    else if (result.data?.payment?.link_url)
      linkUrl = result.data.payment.link_url;
    else if (result.payment_url) linkUrl = result.payment_url;
    else if (result.data?.payment_url) linkUrl = result.data.payment_url;

    if (result.link_id) linkId = result.link_id;
    else if (result.data?.link_id) linkId = result.data.link_id;
    else if (result.data?.payment?.link_id)
      linkId = result.data.payment.link_id;
    else if (result.id) linkId = result.id;
    else if (result.data?.id) linkId = result.data.id;

    if (!linkUrl) {
      console.error("Tidak dapat menemukan link_url dalam respons:", result);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Tidak dapat menemukan URL pembayaran",
          debug: result,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        link_url: linkUrl,
        link_id: linkId || "unknown",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Payment API Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Gagal memproses pembayaran: " + error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
