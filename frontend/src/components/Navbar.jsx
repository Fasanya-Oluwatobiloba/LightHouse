import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header 
      className="bg-white shadow-sm sticky top-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-800">
            LightHouse
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/admin/dashboard"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/admin/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Admin Login
              </NavLink>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden py-4 space-y-2"
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
                  `block px-3 py-2 text-base font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={
                      logout}
                    className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/admin/login"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 text-center"
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