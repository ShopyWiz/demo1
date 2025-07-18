// src/pages/budgeting.js
import AddBudgetForm from '../components/budgeting/AddBudgetForm.js';
import BudgetCategory from '../components/budgeting/BudgetCategory.js';
import BudgetTable from '../components/budgeting/BudgetTable.js';
import SavingsGoal from '../components/budgeting/SavingsGoal.js';

const BudgetingPage = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold">Budgeting Page</h1>

      {/* Add Budget Form */}
      <div className="mt-5">
        <AddBudgetForm />
      </div>

      {/* Budget Categories */}
      <div className="mt-5">
        <BudgetCategory />
      </div>

      {/* Budget Table */}
      <div className="mt-5">
        <BudgetTable />
      </div>

      {/* Savings Goal */}
      <div className="mt-5">
        <SavingsGoal />
      </div>
    </div>
  );
};

export default BudgetingPage;
