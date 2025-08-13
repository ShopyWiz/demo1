// backend/routes/savingsRoutes.js

const express = require('express');
const router = express.Router();

const {
  fetchSavings,
  updateSavingsGoal,
  addMoney,
  removeMoney,
  resetSavingsAmount,
} = require('../controllers/savingsController');

// @route   GET /api/savings
// @desc    Get current savings data (goal and current amount)
router.get('/savings', fetchSavings);

// @route   POST /api/savings/goal
// @desc    Set or update savings goal
router.post('/savings/goal', updateSavingsGoal);

// @route   POST /api/savings/add
// @desc    Add money to savings
router.post('/savings/add', addMoney);

// @route   POST /api/savings/remove
// @desc    Remove money from savings
router.post('/savings/remove', removeMoney);

// @route   POST /api/savings/reset
// @desc    Reset savings amount to 0
router.post('/savings/reset', resetSavingsAmount);

module.exports = router;
