// src/pages/budgeting.js
import AddBudgetForm from '../components/budgeting/AddBudgetForm.js';
import BudgetCategory from '../components/budgeting/BudgetCategory.js';
import BudgetTable from '../components/budgeting/BudgetTable.js';
import SavingsGoal from '../components/budgeting/SavingsGoal.js';

const BudgetingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Budgeting Dashboard</h1>
        <p className="text-gray-600 text-lg">Track your income, expenses, and savings goals easily.</p>
      </div>

      <div className="max-w-4xl mx-auto mt-10 space-y-10">
        {/* Add Budget Form */}
        <section className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">➕ Add New Budget</h2>
          <AddBudgetForm />
        </section>

        {/* Budget Categories */}
        <section className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📁 Budget Categories</h2>
          <BudgetCategory />
        </section>

        {/* Budget Table */}
        <section className="bg-white p-6 rounded-2xl shadow-md border overflow-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Budget Overview</h2>
          <BudgetTable />
        </section>

        {/* Savings Goal */}
        <section className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🐷 Savings Goals</h2>
          <SavingsGoal />
        </section>
      </div>
    </div>
  );
};

export default BudgetingPage;
