import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  Search,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  Menu,
  X,
  Eye,
  Check,
  XCircle,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LoanManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock loan data
  const [loans, setLoans] = useState([
    {
      id: 1,
      user: 'John Doe',
      email: 'john@example.com',
      item: 'Laptop Asus ROG',
      category: 'Electronics',
      quantity: 1,
      loanDate: '2024-01-15',
      returnDate: '2024-01-22',
      actualReturnDate: null,
      status: 'Active',
      notes: 'For presentation project'
    },
    {
      id: 2,
      user: 'Jane Smith',
      email: 'jane@example.com',
      item: 'Microphone Wireless',
      category: 'Audio',
      quantity: 2,
      loanDate: '2024-01-10',
      returnDate: '2024-01-17',
      actualReturnDate: '2024-01-16',
      status: 'Returned',
      notes: 'Event recording'
    },
    {
      id: 3,
      user: 'Bob Wilson',
      email: 'bob@example.com',
      item: 'Projector',
      category: 'Electronics',
      quantity: 1,
      loanDate: '2024-01-05',
      returnDate: '2024-01-12',
      actualReturnDate: null,
      status: 'Overdue',
      notes: 'Conference presentation'
    },
    {
      id: 4,
      user: 'Alice Brown',
      email: 'alice@example.com',
      item: 'Speaker TOA',
      category: 'Audio',
      quantity: 3,
      loanDate: '2024-01-20',
      returnDate: '2024-01-27',
      actualReturnDate: null,
      status: 'Active',
      notes: 'Outdoor event'
    }
  ]);

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admindashboard', active: false },
    { icon: Users, label: 'User Management', path: '/usermanagement', active: false },
    { icon: Package, label: 'Inventory', path: '/inventorymanagement', active: false },
    { icon: ClipboardList, label: 'Loan Management', path: '/loanmanagement', active: true },
    { icon: TrendingUp, label: 'Reports', path: '/reports', active: false },
    { icon: Settings, label: 'Settings', path: '/settings', active: false },
  ];

  const statuses = ['all', 'Active', 'Returned', 'Overdue', 'Pending'];

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Returned': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return Clock;
      case 'Returned': return CheckCircle;
      case 'Overdue': return AlertTriangle;
      case 'Pending': return Clock;
      default: return Clock;
    }
  };

  const handleApproveReturn = (loanId) => {
    setLoans(loans.map(loan => 
      loan.id === loanId 
        ? { ...loan, status: 'Returned', actualReturnDate: new Date().toISOString().split('T')[0] }
        : loan
    ));
  };

  const isOverdue = (returnDate, status) => {
    if (status === 'Returned') return false;
    const today = new Date();
    const dueDate = new Date(returnDate);
    return today > dueDate;
  };

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
                  <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-[#096B68]">Loan Management</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {loans.filter(l => l.status === 'Overdue').length} overdue loans
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fadeInUp">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by user, item, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Loans Table */}
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden animate-fadeInUp delay-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#096B68] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Borrower</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Item</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Dates</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredLoans.map((loan) => {
                        const StatusIcon = getStatusIcon(loan.status);
                        const overdue = isOverdue(loan.returnDate, loan.status);
                        
                        return (
                          <tr key={loan.id} className={`hover:bg-gray-50 transition-colors duration-200 ${overdue ? 'bg-red-50' : ''}`}>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#90D1CA] to-[#096B68] rounded-full flex items-center justify-center mr-3">
                                  <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{loan.user}</p>
                                  <p className="text-gray-500 text-sm">{loan.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">{loan.item}</p>
                                <p className="text-gray-500 text-sm">{loan.category} • Qty: {loan.quantity}</p>
                                {loan.notes && <p className="text-gray-400 text-xs mt-1">{loan.notes}</p>}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="flex items-center text-sm">
                                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                  <span className="text-gray-600">Loan: {new Date(loan.loanDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                  <span className={`${overdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                    Due: {new Date(loan.returnDate).toLocaleDateString()}
                                  </span>
                                </div>
                                {loan.actualReturnDate && (
                                  <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                    <span className="text-green-600">Returned: {new Date(loan.actualReturnDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {loan.status}
                              </span>
                              {overdue && loan.status !== 'Returned' && (
                                <div className="mt-1">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Overdue
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                                  <Eye className="w-4 h-4" />
                                </button>
                                {loan.status === 'Active' && (
                                  <button
                                    onClick={() => handleApproveReturn(loan.id)}
                                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                )}
                                {loan.status === 'Pending' && (
                                  <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 animate-fadeInUp delay-300">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Loans</p>
                      <p className="text-2xl font-bold text-[#096B68]">{loans.length}</p>
                    </div>
                    <ClipboardList className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Loans</p>
                      <p className="text-2xl font-bold text-[#096B68]">{loans.filter(l => l.status === 'Active').length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Overdue</p>
                      <p className="text-2xl font-bold text-[#096B68]">{loans.filter(l => l.status === 'Overdue').length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Returned</p>
                      <p className="text-2xl font-bold text-[#096B68]">{loans.filter(l => l.status === 'Returned').length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanManagement;