import express, { json } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(json());

const PORT = process.env.PORT || 5000; 


app.post("/get-data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://vpl-liveproject-1.onrender.com/api/v1/analytics/8x8/call-records"
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({
      error: "Failed to fetch data from external API",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(` Backend server running at http://localhost:${PORT}`);
});
