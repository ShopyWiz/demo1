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

// Delete a budget by id
const deleteBudget = async (id) => {
  return await db('budgets')
    .where({ id })
    .del();
};

// Update a budget by id
const updateBudget = async (id, updateData) => {
  return await db('budgets')
    .where({ id })
    .update(updateData)
    .returning('*');
};

module.exports = {
  addBudget,
  getAllBudgets,
  deleteBudget,
  updateBudget,
};
