import { useEffect, useState } from 'react';

const BudgetTable = ({ newBudget }) => {
  const [budgets, setBudgets] = useState([]);

  // Fetch budgets on component mount
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/budgets');
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error('❌ Failed to fetch budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  // Append new budget when added
  useEffect(() => {
    if (newBudget) {
      setBudgets((prev) => [...prev, newBudget]);
    }
  }, [newBudget]);

  if (budgets.length === 0) {
    return <p className="text-gray-500">No budgets yet. Add one above. 💸</p>;
  }

  return (
    <table className="w-full table-auto border-collapse border border-gray-300 mt-5 shadow">
      <thead>
        <tr className="bg-indigo-100 text-indigo-900">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Amount ($)</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Created At</th>
        </tr>
      </thead>
      <tbody>
        {budgets.map((b, index) => (
          <tr key={index}>
            <td className="p-2 border">{b.name}</td>
            <td className="p-2 border">${b.amount}</td>
            <td className="p-2 border">{b.category}</td>
            <td className="p-2 border">
              {new Date(b.created_at).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BudgetTable;
