// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Simulated building material prices
let materialPrices = {
  cement: 3800,
  iron: 5200,
  sand: 25000
};

// Simulate price updates every 5 seconds
setInterval(() => {
  for (let key in materialPrices) {
    let fluctuation = Math.floor(Math.random() * 200 - 100);
    materialPrices[key] = Math.max(1000, materialPrices[key] + fluctuation);
  }
}, 5000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to get live prices
app.get('/api/prices', (req, res) => {
  res.json(materialPrices);
});

// API for cost estimation logic
app.post('/api/estimate', (req, res) => {
  const { buildingType, area, floors } = req.body;

  // Basic estimation logic
  const baseCostPerSqm = 15000;
  const cost = area * floors * baseCostPerSqm;

  res.json({
    estimate: `Estimated material cost for a ${buildingType} is ₦${cost.toLocaleString()}`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
