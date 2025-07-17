// src/pages/budgeting.js
import BudgetTable from '../components/budgeting/BudgetTable';
import AddBudgetForm from '../components/budgeting/AddBudgetForm';
import BudgetCategory from '../components/budgeting/BudgetCategory';
import SavingsGoal from '../components/budgeting/SavingsGoal';

const BudgetingPage = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold">Budgeting Page</h1>
      <div className="mt-5">
        <AddBudgetForm />
      </div>
      <div className="mt-5">
        <BudgetCategory />
      </div>
      <div className="mt-5">
        <BudgetTable />
      </div>
      <div className="mt-5">
        <SavingsGoal />
      </div>
    </div>
  );
};

export default BudgetingPage;
