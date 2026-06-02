import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (role === 'admin') {
      // Unique admin credentials
      if (email.toLowerCase() === 'admin@planmytrip.com' && password === 'adminpassword123') {
        setError('');
        setSuccess('Admin login successful! Entering control center...');
        
        const adminSession = {
          name: 'System Admin',
          email: 'admin@planmytrip.com',
          role: 'admin'
        };
        localStorage.setItem('currentUser', JSON.stringify(adminSession));
        
        // Dispatch event so layout catches update
        window.dispatchEvent(new Event('storage'));

        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } else {
        setError('Invalid Admin Credentials. Please use the unique details provided below.');
      }
    } else {
      // User authentication from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const registeredUser = existingUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (registeredUser) {
        setError('');
        setSuccess(`Welcome back, ${registeredUser.name}! Login successful!`);
        
        const userSession = {
          name: registeredUser.name,
          email: registeredUser.email,
          role: 'user'
        };
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        
        // Dispatch event so layout catches update
        window.dispatchEvent(new Event('storage'));

        setTimeout(() => {
          navigate('/');
        }, 1200);
      } else {
        setError('Invalid email or password. Please try again or create an account.');
      }
    }
  };

  return (
    <div className="login-wrapper animate-fade-in">
      <div className="login-card">
        
        {/* Header inside Card */}
        <div className="login-header">
          <div className="login-logo">
            <img src="/images/logo.png" alt="PlanMyTrip Logo" className="login-logo-img" />
          </div>
          <h2>{role === 'admin' ? 'Admin Portal' : 'Welcome Back'}</h2>
          <p>{role === 'admin' ? 'Access administrative panel' : 'Plan your next adventure'}</p>
        </div>

        {/* Portal Switching Tabs */}
        <div className="portal-selector">
          <button 
            type="button" 
            className={`portal-btn ${role === 'user' ? 'active' : ''}`}
            onClick={() => { setRole('user'); setError(''); setSuccess(''); }}
          >
            User Login
          </button>
          <button 
            type="button" 
            className={`portal-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => { setRole('admin'); setError(''); setSuccess(''); }}
          >
            Admin Login
          </button>
        </div>

        {/* Status Messages */}
        {error && <div className="message error-message">{error}</div>}
        {success && <div className="message success-message">{success}</div>}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="email">{role === 'admin' ? 'Admin Identifier' : 'Email Address'}</label>
            <div className="input-container">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input 
                type="email" 
                id="email" 
                placeholder={role === 'admin' ? 'admin@planmytrip.com' : 'name@example.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Security Password</label>
            <div className="input-container">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {role === 'admin' && (
            <div className="admin-credentials-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-badge-icon">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <div className="badge-text">
                <p className="badge-title">Unique Credentials Required:</p>
                <p>Email: <span className="highlight">admin@planmytrip.com</span></p>
                <p>Password: <span className="highlight">adminpassword123</span></p>
              </div>
            </div>
          )}

          <div className="form-actions">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-custom"></span>
              Remember session
            </label>
            {role === 'user' && <a href="#forgot" className="forgot-link">Forgot Password?</a>}
          </div>

          <button type="submit" className="submit-btn">
            {role === 'admin' ? 'Launch Admin Panel' : 'Authenticate Account'}
          </button>
        </form>

        {role === 'user' && (
          <div className="login-footer">
            <p>Don't have an account yet? <Link to="/signup" className="signup-link">Register Here</Link></p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;
