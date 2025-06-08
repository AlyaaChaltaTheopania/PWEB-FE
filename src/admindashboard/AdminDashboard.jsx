import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for dashboard statistics
  const stats = {
    totalUsers: 156,
    totalItems: 89,
    activeLoans: 23,
    pendingReturns: 8,
    availableItems: 66,
    overdueLoans: 3
  };

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Borrowed Laptop Asus ROG', time: '2 hours ago', type: 'loan' },
    { id: 2, user: 'Jane Smith', action: 'Returned Microphone', time: '4 hours ago', type: 'return' },
    { id: 3, user: 'Admin', action: 'Added new Speaker', time: '6 hours ago', type: 'inventory' },
    { id: 4, user: 'Bob Wilson', action: 'Borrowed Tripod', time: '1 day ago', type: 'loan' },
  ];

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admindashboard', active: true },
    { icon: Users, label: 'User Management', path: '/usermanagement' },
    { icon: Package, label: 'Inventory', path: '/inventorymanagement' },
    { icon: ClipboardList, label: 'Loan Management', path: '/loanmanagement' },
    { icon: TrendingUp, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

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
        {/* Background Overlay */}
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
                  <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-[#096B68]">Admin Dashboard</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">Welcome back,</p>
                    <p className="text-lg font-bold text-[#096B68]">Administrator</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#90D1CA] to-[#096B68] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Total Users */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp delay-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Users</p>
                      <p className="text-3xl font-bold text-[#096B68] mt-1">{stats.totalUsers}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+12% from last month</span>
                  </div>
                </div>

                {/* Total Items */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp delay-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Items</p>
                      <p className="text-3xl font-bold text-[#096B68] mt-1">{stats.totalItems}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{stats.availableItems} available</span>
                  </div>
                </div>

                {/* Active Loans */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp delay-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Active Loans</p>
                      <p className="text-3xl font-bold text-[#096B68] mt-1">{stats.activeLoans}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{stats.overdueLoans} overdue</span>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-fadeInUp delay-400">
                <h2 className="text-xl font-bold text-[#096B68] mb-6">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        activity.type === 'loan' ? 'bg-blue-100' :
                        activity.type === 'return' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'loan' && <ClipboardList className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'return' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {activity.type === 'inventory' && <Package className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.user}</p>
                        <p className="text-gray-600 text-sm">{activity.action}</p>
                      </div>
                      <span className="text-gray-500 text-sm">{activity.time}</span>
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

export default AdminDashboard;