import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must contain uppercase, lowercase, number and special character.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (userExists) {
      setError("Account already exists with this email.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    setSuccess("Registration successful! Redirecting to login...");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAgreeTerms(false);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="signup-wrapper animate-fade-in">
      <div className="signup-card">

        <div className="signup-header">
          <div className="signup-logo">
            <img src="/images/logo.png" alt="PlanMyTrip Logo" className="signup-logo-img" />
          </div>

          <h2>Create Account</h2>
        </div>

        {error && <div className="message error-message">{error}</div>}

        {success && <div className="message success-message">{success}</div>}


        <form className="signup-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <div className="input-container">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="input-icon"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />

                <circle cx="12" cy="7" r="4" />
              </svg>

              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <div className="input-container">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="input-icon"
              >
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
            <label htmlFor="password">Password</label>

            <div className="input-container">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="input-icon"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />

                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>

              <input
                type="password"
                id="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <div className="input-container">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="input-icon"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />

                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>

              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span className="checkbox-custom"></span>I agree to the
              <span className="inline-link">Terms & Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Register Account
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
