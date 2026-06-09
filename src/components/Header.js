import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // 1. Initial active session detection
    const session = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(session);

    // 2. Storage event tracking
    const syncSession = () => {
      const updatedSession = JSON.parse(localStorage.getItem('currentUser') || 'null');
      setCurrentUser(updatedSession);
    };

    window.addEventListener('storage', syncSession);
    return () => window.removeEventListener('storage', syncSession);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    
    // Dispatch local storage event for immediate dashboard reactions
    window.dispatchEvent(new Event('storage'));
    
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo Section */}
        <Link to="/" className="logo-section" onClick={() => setIsMenuOpen(false)}>
          <div className="logo-box">
            <img src="/images/logo.png" alt="PlanMyTrip Logo" className="logo-img" />
            <div className="logo-text">
              <span className="logo-brand">PlanMyTrip</span>
              <span className="logo-sub">Travel & Tour</span>
            </div>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className="nav-toggle-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Section */}
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/packages" 
            className={`nav-link ${location.pathname === '/packages' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Packages
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/faq" 
            className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>

          {currentUser && currentUser.role === 'admin' && (
            <Link 
              to="/manage-packages" 
              className={`nav-link ${location.pathname === '/manage-packages' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Manage Packages
            </Link>
          )}

          {currentUser && (
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {currentUser ? (
            <>
              <div className="user-profile-badge">
                <span className={`user-role-dot ${currentUser.role}`}></span>
                <span className="user-name-text">Hi, {currentUser.name}</span>
                <span className="user-role-label">{currentUser.role === 'admin' ? 'Admin' : 'Explorer'}</span>
              </div>
              
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }} 
                className="nav-logout-btn"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
