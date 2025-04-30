require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const runPythonScript = require("./runPython");
const Analysis = require("./models/Analysis");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Add new endpoint to save analysis
app.post("/save-analysis", async (req, res) => {
  try {
    const { patientData, aiResponse } = req.body;
    const analysis = new Analysis({
      patientData,
      aiResponse
    });
    await analysis.save();
    res.json({ success: true, id: analysis._id });
  } catch (err) {
    console.error("Error saving analysis:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/analyses', async (req, res) => {
  try {
    // Fetch all analyses and sort by newest first
    const analyses = await Analysis.find()
      .sort({ createdAt: -1 })
      .exec();
    
    res.json(analyses);
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analyses',
      details: error.message 
    });
  }
});

app.get("/compare-models", async (req, res) => {
  try {
    const data = await runPythonScript("ml-script.py");
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
