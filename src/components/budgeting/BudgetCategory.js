// src/components/budgeting/BudgetCategory.js
const BudgetCategory = () => {
    return (
      <div>
        <h2>Select Category</h2>
        <select>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>
    );
  };
  
  export default BudgetCategory;
  