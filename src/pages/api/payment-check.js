export async function POST({ request }) {
  try {
    const { link_id } = await request.json();

    if (!link_id) {
      return new Response(
        JSON.stringify({ success: false, error: "Link ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const FLIP_API_KEY = import.meta.env.FLIP_API_KEY;

    if (!FLIP_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${FLIP_API_KEY}`,
    });

    const response = await fetch(
      `https://bigflip.id/big_sandbox_api/v2/pwf/${link_id}/payment`,
      { method: "GET", headers }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Payment status from Flip:", result);

    const payments = result.data || [];
    const isSuccessful =
      payments.length > 0 && payments[0].status === "SUCCESSFUL";

    return new Response(
      JSON.stringify({
        success: true,
        isSuccessful,
        payments: result.data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error checking payment status:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to check payment status",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
