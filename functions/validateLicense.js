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

    if (!license_key) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing license key" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const body = {
      license_key,
    };

    if (instance_id) {
      body.instance_id = instance_id;
    }

    const response = await fetch(
      "https://api.lemonsqueezy.com/v1/licenses/validate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
        body: JSON.stringify(body),
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
      body: JSON.stringify({ error: "Failed to validate license" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
