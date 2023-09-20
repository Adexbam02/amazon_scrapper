const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = "5615f29eaaff1e69c1ca47ad03d6f06e";
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my API build");
});

// Get product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  //   const { api_key } = req.query;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
