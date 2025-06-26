const express = require("express");
const cors = require("cors");
const axios = require("axios");
const tough = require("tough-cookie");
const { wrapper } = require("axios-cookiejar-support");

const app = express();
app.use(cors());
app.use(express.json());

const jar = new tough.CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true }));

let cookiesInitialized = false;
async function initSession() {
  if (cookiesInitialized) return;
  try {
    const resp = await client.get("https://www.swiggy.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
      },
      timeout: 10000,
    });
    console.log("Homepage GET status:", resp.status);
  } catch (err) {
    console.error(
      "Homepage GET failed:",
      err.response?.status || err.message
    );
    throw err;
  }
  cookiesInitialized = true;
}

app.post("/swiggy-update", async (req, res) => {
  try {
    await initSession();

    //  1) Forward the entire client-sent JSON body to Swiggy
    const swiggyResp = await client.post(
      "https://www.swiggy.com/dapi/restaurants/list/update",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
          Referer: "https://www.swiggy.com/restaurants",
          Origin: "https://www.swiggy.com",
        },
      }
    );

    console.log("Update POST status:", swiggyResp.status);
    res.json(swiggyResp.data);
  } catch (err) {
    console.error(
      "Proxy error:",
      err.response?.status,
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
});

app.listen(3001, () =>
  console.log("Proxy running on http://localhost:3001")
);
