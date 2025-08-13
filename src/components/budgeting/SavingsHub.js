import { useState, useEffect } from 'react';

const SavingsHub = ({ onDataUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, summaryRes] = await Promise.all([
        fetch('http://localhost:5000/api/savings/categories'),
        fetch('http://localhost:5000/api/savings/summary')
      ]);
      
      if (categoriesRes.ok && summaryRes.ok) {
        const categoriesData = await categoriesRes.json();
        const summaryData = await summaryRes.json();
        setCategories(categoriesData);
        setSummary(summaryData);
        onDataUpdate?.(summaryData);
      }
    } catch (error) {
      console.error('Failed to fetch savings data:', error);
    }
    setLoading(false);
  };

  const filteredCategories = categories.filter(cat => 
    filterPriority === 'all' || cat.priority.toString() === filterPriority
  );

  const priorityColors = {
    1: 'from-red-500 to-pink-500',
    2: 'from-blue-500 to-indigo-500',
    3: 'from-green-500 to-emerald-500'
  };

  const priorityLabels = {
    1: 'High Priority',
    2: 'Medium Priority',
    3: 'Low Priority'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin text-4xl">⏳</div>
        <span className="ml-3 text-indigo-600 font-semibold">Loading your savings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{summary.total_categories || 0}</div>
            <div className="text-indigo-200 text-sm">Active Goals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">${parseFloat(summary.total_saved || 0).toLocaleString()}</div>
            <div className="text-indigo-200 text-sm">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">${parseFloat(summary.total_target || 0).toLocaleString()}</div>
            <div className="text-indigo-200 text-sm">Total Target</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{parseFloat(summary.avg_progress || 0).toFixed(1)}%</div>
            <div className="text-indigo-200 text-sm">Avg Progress</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition font-semibold flex items-center gap-2"
          >
            <span>➕</span> New Savings Goal
          </button>
          
          <button
            onClick={() => setShowTransferModal(true)}
            disabled={categories.length < 2}
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>🔄</span> Transfer Money
          </button>
        </div>

        <div className="flex gap-4 items-center">
          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Categories Display */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Savings Goals Yet</h3>
          <p className="text-gray-500 mb-4">Start building your financial future by creating your first savings goal!</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredCategories.map((category) => (
            <SavingsCategoryCard
              key={category.id}
              category={category}
              onUpdate={fetchData}
              onSelect={() => setSelectedCategory(category)}
              viewMode={viewMode}
              priorityColor={priorityColors[category.priority]}
              priorityLabel={priorityLabels[category.priority]}
            />
          ))}
        </div>
      )}

      {/* Recent Transactions */}
      {summary.recent_transactions?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📊</span> Recent Activity
          </h3>
          <div className="space-y-3">
            {summary.recent_transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{transaction.category_icon}</span>
                  <div>
                    <div className="font-semibold text-sm">{transaction.category_name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${parseFloat(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateCategoryModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchData}
        />
      )}

      {showTransferModal && (
        <TransferModal
          categories={categories}
          onClose={() => setShowTransferModal(false)}
          onSuccess={fetchData}
        />
      )}

      {selectedCategory && (
        <CategoryDetailModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onUpdate={fetchData}
        />
      )}
    </div>
  );
};

// Individual Category Card Component
const SavingsCategoryCard = ({ category, onUpdate, onSelect, viewMode, priorityColor, priorityLabel }) => {
  const [showActions, setShowActions] = useState(false);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const progress = Math.min((category.current_amount / category.target_amount) * 100, 100);
  const isCompleted = progress >= 100;
  const remaining = Math.max(category.target_amount - category.current_amount, 0);

  const handleQuickAdd = async (e) => {
    e.stopPropagation();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

    setLoading(true);
    try {
      await fetch(`http://localhost:5000/api/savings/categories/${category.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });
      setAmount('');
      onUpdate();
    } catch (error) {
      console.error('Failed to add money:', error);
    }
    setLoading(false);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow cursor-pointer"
           onClick={onSelect}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl" style={{ color: category.color }}>{category.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{category.name}</h3>
              <p className="text-sm text-gray-500">{priorityLabel}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl text-indigo-700">
              ${parseFloat(category.current_amount).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              of ${parseFloat(category.target_amount).toLocaleString()}
            </div>
            <div className="text-sm font-semibold" style={{ color: category.color }}>
              {progress.toFixed(1)}% Complete
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onSelect}
      style={{ borderTop: `4px solid ${category.color}` }}
    >
      {/* Priority Badge */}
      <div className={`bg-gradient-to-r ${priorityColor} text-white text-xs px-3 py-1 text-center font-semibold`}>
        {priorityLabel}
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{category.icon}</div>
          <h3 className="font-bold text-lg text-gray-800">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
          )}
        </div>

        {/* Progress Ring */}
        <div className="relative mb-4 flex justify-center">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              stroke={category.color}
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-bold text-sm" style={{ color: category.color }}>
                {progress.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Amount Display */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-indigo-700">
            ${parseFloat(category.current_amount).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            Goal: ${parseFloat(category.target_amount).toLocaleString()}
          </div>
          {!isCompleted && (
            <div className="text-xs text-gray-400 mt-1">
              ${remaining.toLocaleString()} remaining
            </div>
          )}
        </div>

        {/* Target Date */}
        {category.target_date && (
          <div className="text-center mb-4">
            <div className="text-xs text-gray-500">
              Target: {new Date(category.target_date).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Achievement Badge */}
        {isCompleted && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 text-center mb-4">
            <div className="text-xl">🎉</div>
            <div className="text-yellow-800 font-semibold text-xs">Goal Achieved!</div>
          </div>
        )}

        {/* Quick Add */}
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Quick add $"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={loading}
            />
            <button
              onClick={handleQuickAdd}
              disabled={loading || !amount}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold text-sm"
            >
              {loading ? '⏳' : '💰'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Category Modal Component
const CreateCategoryModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '💰',
    color: '#6366f1',
    target_amount: '',
    target_date: '',
    priority: 2
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const commonIcons = ['💰', '📱', '🏠', '🚗', '✈️', '🎓', '👔', '💍', '🎮', '📚', '🏥', '🎯'];
  const commonColors = ['#6366f1', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/savings/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          target_amount: parseFloat(formData.target_amount)
        }),
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create category');
      }
    } catch (error) {
      setError('Failed to create category');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Create Savings Goal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">✕</button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., iPhone 15, Emergency Fund"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Why is this goal important to you?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
              <div className="grid grid-cols-6 gap-2 mb-2">
                {commonIcons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    className={`text-xl p-2 rounded border ${formData.icon === icon ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {commonColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded border-2 ${formData.color === color ? 'border-gray-800' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.target_amount}
              onChange={(e) => setFormData(prev => ({ ...prev, target_amount: e.target.value }))}
              placeholder="1000.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Date (Optional)</label>
            <input
              type="date"
              value={formData.target_date}
              onChange={(e) => setFormData(prev => ({ ...prev, target_date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1}>High Priority</option>
              <option value={2}>Medium Priority</option>
              <option value={3}>Low Priority</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Transfer Modal Component
const TransferModal = ({ categories, onClose, onSuccess }) => {
  const [fromCategory, setFromCategory] = useState('');
  const [toCategory, setToCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/savings/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_category_id: parseInt(fromCategory),
          to_category_id: parseInt(toCategory),
          amount: parseFloat(amount),
          description
        }),
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to transfer money');
      }
    } catch (error) {
      setError('Failed to transfer money');
    }
    setLoading(false);
  };

  const fromCat = categories.find(c => c.id.toString() === fromCategory);
  const maxTransfer = fromCat ? parseFloat(fromCat.current_amount) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Transfer Money</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">✕</button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Category</label>
            <select
              value={fromCategory}
              onChange={(e) => setFromCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select source category</option>
              {categories.filter(c => c.current_amount > 0).map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name} (${parseFloat(category.current_amount).toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Category</label>
            <select
              value={toCategory}
              onChange={(e) => setToCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select destination category</option>
              {categories.filter(c => c.id.toString() !== fromCategory).map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ${maxTransfer > 0 && `(Max: $${maxTransfer.toLocaleString()})`}
            </label>
            <input
              type="number"
              min="0"
              max={maxTransfer}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Reason for transfer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !fromCategory || !toCategory || !amount}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Transferring...' : 'Transfer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Category Detail Modal Component
const CategoryDetailModal = ({ category, onClose, onUpdate }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [actionType, setActionType] = useState('add');

  useEffect(() => {
    fetchTransactions();
  }, [category.id]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/savings/categories/${category.id}/transactions?limit=20`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
    setLoading(false);
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    try {
      const response = await fetch(`http://localhost:5000/api/savings/categories/${category.id}/${actionType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount), description }),
      });

      if (response.ok) {
        setAmount('');
        setDescription('');
        onUpdate();
        fetchTransactions();
      }
    } catch (error) {
      console.error('Failed to process transaction:', error);
    }
  };

  const progress = Math.min((category.current_amount / category.target_amount) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
              {category.description && (
                <p className="text-sm text-gray-500">{category.description}</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">✕</button>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">${parseFloat(category.current_amount).toLocaleString()}</div>
              <div className="text-sm text-gray-500">Current</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">${parseFloat(category.target_amount).toLocaleString()}</div>
              <div className="text-sm text-gray-500">Target</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: category.color }}>{progress.toFixed(1)}%</div>
              <div className="text-sm text-gray-500">Progress</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: category.color }}
            />
          </div>
        </div>

        {/* Transaction Form */}
        <form onSubmit={handleTransaction} className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setActionType('add')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold ${actionType === 'add' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Add Money
            </button>
            <button
              type="button"
              onClick={() => setActionType('remove')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold ${actionType === 'remove' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Remove Money
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="number"
              min="0"
              max={actionType === 'remove' ? category.current_amount : undefined}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg font-semibold text-white ${actionType === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {actionType === 'add' ? 'Add' : 'Remove'}
            </button>
          </div>
        </form>

        {/* Transaction History */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Transaction History</h3>
          {loading ? (
            <div className="text-center py-4">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No transactions yet</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-sm">
                      {transaction.type === 'deposit' ? '💰 Deposit' : '💸 Withdrawal'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.created_at).toLocaleString()}
                    </div>
                    {transaction.description && (
                      <div className="text-xs text-gray-600 mt-1">{transaction.description}</div>
                    )}
                  </div>
                  <div className={`font-bold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${parseFloat(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsHub;
