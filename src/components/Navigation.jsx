import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/find-cars', label: 'Find Cars' },
    { path: '/about', label: 'About' },
  ];

  const authLinks = [
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Sign Up' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">SPINZ</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-primary-100 hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                    {currentUser.email?.[0].toUpperCase() || 'U'}
                  </div>
                  <span>{currentUser.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">Signed in as</p>
                      <p className="truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-300 my-2"></div>
            {currentUser ? (
              <div className="space-y-1">
                <div className="px-3 py-2 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                    {currentUser.email?.[0].toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Signed in as</p>
                    <p className="text-sm text-gray-700 truncate">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                >
                  Log Out
                </button>
              </div>
            ) : (
              authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-600"
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
