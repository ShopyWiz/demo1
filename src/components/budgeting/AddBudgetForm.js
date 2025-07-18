// src/components/budgeting/AddBudgetForm.js
const AddBudgetForm = () => {
    return (
      <div>
        <h2>Add New Budget</h2>
        <form>
          <label>
            Budget Name:
            <input type="text" placeholder="Enter budget name" />
          </label>
          <label>
            Amount:
            <input type="number" placeholder="Enter amount" />
          </label>
          <button type="submit">Add Budget</button>
        </form>
      </div>
    );
  };
  
  export default AddBudgetForm;
  