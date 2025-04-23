"use client"
import { useState } from "react";
import {
  CreditCard,
  PieChart,
  TrendingUp,
  User,
  CheckCircle,
  Menu,
  X,
  Shield,
  Clock,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

export default function ExpenseTrackerLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    alert(`Thank you for your interest! We'll send updates to ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                SpendWise
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                FAQ
              </a>
              <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Sign Up Free
              </Link>
              <Link href="/login" className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors">
                Log In
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
              >
                FAQ
              </a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Sign Up Free
              </button>
              <button className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors">
                Log In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Track Expenses Effortlessly, Save Money Effectively
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-indigo-100">
                SpendWise helps you gain control of your finances with smart
                expense tracking, budgeting tools, and actionable insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors">
                  Start For Free
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center text-sm">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>No credit card required</span>
                <span className="mx-3">•</span>
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Free 14-day trial</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-lg shadow-xl p-2">
                <img
                  src="/api/placeholder/600/400"
                  alt="SpendWise Dashboard"
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mb-6">
            Trusted by 10,000+ users worldwide
          </p>
          <div className="flex justify-center flex-wrap gap-8 opacity-70">
            <img src="/api/placeholder/120/30" alt="Company logo" />
            <img src="/api/placeholder/120/30" alt="Company logo" />
            <img src="/api/placeholder/120/30" alt="Company logo" />
            <img src="/api/placeholder/120/30" alt="Company logo" />
            <img src="/api/placeholder/120/30" alt="Company logo" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Features that make money management easy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SpendWise gives you all the tools you need to track, budget, and
              optimize your personal or business finances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-6">
                <PieChart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expense Analytics</h3>
              <p className="text-gray-600">
                Get visual breakdowns of your spending habits with intuitive
                charts and reports to help you understand where your money goes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-6">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Budgeting</h3>
              <p className="text-gray-600">
                Create customized budgets by category. Receive alerts when
                you're nearing your spending limits to stay on track with your
                goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-6">
                <Smartphone className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Mobile Access</h3>
              <p className="text-gray-600">
                Track expenses on the go with our mobile app. Snap pictures of
                receipts for automatic expense logging.
              </p>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Understand your spending habits at a glance
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our intuitive dashboard gives you a complete picture of your
                  financial health with customizable reports and visualizations.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Categorize transactions automatically using AI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      Compare spending month-over-month to track progress
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      Identify spending patterns and opportunities to save
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <img
                  src="/api/placeholder/600/400"
                  alt="Dashboard analytics"
                  className="rounded-md shadow-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="order-2 lg:order-1 bg-gray-100 p-4 rounded-lg">
                <img
                  src="/api/placeholder/600/400"
                  alt="Budgeting tools"
                  className="rounded-md shadow-md"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Set budgets that actually work for you
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Create personalized budgets for different categories and track
                  your progress in real-time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      Create custom budget categories that match your lifestyle
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      Get notified when you're approaching budget limits
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      Adjust budgets over time based on your changing needs
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for your financial needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gray-400">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Up to 50 transactions per month</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Basic expense categories</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Monthly summary reports</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                Start Free
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-indigo-600 transform md:scale-105 md:-translate-y-2">
              <div className="bg-indigo-100 text-indigo-700 text-sm font-semibold py-1 px-3 rounded-full inline-block mb-2">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Plus</h3>
              <p className="text-gray-600 mb-6">
                For individuals serious about finances
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Unlimited transactions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Custom categories & tags</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Advanced reporting & analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Budgeting tools</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Receipt scanning</span>
                </li>
              </ul>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
                Start 14-Day Trial
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gray-800">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">
                For families & small businesses
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Everything in Plus</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Multiple users (up to 5)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Expense approvals workflow</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Tax categorization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors">
                Start 14-Day Trial
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by users worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers are saying about how SpendWise has
              transformed their financial management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 rounded-full p-2 mr-3">
                  <User className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-gray-600">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "SpendWise has completely changed how I manage my freelance
                income. I can now see exactly where my money goes and set
                realistic savings goals. The tax categorization feature is a
                lifesaver during tax season!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 rounded-full p-2 mr-3">
                  <User className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-600">Family of Four</p>
                </div>
              </div>
              <p className="text-gray-600">
                "My wife and I were struggling to keep our family budget on
                track until we found SpendWise. The shared account feature lets
                us both track expenses, and the automatic categorization saves
                us hours of manual entry every month."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 rounded-full p-2 mr-3">
                  <User className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Alex K.</h4>
                  <p className="text-sm text-gray-600">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Running a small business means keeping a close eye on expenses.
                SpendWise Pro has simplified our expense tracking and reporting.
                The approval workflow ensures every purchase is accounted for
                properly."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Have questions about SpendWise? We've got answers.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                How secure is my financial data?
              </h3>
              <p className="text-gray-600">
                SpendWise uses bank-level 256-bit encryption to protect your
                data. We never store your bank credentials on our servers, and
                we use secure OAuth connections to your financial institutions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                Can I import data from my bank or credit card?
              </h3>
              <p className="text-gray-600">
                Yes! SpendWise connects with over 10,000 financial institutions
                worldwide. You can automatically import transactions from your
                bank accounts, credit cards, and payment services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                Can I use SpendWise on my phone?
              </h3>
              <p className="text-gray-600">
                Absolutely. SpendWise has mobile apps for both iOS and Android.
                You can track expenses on the go, take pictures of receipts for
                automatic entry, and check your budget anytime, anywhere.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                What if I need to cancel my subscription?
              </h3>
              <p className="text-gray-600">
                No problem. You can cancel your subscription anytime from your
                account settings. We don't lock you in with long-term contracts,
                and we offer a 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to take control of your finances?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are saving more and spending smarter
            with SpendWise.
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 rounded-md flex-grow text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors"
            >
              Start Free Trial
            </button>
          </form>
          <div className="mt-6 flex justify-center items-center text-sm">
            <Shield className="h-5 w-5 mr-2" />
            <span>
              Your data is secure. We'll never share your information.
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-lg font-bold">SpendWise</span>
              </div>
              <p className="text-gray-400 mb-4">
                The smarter way to track expenses and manage your finances.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
