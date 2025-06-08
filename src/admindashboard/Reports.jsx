import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Menu,
  X,
  PieChart,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

   const sidebarItems = [
      { icon: BarChart3, label: 'Dashboard', path: '/admindashboard' },
      { icon: Users, label: 'User Management', path: '/usermanagement' },
      { icon: Package, label: 'Inventory', path: '/inventorymanagement' },
      { icon: ClipboardList, label: 'Loan Management', path: '/loanmanagement' },
      { icon: TrendingUp, label: 'Reports', path: '/reports', active: true },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ];

  // Mock data for reports
  const reportData = {
    overview: {
      totalLoans: 156,
      activeLoans: 23,
      completedLoans: 133,
      overdueLoans: 8,
      totalUsers: 89,
      totalItems: 67,
      utilizationRate: 78
    },
    monthlyTrends: [
      { month: 'Jan', loans: 45, returns: 42 },
      { month: 'Feb', loans: 52, returns: 48 },
      { month: 'Mar', loans: 38, returns: 41 },
      { month: 'Apr', loans: 61, returns: 58 },
      { month: 'May', loans: 49, returns: 52 },
      { month: 'Jun', loans: 67, returns: 63 }
    ],
    popularItems: [
      { name: 'Laptop Asus ROG', category: 'Electronics', loans: 45, utilization: 89 },
      { name: 'Microphone Wireless', category: 'Audio', loans: 38, utilization: 76 },
      { name: 'Projector', category: 'Electronics', loans: 32, utilization: 64 },
      { name: 'Speaker TOA', category: 'Audio', loans: 28, utilization: 56 },
      { name: 'Tripod Camera', category: 'Accessories', loans: 24, utilization: 48 }
    ],
    categoryBreakdown: [
      { category: 'Electronics', count: 25, percentage: 37 },
      { category: 'Audio', count: 18, percentage: 27 },
      { category: 'Furniture', count: 15, percentage: 22 },
      { category: 'Accessories', count: 9, percentage: 14 }
    ]
  };

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const reportTypes = [
    { value: 'overview', label: 'Overview', icon: BarChart3 },
    { value: 'inventory', label: 'Inventory Report', icon: Package },
    { value: 'loans', label: 'Loan Report', icon: ClipboardList },
    { value: 'users', label: 'User Report', icon: Users }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <div 
        className="min-h-screen"
        style={{
          backgroundImage: "url('fixbg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-85 backdrop-blur-sm"></div>
        
        <div className="relative z-10 flex">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#096B68] bg-opacity-95 backdrop-blur-sm transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-[#90D1CA] border-opacity-30">
              <Link to="/admindashboard" className="text-2xl font-bold">
                <span className="text-[#90D1CA]">IT</span>
                <span className="text-[#FFFBDE]">Ventory</span>
                <span className="text-[#90D1CA] text-sm ml-2">Admin</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-[#90D1CA] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="mt-8 px-4">
              {sidebarItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300 animate-slideInLeft delay-${index * 100} ${
                      item.active 
                        ? 'bg-[#90D1CA] text-[#096B68] shadow-lg transform scale-105' 
                        : 'text-[#FFFBDE] hover:bg-[#90D1CA] hover:bg-opacity-20 hover:text-[#90D1CA]'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {/* Top Bar */}
            <div className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm border-b border-gray-200">
              <div className="flex items-center justify-between h-16 px-6">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-gray-600 hover:text-[#096B68] transition-colors"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-[#096B68]">Reports & Analytics</h1>
                </div>
                <button className="bg-[#096B68] text-white px-4 py-2 rounded-xl hover:bg-[#90D1CA] hover:text-[#096B68] transition-all duration-300 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fadeInUp">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="w-full px-4 py-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                  >
                    {reportTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full px-4 py-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                  >
                    {periods.map(period => (
                      <option key={period.value} value={period.value}>{period.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeInUp delay-100">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Loans</p>
                      <p className="text-3xl font-bold text-[#096B68] mt-1">{reportData.overview.totalLoans}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <ClipboardList className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+12% from last period</span>
                  </div>
                </div>

                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Active Loans</p>
                      <p className="text-3xl font-bold text-[#096B68] mt-1">{reportData.overview.activeLoans}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-yellow-600">
                    <Activity className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Currently active</span>
                  </div>
                </div>

                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Utilization Rate</p>
                      <p className="text-3xl font-bold text-[#096B68] mt-1">{reportData.overview.utilizationRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <PieChart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+5% efficiency</span>
                  </div>
                </div>

                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Completed Loans</p>
                      <p className="text-3xl font-bold text-[#096B68] mt-1">{reportData.overview.completedLoans}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">85% return rate</span>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Monthly Trends Chart */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-fadeInUp delay-200">
                  <h3 className="text-xl font-bold text-[#096B68] mb-6">Monthly Loan Trends</h3>
                  <div className="space-y-4">
                    {reportData.monthlyTrends.map((month, index) => (
                      <div key={month.month} className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium w-12">{month.month}</span>
                        <div className="flex-1 mx-4">
                          <div className="flex space-x-2">
                            <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#90D1CA] to-[#096B68] transition-all duration-500"
                                  style={{ width: `${(month.loans / 70) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                                  style={{ width: `${(month.returns / 70) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-[#096B68] font-semibold">{month.loans}</div>
                          <div className="text-sm text-green-600 font-semibold">{month.returns}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#90D1CA] to-[#096B68] rounded-full mr-2"></div>
                      <span className="text-gray-600">Loans</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-2"></div>
                      <span className="text-gray-600">Returns</span>
                    </div>
                  </div>
                </div>

                {/* Popular Items */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-fadeInUp delay-300">
                  <h3 className="text-xl font-bold text-[#096B68] mb-6">Most Popular Items</h3>
                  <div className="space-y-4">
                    {reportData.popularItems.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#90D1CA] to-[#096B68] rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-gray-500 text-sm">{item.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#096B68]">{item.loans} loans</p>
                          <p className="text-gray-500 text-sm">{item.utilization}% utilization</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-fadeInUp delay-400">
                <h3 className="text-xl font-bold text-[#096B68] mb-6">Inventory by Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {reportData.categoryBreakdown.map((category) => (
                    <div key={category.category} className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#90D1CA] to-[#096B68] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{category.category}</h4>
                      <p className="text-2xl font-bold text-[#096B68] mb-1">{category.count}</p>
                      <p className="text-gray-500 text-sm">{category.percentage}% of total</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;