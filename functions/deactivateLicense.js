const fetch = require("node-fetch");
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  try {
    const { license_key, instance_id } = JSON.parse(event.body);

    if (!license_key || !instance_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required parameters" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const response = await fetch(
      "https://api.lemonsqueezy.com/v1/licenses/deactivate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
        body: JSON.stringify({
          license_key,
          instance_id,
        }),
      }
    );

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to deactivate license" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
