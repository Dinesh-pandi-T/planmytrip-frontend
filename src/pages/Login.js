import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setSuccess('');

    //check Handle hardcoded admin 
    if (
      (email.toLowerCase() === "admin@gmail.com" && password === "Admin@123") ||
      (email.toLowerCase() === "suryasekar626@gmail.com" &&
      password === "Surya@123")
    ) {
      setError("");
      setSuccess("Admin login successful! Entering control center...");

      const adminSession = {
        name: "System Admin",
        email: "admin@gmail.com",
        role: "admin",
      };
      localStorage.setItem("currentUser", JSON.stringify(adminSession));

      // Dispatch event so layout catches update
      window.dispatchEvent(new Event("storage"));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
      return;
    }

    try {
      const response = await fetch("https://planmytrip-backend-68sp.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Invalid email or password. Please try again or create an account.');
        return;
      }

      setError('');
      setSuccess(`Welcome back, ${result.data.name}! Login successful!`);
      
      const userSession = {
        name: result.data.name,
        email: result.data.email,
        role: result.data.role
      };
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      
      // Dispatch event so layout catches update
      window.dispatchEvent(new Event('storage'));

      setTimeout(() => {
        if (result.data.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }, 1200);
    } catch (err) {
      setError('Unable to connect to the server. Please check if the backend is running.');
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
          <h2>Welcome Back</h2>
          <p>Plan your next adventure</p>
        </div>

        {/* Status Messages */}
        {error && <div className="message error-message">{error}</div>}
        {success && <div className="message success-message">{success}</div>}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input 
                type="email" 
                id="email" 
                placeholder="name@example.com"
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
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>

          <button type="submit" className="submit-btn">
            Authenticate Account
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account yet? <Link to="/signup" className="signup-link">Register Here</Link></p>
        </div>

      </div>
    </div>
  );
}

export default Login;
