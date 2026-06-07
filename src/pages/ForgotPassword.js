import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password, 4=success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedOtp] = useState(Math.floor(100000 + Math.random() * 900000).toString());

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Check if email exists in localStorage (registered users)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminEmail = 'admin@gmail.com';
    const userExists = users.some(u => u.email === email) || email === adminEmail;

    if (!userExists) {
      setError('No account found with this email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate OTP sent — store it in sessionStorage for demo
      sessionStorage.setItem('resetOtp', generatedOtp);
      sessionStorage.setItem('resetEmail', email);
      console.log(`[Demo] OTP for ${email}: ${generatedOtp}`);
      setStep(2);
    }, 1500);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError('');
    const enteredOtp = otp.join('');
    const storedOtp = sessionStorage.getItem('resetOtp');
    if (enteredOtp.length !== 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }
    if (enteredOtp !== storedOtp) {
      setError('Invalid OTP. Please check and try again.');
      return;
    }
    setStep(3);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Update password in localStorage for the demo user
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const resetEmail = sessionStorage.getItem('resetEmail');
      const updatedUsers = users.map(u =>
        u.email === resetEmail ? { ...u, password: newPassword } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      sessionStorage.removeItem('resetOtp');
      sessionStorage.removeItem('resetEmail');
      setLoading(false);
      setStep(4);
    }, 1200);
  };

  const handleResendOtp = () => {
    const newOtpVal = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('resetOtp', newOtpVal);
    console.log(`[Demo] Resent OTP: ${newOtpVal}`);
    setOtp(['', '', '', '', '', '']);
    setError('');
    alert(`OTP resent! (Demo) Check console for the code.`);
  };

  return (
    <div className="fp-wrapper animate-fade-in">
      {/* Decorative background blobs */}
      <div className="fp-blob fp-blob-1" />
      <div className="fp-blob fp-blob-2" />

      <div className="fp-card">
        {/* Progress Bar */}
        {step < 4 && (
          <div className="fp-progress-bar">
            <div className={`fp-progress-step ${step >= 1 ? 'done' : ''}`}>
              <div className="fp-step-circle">1</div>
              <span>Email</span>
            </div>
            <div className={`fp-progress-line ${step >= 2 ? 'active' : ''}`} />
            <div className={`fp-progress-step ${step >= 2 ? 'done' : ''}`}>
              <div className="fp-step-circle">2</div>
              <span>Verify OTP</span>
            </div>
            <div className={`fp-progress-line ${step >= 3 ? 'active' : ''}`} />
            <div className={`fp-progress-step ${step >= 3 ? 'done' : ''}`}>
              <div className="fp-step-circle">3</div>
              <span>New Password</span>
            </div>
          </div>
        )}

        {/* ─── Step 1: Email ─── */}
        {step === 1 && (
          <>
            <div className="fp-header">
              <div className="fp-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h1>Forgot Password?</h1>
              <p>No worries! Enter your email and we'll send a verification code to reset your password.</p>
            </div>

            {error && <div className="fp-message fp-error">{error}</div>}

            <form onSubmit={handleEmailSubmit} className="fp-form">
              <div className="fp-field">
                <label htmlFor="fp-email">Email Address</label>
                <div className="fp-input-wrap">
                  <svg className="fp-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    id="fp-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="fp-btn-primary" disabled={loading}>
                {loading ? (
                  <><span className="fp-spinner" /> Sending Code...</>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Verification Code
                  </>
                )}
              </button>
            </form>

            <div className="fp-back-link">
              <Link to="/login">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Login
              </Link>
            </div>
          </>
        )}

        {/* ─── Step 2: OTP ─── */}
        {step === 2 && (
          <>
            <div className="fp-header">
              <div className="fp-icon-circle green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.14 6.14l1.91-1.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15.92z" />
                </svg>
              </div>
              <h1>Check Your Email</h1>
              <p>We sent a 6-digit verification code to <strong>{email}</strong>.<br />Check your inbox (and spam folder).</p>
            </div>

            {error && <div className="fp-message fp-error">{error}</div>}

            <div className="fp-demo-note">
              🔐 <strong>Demo Mode:</strong> OTP is <code>{sessionStorage.getItem('resetOtp')}</code>
            </div>

            <form onSubmit={handleOtpSubmit} className="fp-form">
              <div className="fp-otp-group">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className={`fp-otp-input ${digit ? 'filled' : ''}`}
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              <button type="submit" className="fp-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Verify Code
              </button>
            </form>

            <div className="fp-resend-row">
              <span>Didn't receive the code?</span>
              <button onClick={handleResendOtp} className="fp-resend-btn">Resend OTP</button>
            </div>
          </>
        )}

        {/* ─── Step 3: New Password ─── */}
        {step === 3 && (
          <>
            <div className="fp-header">
              <div className="fp-icon-circle purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h1>Set New Password</h1>
              <p>Create a strong password for your account. At least 8 characters.</p>
            </div>

            {error && <div className="fp-message fp-error">{error}</div>}

            <form onSubmit={handlePasswordReset} className="fp-form">
              <div className="fp-field">
                <label htmlFor="fp-newpass">New Password</label>
                <div className="fp-input-wrap">
                  <svg className="fp-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="fp-newpass"
                    type="password"
                    placeholder="Min. 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="fp-field">
                <label htmlFor="fp-confirmpass">Confirm Password</label>
                <div className="fp-input-wrap">
                  <svg className="fp-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <input
                    id="fp-confirmpass"
                    type="password"
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password strength hints */}
              <div className="fp-strength-hints">
                <div className={`fp-hint ${newPassword.length >= 8 ? 'pass' : ''}`}>
                  <span className="fp-hint-dot" /> At least 8 characters
                </div>
                <div className={`fp-hint ${/[A-Z]/.test(newPassword) ? 'pass' : ''}`}>
                  <span className="fp-hint-dot" /> One uppercase letter
                </div>
                <div className={`fp-hint ${/[0-9]/.test(newPassword) ? 'pass' : ''}`}>
                  <span className="fp-hint-dot" /> One number
                </div>
              </div>

              <button type="submit" className="fp-btn-primary" disabled={loading}>
                {loading ? (
                  <><span className="fp-spinner" /> Updating...</>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Reset Password
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* ─── Step 4: Success ─── */}
        {step === 4 && (
          <div className="fp-success-screen">
            <div className="fp-success-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="40" height="40">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1>Password Reset!</h1>
            <p>Your password has been successfully updated. You can now sign in with your new credentials.</p>
            <Link to="/login" className="fp-btn-primary fp-btn-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
