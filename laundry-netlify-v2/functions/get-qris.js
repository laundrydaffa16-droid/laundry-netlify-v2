exports.handler = async function(event, context) {
  // Ambil parameter dari URL
  const { mesinId, amount, invoice } = event.queryStringParameters;
  
  // URL GAS Anda (Pastikan link ini sama dengan yang ada di Google Apps Script Anda)
  const GAS_URL = "https://script.google.com/macros/s/AKfycbzu10f97hmhqTu0s1IexV1C7KRzfJ2jX_l1rQHMXvi4Ras7VU-GeHeNvS8bHZIwrggNGA/exec";
  const targetUrl = `${GAS_URL}?action=create_qris&mesinId=${mesinId}&amount=${amount}&invoice=${invoice}`;

  try {
    // Netlify (Server) memanggil GAS. Ini tidak akan kena blokir CORS
    const response = await fetch(targetUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: "Gagal terhubung ke GAS" })
    };
  }
};