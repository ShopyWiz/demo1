const BudgetTable = ({ budgets }) => {
  if (budgets.length === 0) {
    return <p className="text-gray-500">No budgets yet. Add one above. 💸</p>;
  }

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Amount ($)</th>
          <th className="p-2 border">Category</th>
        </tr>
      </thead>
      <tbody>
        {budgets.map((b, index) => (
          <tr key={index}>
            <td className="p-2 border">{b.name}</td>
            <td className="p-2 border">{b.amount}</td>
            <td className="p-2 border">{b.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BudgetTable;
