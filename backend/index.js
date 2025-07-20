const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { createBudget, fetchBudgets } = require('./controllers/budgetController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test controller routes
app.get('/api/budgets', fetchBudgets);
app.post('/api/budgets', createBudget);

app.get('/', (req, res) => {
  res.send('ShopyWiz Backend is running ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
