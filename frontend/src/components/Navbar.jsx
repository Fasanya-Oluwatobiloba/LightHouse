import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const [ active, isActive ] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Years for the dropdown (adjust as needed)
  const years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    active(true)
  };

  const toggleYearDropdown = () => {
    setYearDropdownOpen(!yearDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header 
      className="bg-white shadow-sm sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              LightHouse
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium transition-colors relative group ${
                    isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                  }`
                }
              >
                {item.name}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-600 transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </NavLink>
            ))}

            {/* Year Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleYearDropdown}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <span>Archive</span>
                <FiChevronDown className={`ml-1 transition-transform ${yearDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {yearDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                >
                  <div className="py-1">
                    {years.map((year) => (
                      <Link
                        key={year}
                        to={`/sermons?year=${year}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={() => setYearDropdownOpen(false)}
                      >
                        {year}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <NavLink
                  to="/admin/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/admin/login"
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                Admin Login
              </NavLink>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX size={24} className="text-indigo-600" />
            ) : (
              <FiMenu size={24} />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden py-4 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              {user ? (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    className="block px-4 py-3 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-base font-medium hover:from-indigo-700 hover:to-purple-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/admin/login"
                  className="block px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-base font-medium text-center hover:from-indigo-700 hover:to-purple-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}