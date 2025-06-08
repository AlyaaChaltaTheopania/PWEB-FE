import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  ClipboardList, 
  BarChart3, 
  Settings as SettingsIcon, 
  TrendingUp,
  Save,
  Bell,
  Shield,
  Database,
  Mail,
  Globe,
  Palette,
  Menu,
  X,
  User,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'ITVentory Admin',
      siteDescription: 'Inventory Management System for HIMATIF',
      timezone: 'Asia/Jakarta',
      language: 'id'
    },
    notifications: {
      emailNotifications: true,
      overdueReminders: true,
      lowStockAlerts: true,
      newUserRegistrations: true,
      systemUpdates: false
    },
    security: {
      requireStrongPasswords: true,
      sessionTimeout: 30,
      twoFactorAuth: false,
      loginAttempts: 5
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'admin@himatif.com',
      smtpPassword: '••••••••',
      fromEmail: 'noreply@himatif.com',
      fromName: 'ITVentory System'
    }
  });

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admindashboard' },
    { icon: Users, label: 'User Management', path: '/usermanagement' },
    { icon: Package, label: 'Inventory', path: '/inventorymanagement' },
    { icon: ClipboardList, label: 'Loan Management', path: '/loanmanagement' },
    { icon: TrendingUp, label: 'Reports', path: '/reports' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings', active: true },
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    alert('Settings saved successfully!');
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
        className="min-h-screen flex flex-col"
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
        
        <div className="relative z-10 flex flex-1 min-h-screen">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#096B68] bg-opacity-95 backdrop-blur-sm min-h-screen flex flex-col transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
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
            
            <nav className="mt-8 px-4 flex-1">
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
                  <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-[#096B68]">Settings</h1>
                </div>
                <button 
                  onClick={handleSave}
                  className="bg-[#096B68] text-white px-4 py-2 rounded-xl hover:bg-[#90D1CA] hover:text-[#096B68] transition-all duration-300 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Settings Tabs */}
                <div className="lg:w-64 animate-fadeInUp">
                  <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <nav className="space-y-2">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                              activeTab === tab.id
                                ? 'bg-[#096B68] text-white shadow-lg'
                                : 'text-gray-600 hover:bg-[#90D1CA] hover:bg-opacity-20 hover:text-[#096B68]'
                            }`}
                          >
                            <IconComponent className="w-5 h-5 mr-3" />
                            <span className="font-medium">{tab.label}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Settings Content */}
                <div className="flex-1 animate-fadeInUp delay-200">
                  <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    {/* General Settings */}
                    {activeTab === 'general' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[#096B68] mb-6">General Settings</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                            <input
                              type="text"
                              value={settings.general.siteName}
                              onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                            <select
                              value={settings.general.timezone}
                              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            >
                              <option value="Asia/Jakarta">Asia/Jakarta</option>
                              <option value="Asia/Singapore">Asia/Singapore</option>
                              <option value="UTC">UTC</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                          <textarea
                            value={settings.general.siteDescription}
                            onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[#096B68] mb-6">Notification Settings</h2>
                        
                        <div className="space-y-4">
                          {Object.entries(settings.notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div>
                                <h3 className="font-medium text-gray-900 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  {key === 'emailNotifications' && 'Receive email notifications for system events'}
                                  {key === 'overdueReminders' && 'Send reminders for overdue loans'}
                                  {key === 'lowStockAlerts' && 'Alert when inventory is running low'}
                                  {key === 'newUserRegistrations' && 'Notify when new users register'}
                                  {key === 'systemUpdates' && 'Receive notifications about system updates'}
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#90D1CA] peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#096B68]"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[#096B68] mb-6">Security Settings</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                            <input
                              type="number"
                              value={settings.security.sessionTimeout}
                              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                            <input
                              type="number"
                              value={settings.security.loginAttempts}
                              onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <h3 className="font-medium text-gray-900">Require Strong Passwords</h3>
                              <p className="text-gray-500 text-sm">Enforce password complexity requirements</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.security.requireStrongPasswords}
                                onChange={(e) => handleSettingChange('security', 'requireStrongPasswords', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#90D1CA] peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#096B68]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                              <p className="text-gray-500 text-sm">Require 2FA for admin accounts</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.security.twoFactorAuth}
                                onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#90D1CA] peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#096B68]"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Email Settings */}
                    {activeTab === 'email' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[#096B68] mb-6">Email Configuration</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                            <input
                              type="text"
                              value={settings.email.smtpHost}
                              onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                            <input
                              type="number"
                              value={settings.email.smtpPort}
                              onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                            <input
                              type="email"
                              value={settings.email.smtpUsername}
                              onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={settings.email.smtpPassword}
                                onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                            <input
                              type="email"
                              value={settings.email.fromEmail}
                              onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                            <input
                              type="text"
                              value={settings.email.fromName}
                              onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90D1CA] focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Other tabs can be implemented similarly */}
                    {activeTab === 'appearance' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[#096B68] mb-6">Appearance Settings</h2>
                        <div className="text-center py-12">
                          <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Appearance settings coming soon...</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'backup' && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[#096B68] mb-6">Backup & Restore</h2>
                        <div className="text-center py-12">
                          <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Backup settings coming soon...</p>
                        </div>
                      </div>
                    )}
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

export default Settings;