export async function POST({ request }) {
  try {
    const data = await request.json();
    const { name, amount, orderId } = data;

    const FLIP_API_KEY = import.meta.env.FLIP_API_KEY;

    const form = new URLSearchParams({
      title: `Pembayaran ${orderId}`,
      type: "SINGLE",
      amount: amount,
      is_address_required: "0",
      is_phone_number_required: "0",
      step: "2",
      sender_name: name,
      sender_email: "customer@chechecakes.biz.id",
      sender_address: "Diantar ke lokasi",
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

    return new Response(
      JSON.stringify({
        success: true,
        link_url: result.link_url ?? result.data?.link_url,
        link_id: result.link_id ?? result.data?.link_id,
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
        error: "Gagal memproses pembayaran",
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
