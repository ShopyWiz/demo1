const { addBudget, getAllBudgets } = require('./BudgetModel');

(async () => {
  console.log(await addBudget({ name: 'Test', amount: 500, category: 'Misc' }));
  console.log(await getAllBudgets());
})();
