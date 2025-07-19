// models/BudgetModel.js
const db = require('../db/knex');

// Insert a new budget
const addBudget = async (budgetData) => {
  return await db('budgets')
    .insert(budgetData)
    .returning('*'); // returns inserted row(s)
};

// Get all budgets
const getAllBudgets = async () => {
  return await db('budgets').select('*').orderBy('created_at', 'desc');
};

module.exports = {
  addBudget,
  getAllBudgets,
};
