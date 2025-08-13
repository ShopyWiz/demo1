// backend/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const budgetRoutes = require('./routes/budgetRoutes');
const savingsRoutes = require('./routes/savingsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', budgetRoutes);
app.use('/api', savingsRoutes);

// Root test route
app.get('/', (req, res) => {
  res.send('ShopyWiz Backend is running ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
