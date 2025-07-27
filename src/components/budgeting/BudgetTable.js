
import { useState } from 'react';

const BudgetTable = ({ budgets, onDelete, onEdit }) => {

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', amount: '', category: '' });
  const [loadingId, setLoadingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // UX: Show loading if budgets is undefined (fetching), else show empty state
  if (!budgets) {
    return <div className="flex items-center gap-2 text-indigo-500"><span className="animate-spin">⏳</span> Loading budgets...</div>;
  }
  if (budgets.length === 0) {
    return <p className="text-gray-500">No budgets yet. Add one above. 💸</p>;
  }

  const startEdit = (b) => {
    setEditId(b.id);
    setEditData({ name: b.name, amount: b.amount, category: b.category });
    setMessage('');
    setError('');
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    if (!editData.name || !editData.amount || !editData.category) {
      setError('All fields are required.');
      return;
    }
    setLoadingId(id);
    setError('');
    try {
      await onEdit(id, editData);
      setMessage('Budget updated!');
    } catch (e) {
      setError('Failed to update.');
    }
    setEditId(null);
    setLoadingId(null);
  };

  const handleDelete = async (id) => {
    setLoadingId(id);
    setError('');
    try {
      await onDelete(id);
      setMessage('Budget deleted.');
    } catch (e) {
      setError('Failed to delete.');
    }
    setDeleteId(null);
    setLoadingId(null);
  };

  return (
    <div className="relative">
      {message && <div className="absolute left-0 top-0 bg-green-100 text-green-700 px-3 py-1 rounded shadow mb-2 animate-fadeIn z-10">{message}</div>}
      {error && <div className="absolute left-0 top-0 bg-red-100 text-red-700 px-3 py-1 rounded shadow mb-2 animate-fadeIn z-10">{error}</div>}
      <table className="w-full table-auto border-collapse border border-gray-300 mt-5 shadow">
        <thead>
          <tr className="bg-indigo-100 text-indigo-900">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Amount ($)</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b.id} className={
              `transition-colors ${editId === b.id ? 'bg-yellow-50' : 'hover:bg-indigo-50 focus-within:bg-indigo-100'}`
            }>
              <td className="p-2 border">
                {editId === b.id ? (
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-full"
                    autoFocus
                  />
                ) : (
                  b.name
                )}
              </td>
              <td className="p-2 border">
                {editId === b.id ? (
                  <input
                    name="amount"
                    type="number"
                    value={editData.amount}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  `$${b.amount}`
                )}
              </td>
              <td className="p-2 border">
                {editId === b.id ? (
                  <input
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  b.category
                )}
              </td>
              <td className="p-2 border">
                {new Date(b.created_at).toLocaleString()}
              </td>
              <td className="p-2 border text-center">
                {editId === b.id ? (
                  <>
                    <button
                      className={`bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 ${loadingId === b.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleEditSave(b.id)}
                      disabled={loadingId === b.id || !editData.name || !editData.amount || !editData.category}
                    >{loadingId === b.id ? 'Saving...' : 'Save'}</button>
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                      onClick={() => setEditId(null)}
                      disabled={loadingId === b.id}
                    >Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500"
                      onClick={() => startEdit(b)}
                      disabled={loadingId}
                    >Edit</button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => setDeleteId(b.id)}
                      disabled={loadingId}
                    >Delete</button>
                  </>
                )}
                {/* Delete confirmation dialog */}
                {deleteId === b.id && (
                  <div className="absolute bg-white border border-gray-300 rounded shadow-lg p-4 z-20 left-1/2 -translate-x-1/2 mt-2 w-64 animate-fadeIn">
                    <div className="text-gray-800 mb-2">Are you sure you want to delete <b>{b.name}</b>?</div>
                    <div className="flex gap-2 justify-end">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(b.id)}
                        disabled={loadingId === b.id}
                      >{loadingId === b.id ? 'Deleting...' : 'Delete'}</button>
                      <button
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                        onClick={() => setDeleteId(null)}
                        disabled={loadingId === b.id}
                      >Cancel</button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
