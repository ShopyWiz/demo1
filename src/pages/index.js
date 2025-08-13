import Link from 'next/link';
import { useState } from 'react';

const HomePage = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // TODO: Add email signup logic
    alert('Thanks for your interest! We\'ll be in touch soon.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <span className="text-2xl font-bold text-indigo-800">ShopyWiz</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600">About</a>
              <Link href="/budgeting" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            All-in-One <span className="text-indigo-600">Financial Hub</span><br/>
            for E-commerce Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop juggling multiple apps. ShopyWiz brings budgeting, expense tracking, sales analytics, 
            and tax calculations into one powerful platform designed for online store owners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/budgeting" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition shadow-lg">
              Start Free Trial
            </Link>
            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">$2M+</div>
            <div className="text-gray-600">Revenue Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">500+</div>
            <div className="text-gray-600">Businesses Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-600">Powerful tools designed specifically for e-commerce businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Budget Management */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-indigo-100">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Budgeting</h3>
              <p className="text-gray-600 mb-4">
                Create detailed budgets with categories, set savings goals, and track your progress with beautiful visualizations.
              </p>
              <Link href="/budgeting" className="text-indigo-600 font-semibold hover:text-indigo-700">
                Try Budgeting →
              </Link>
            </div>

            {/* Expense Tracking */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expense Tracking</h3>
              <p className="text-gray-600 mb-4">
                Log expenses manually or upload receipts. Generate reports and identify spending patterns automatically.
              </p>
              <span className="text-green-600 font-semibold">Coming Soon →</span>
            </div>

            {/* Sales Analytics */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl border border-purple-100">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sales Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track income from multiple sources, monitor sales trends, and manage pending payments in one dashboard.
              </p>
              <span className="text-purple-600 font-semibold">Coming Soon →</span>
            </div>

            {/* Tax Calculator */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-orange-100">
              <div className="text-3xl mb-4">🧮</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tax Calculator</h3>
              <p className="text-gray-600 mb-4">
                Calculate taxes automatically with support for deductions, allowances, and generate tax reports.
              </p>
              <span className="text-orange-600 font-semibold">Coming Soon →</span>
            </div>

            {/* Account Management */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-100">
              <div className="text-3xl mb-4">🏦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Account Management</h3>
              <p className="text-gray-600 mb-4">
                Connect multiple bank accounts, track balances, and link accounts to your budgeting workflows.
              </p>
              <span className="text-pink-600 font-semibold">Coming Soon →</span>
            </div>

            {/* Shopify Integration */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-blue-100">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Shopify Integration</h3>
              <p className="text-gray-600 mb-4">
                Automatically sync sales data from your Shopify store for seamless financial tracking.
              </p>
              <span className="text-blue-600 font-semibold">Coming Soon →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Stop Using 5 Different Apps</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <span className="text-gray-700">Scattered financial data across multiple platforms</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <span className="text-gray-700">Manual data entry and reconciliation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <span className="text-gray-700">High monthly subscription costs</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <span className="text-gray-700">Complex integrations and setup</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-6">ShopyWiz Solution</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <span className="text-gray-700">All financial tools in one unified platform</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <span className="text-gray-700">Automated data sync and calculations</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <span className="text-gray-700">One affordable subscription for everything</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <span className="text-gray-700">Setup in minutes, not hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your business size</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-300 transition">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                <div className="text-gray-600 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Basic budgeting tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Expense tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Up to 50 transactions/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Basic reports</span>
                  </li>
                </ul>
                <button className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
                  Start Free
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-indigo-600 text-white rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <div className="text-4xl font-bold mb-2">$29</div>
                <div className="text-indigo-200 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Unlimited transactions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Tax calculator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Shopify integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                  Start Pro Trial
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-300 transition">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$99</div>
                <div className="text-gray-600 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Multi-user support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>White-label options</span>
                  </li>
                </ul>
                <button className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Simplify Your Finances?</h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join hundreds of e-commerce businesses that have streamlined their financial operations with ShopyWiz.
          </p>
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              required
            />
            <button
              type="submit"
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Get Started
            </button>
          </form>
          <p className="text-indigo-200 text-sm mt-4">No credit card required. Start your free trial today.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🛍️</span>
                <span className="text-xl font-bold">ShopyWiz</span>
              </div>
              <p className="text-gray-400">
                The all-in-one financial platform for e-commerce businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Budgeting</a></li>
                <li><a href="#" className="hover:text-white">Expenses</a></li>
                <li><a href="#" className="hover:text-white">Sales Analytics</a></li>
                <li><a href="#" className="hover:text-white">Tax Calculator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ShopyWiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
