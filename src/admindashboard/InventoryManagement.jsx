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
  AudioLines,
  ShoppingBag,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InventoryManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock inventory data
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Laptop Asus ROG', category: 'Electronics', quantity: 10, available: 8, status: 'Available', description: 'Gaming laptop high-end' },
    { id: 2, name: 'Microphone Wireless', category: 'Audio', quantity: 15, available: 12, status: 'Available', description: 'Professional wireless microphone' },
    { id: 3, name: 'Kursi Premium', category: 'Furniture', quantity: 25, available: 20, status: 'Available', description: 'Premium chairs for events' },
    { id: 4, name: 'Speaker TOA', category: 'Audio', quantity: 8, available: 0, status: 'Out of Stock', description: 'TOA brand speakers' },
    { id: 5, name: 'Tripod Camera', category: 'Accessories', quantity: 12, available: 8, status: 'Available', description: 'Professional camera tripod' },
    { id: 6, name: 'Projector', category: 'Electronics', quantity: 5, available: 0, status: 'Maintenance', description: 'HD projector for presentations' },
  ]);

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admindashboard', active: false },
    { icon: Users, label: 'User Management', path: '/usermanagement', active: false },
    { icon: Package, label: 'Inventory', path: '/inventorymanagement', active: true },
    { icon: ClipboardList, label: 'Loan Management', path: '/loanmanagement', active: false },
    { icon: TrendingUp, label: 'Reports', path: '/reports', active: false },
    { icon: Settings, label: 'Settings', path: '/settings', active: false },
  ];

  const categories = ['all', 'Electronics', 'Audio', 'Furniture', 'Accessories'];
  const statuses = ['all', 'Available', 'Out of Stock', 'Maintenance'];

  const categoryIcons = {
    Electronics: Package,
    Audio: AudioLines,
    Furniture: ShoppingBag,
    Accessories: Sparkles
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Available': return CheckCircle;
      case 'Out of Stock': return AlertTriangle;
      case 'Maintenance': return Clock;
      default: return Package;
    }
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== itemId));
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
                  <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-[#096B68]">Inventory Management</h1>
                </div>
                <button className="bg-[#096B68] text-white px-4 py-2 rounded-xl hover:bg-[#90D1CA] hover:text-[#096B68] transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fadeInUp">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
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

              {/* Inventory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fadeInUp delay-200">
                {filteredInventory.map((item) => {
                  const CategoryIcon = categoryIcons[item.category] || Package;
                  const StatusIcon = getStatusIcon(item.status);
                  
                  return (
                    <div key={item.id} className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#90D1CA] to-[#096B68] rounded-xl flex items-center justify-center mr-3">
                            <CategoryIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Quantity:</span>
                          <span className="font-semibold text-[#096B68]">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Available:</span>
                          <span className="font-semibold text-green-600">{item.available}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">In Use:</span>
                          <span className="font-semibold text-orange-600">{item.quantity - item.available}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {item.status}
                          </span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#90D1CA] to-[#096B68] transition-all duration-300"
                              style={{ width: `${(item.available / item.quantity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeInUp delay-300">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Items</p>
                      <p className="text-2xl font-bold text-[#096B68]">{inventory.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Available</p>
                      <p className="text-2xl font-bold text-[#096B68]">{inventory.filter(i => i.status === 'Available').length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Out of Stock</p>
                      <p className="text-2xl font-bold text-[#096B68]">{inventory.filter(i => i.status === 'Out of Stock').length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Maintenance</p>
                      <p className="text-2xl font-bold text-[#096B68]">{inventory.filter(i => i.status === 'Maintenance').length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
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

export default InventoryManagement;