import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  Search,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  UserPlus,
  Mail,
  Phone,
  Shield,
  User,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock user data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '081234567890', role: 'USER', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '081234567891', role: 'USER', status: 'Active', joinDate: '2024-01-20' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '081234567892', role: 'ADMIN', status: 'Active', joinDate: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '081234567893', role: 'USER', status: 'Inactive', joinDate: '2024-01-25' },
  ]);

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admindashboard', active: false },
    { icon: Users, label: 'User Management', path: '/usermanagement', active: true },
    { icon: Package, label: 'Inventory', path: '/inventorymanagement', active: false },
    { icon: ClipboardList, label: 'Loan Management', path: '/loanmanagement', active: false },
    { icon: TrendingUp, label: 'Reports', path: '/reports', active: false },
    { icon: Settings, label: 'Settings', path: '/settings', active: false },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
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
                  <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-[#096B68]">User Management</h1>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#096B68] text-white px-4 py-2 rounded-xl hover:bg-[#90D1CA] hover:text-[#096B68] transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Search Bar */}
              <div className="mb-6 animate-fadeInUp">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden animate-fadeInUp delay-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#096B68] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#90D1CA] to-[#096B68] rounded-full flex items-center justify-center mr-3">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-gray-600">
                                <Mail className="w-4 h-4 mr-2" />
                                {user.email}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Phone className="w-4 h-4 mr-2" />
                                {user.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === 'ADMIN' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              <Shield className="w-3 h-3 mr-1" />
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setSelectedUser(user)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 animate-fadeInUp delay-300">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-[#096B68]">{users.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Users</p>
                      <p className="text-2xl font-bold text-[#096B68]">{users.filter(u => u.status === 'Active').length}</p>
                    </div>
                    <UserPlus className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Admins</p>
                      <p className="text-2xl font-bold text-[#096B68]">{users.filter(u => u.role === 'ADMIN').length}</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">New This Month</p>
                      <p className="text-2xl font-bold text-[#096B68]">12</p>
                    </div>
                    <UserPlus className="w-8 h-8 text-orange-600" />
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

export default UserManagement;