// src/components/budgeting/BudgetTable.js
const BudgetTable = () => {
    return (
      <div>
        <h2>Budget List</h2>
        <table>
          <thead>
            <tr>
              <th>Budget Name</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Food</td>
              <td>$500</td>
              <td>Food</td>
            </tr>
            <tr>
              <td>Rent</td>
              <td>$1200</td>
              <td>Rent</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default BudgetTable;
  