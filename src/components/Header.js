import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

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
        <Link to="/" className="logo-section">
          <div className="logo-box">
            <img src="/images/logo.png" alt="PlanMyTrip Logo" className="logo-img" />
            <div className="logo-text">
              <span className="logo-brand">PlanMyTrip</span>
              <span className="logo-sub">Travel & Tour</span>
            </div>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/packages" 
            className={`nav-link ${location.pathname === '/packages' ? 'active' : ''}`}
          >
            Packages
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About Us
          </Link>
          <Link 
            to="/faq" 
            className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`}
          >
            FAQ
          </Link>

          {currentUser && currentUser.role === 'admin' && (
            <Link 
              to="/manage-packages" 
              className={`nav-link ${location.pathname === '/manage-packages' ? 'active' : ''}`}
            >
              Manage Packages
            </Link>
          )}

          {currentUser && (
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
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
                onClick={handleLogout} 
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
