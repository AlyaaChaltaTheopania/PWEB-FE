import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Handle navigation click with cursor effect
  const handleNavClick = (event, path) => {
    event.preventDefault();
    
    const rect = event.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX,
      y: event.clientY
    });
    setClickedItem(path);
    
    // Navigate to the path
    navigate(path);
    
    // Remove the effect after animation
    setTimeout(() => {
      setClickedItem(null);
    }, 600);
  };

  // Handle logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
    closeMobileMenu();
  };

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    setShowLogoutSuccess(true);
    
    setTimeout(() => {
      setShowLogoutSuccess(false);
      // Navigate to login page
      navigate('/');
    }, 2000);
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  // Navigation links - Updated to match your routes
  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/barang', label: 'Item' },
    { to: '/loan', label: 'Loan' },
    { to: '/detailpeminjaman', label: 'Details' }
  ];

  // Hamburger menu items
  const hamburgerMenuItems = [
    { 
      to: '#', 
      label: 'Sign Out', 
      icon: LogOut,
      onClick: handleLogoutClick
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes shimmer-wave {
          0% {
            background-position: -200% 0;
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            background-position: 200% 0;
            opacity: 0.6;
          }
        }
        
        @keyframes glow-rotate {
          0% {
            box-shadow: 0 0 10px rgba(125, 211, 192, 0.4), 0 0 20px rgba(78, 205, 196, 0.3), 0 0 30px rgba(125, 211, 192, 0.2);
            transform: rotate(0deg) scale(1);
          }
          25% {
            box-shadow: 0 0 15px rgba(78, 205, 196, 0.5), 0 0 25px rgba(125, 211, 192, 0.4), 0 0 35px rgba(78, 205, 196, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(125, 211, 192, 0.6), 0 0 30px rgba(78, 205, 196, 0.5), 0 0 40px rgba(125, 211, 192, 0.4);
            transform: rotate(180deg) scale(1.02);
          }
          75% {
            box-shadow: 0 0 15px rgba(78, 205, 196, 0.5), 0 0 25px rgba(125, 211, 192, 0.4), 0 0 35px rgba(78, 205, 196, 0.3);
          }
          100% {
            box-shadow: 0 0 10px rgba(125, 211, 192, 0.4), 0 0 20px rgba(78, 205, 196, 0.3), 0 0 30px rgba(125, 211, 192, 0.2);
            transform: rotate(360deg) scale(1);
          }
        }
        
        @keyframes color-shift {
          0%, 100% { 
            background: linear-gradient(45deg, #8aded8, #4ECDC4, #7DD3C0);
          }
          25% { 
            background: linear-gradient(45deg, #4ECDC4, #7DD3C0, #8aded8);
          }
          50% { 
            background: linear-gradient(45deg, #7DD3C0, #8aded8, #4ECDC4);
          }
          75% { 
            background: linear-gradient(45deg, #8aded8, #7DD3C0, #4ECDC4);
          }
        }
        
        @keyframes floating {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          25% {
            transform: translateY(-2px) scale(1.01);
          }
          50% {
            transform: translateY(-4px) scale(1.02);
          }
          75% {
            transform: translateY(-2px) scale(1.01);
          }
        }
        
        @keyframes border-dance {
          0% {
            border-color: #7DD3C0;
            box-shadow: 0 0 0 0 rgba(125, 211, 192, 0.7);
          }
          25% {
            border-color: #4ECDC4;
            box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.3);
          }
          50% {
            border-color: #8aded8;
            box-shadow: 0 0 0 8px rgba(138, 222, 216, 0.2);
          }
          75% {
            border-color: #4ECDC4;
            box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.3);
          }
          100% {
            border-color: #7DD3C0;
            box-shadow: 0 0 0 0 rgba(125, 211, 192, 0.7);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-success {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes cursor-pointer-appear {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-15deg);
          }
          20% {
            opacity: 1;
            transform: scale(1.3) rotate(5deg);
          }
          40% {
            transform: scale(1.1) rotate(-3deg);
          }
          60% {
            transform: scale(1.2) rotate(2deg);
          }
          80% {
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.7) rotate(0deg);
          }
        }
        
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(125, 211, 192, 0.2) 0%,
            rgba(78, 205, 196, 0.4) 50%,
            rgba(125, 211, 192, 0.2) 100%
          );
          background-size: 200% 100%;
          animation: shimmer-wave 2s ease-in-out infinite;
        }
        
        .glow-rotate {
          animation: glow-rotate 3s ease-in-out infinite;
        }
        
        .color-shift {
          background-size: 300% 300%;
          animation: color-shift 4s ease-in-out infinite;
        }
        
        .floating-effect {
          animation: floating 3s ease-in-out infinite;
        }
        
        .border-dance {
          animation: border-dance 2.5s ease-in-out infinite;
        }

        .dialog-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .dialog-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        .pulse-success {
          animation: pulse-success 1s ease-in-out infinite;
        }

        .cursor-pointer-effect {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          font-size: 28px;
          animation: cursor-pointer-appear 0.6s ease-out forwards;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
        }
      `}</style>

      {/* Cursor Pointer Effect */}
      {clickedItem && (
        <div 
          className="cursor-pointer-effect"
          style={{
            left: `${cursorPosition.x - 14}px`,
            top: `${cursorPosition.y - 14}px`,
          }}
        >
          👆
        </div>
      )}

      <nav className="bg-[#096b68] shadow-md relative navbar-container">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Brand Name */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-2xl font-bold text-[#004d49] hover:text-[#7DD3C0] transition-colors duration-300"
              >
                <span className="text-[#90D1CA]">IT</span>
                <span className="text-[#FFFBDE]">Ventory</span>
              </Link>
            </div>
            
            {/* Right Side Container - Desktop Menu + Hamburger */}
            <div className="flex items-center space-x-4">
              {/* Desktop Menu */}
              <div className="hidden lg:flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={(e) => handleNavClick(e, link.to)}
                    className={`relative px-3 py-1 text-sm font-medium transition-all duration-300 transform border-2 rounded-full overflow-hidden cursor-pointer ${
                      isActiveRoute(link.to)
                        ? 'text-[#003d39] bg-gradient-to-b from-[#E8E4BB] to-[#D4D0A7] border-[#7DD3C0] shadow-lg scale-105 font-bold floating-effect border-dance'
                        : 'text-[#B4EBE6] border-transparent hover:text-[#096b68] hover:bg-gradient-to-r hover:from-[#7DD3C0] hover:to-[#4ECDC4] hover:scale-105 hover:shadow-lg hover:border-[#FFFBDE]'
                    }`}
                    style={isActiveRoute(link.to) ? {
                      textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
                    } : {}}
                  >
                    {link.label}
                    {/* Enhanced glow effects untuk active state */}
                    {isActiveRoute(link.to) && (
                      <>
                        {/* Shimmer wave effect sebagai pengganti animate-pulse */}
                        <div className="absolute top-0 left-0 right-0 bottom-0 shimmer-effect rounded-full"></div>
                        
                        {/* Floating color-shifting background */}
                        <div className="absolute top-0.5 left-0.5 right-0.5 bottom-0.5 color-shift opacity-20 rounded-full"></div>
                        
                        {/* Subtle outer glow ring */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#7DD3C0] via-[#4ECDC4] to-[#7DD3C0] rounded-full opacity-30 blur-sm"></div>
                      </>
                    )}
                  </Link>
                ))}
              </div>

              {/* Hamburger Button */}
              <div className="flex">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-[#096b68] hover:bg-gradient-to-r from-[#7DD3C0] to-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#7DD3C0] transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Toggle menu</span>
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 transition-transform duration-200 rotate-90" />
                  ) : (
                    <Menu className="w-6 h-6 transition-transform duration-200" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile/Hamburger Menu - Hanya Sign Out */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#096b68] border-t border-[#7DD3C0]">
              {hamburgerMenuItems.map((item) => {
                const IconComponent = item.icon;
                
                return (
                  <button
                    key={item.to}
                    onClick={item.onClick}
                    className="w-full flex items-center px-4 py-2 rounded-full text-base font-medium transition-all duration-300 text-left transform hover:scale-105 text-[#FFFBDE] hover:text-[#096b68] hover:bg-white hover:shadow-lg cursor-pointer"
                  >
                    <IconComponent className="w-5 h-5 mr-3 transition-colors duration-300 text-[#FFFBDE] hover:text-[#096b68]" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Dialog - Tanpa dark overlay */}
      {showLogoutDialog && (
        <div className="fixed top-75 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 dialog-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-2xl border-2 border-gray-200 dialog-slide-in">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <LogOut className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Konfirmasi Logout</h3>
            </div>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin keluar dari aplikasi?</p>
            <div className="flex space-x-3">
              <button
                onClick={handleLogoutCancel}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium cursor-pointer"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Success Message - Tanpa dark overlay */}
      {showLogoutSuccess && (
        <div className="fixed top-75 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 dialog-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-2xl border-2 border-green-200 dialog-slide-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 pulse-success">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Berhasil Logout</h3>
              <p className="text-gray-600">Anda akan dialihkan ke halaman login...</p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all duration-2000" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;