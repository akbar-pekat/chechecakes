import { HttpsProxyAgent } from "https-proxy-agent";

export default async function handler(req, res) {
  const FIXIE_URL = process.env.FIXIE_URL;

  // Siapkan fetchOptions dengan HttpsProxyAgent jika FIXIE_URL tersedia
  const fetchOptions = {};
  if (FIXIE_URL) {
    fetchOptions.agent = new HttpsProxyAgent(FIXIE_URL);
  }

  try {
    // Gunakan layanan yang mengembalikan IP address
    const response = await fetch(
      "https://api.ipify.org?format=json",
      fetchOptions
    );
    const data = await response.json();

    res.status(200).json({
      success: true,
      ip: data.ip,
      usingFixie: FIXIE_URL ? true : false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
