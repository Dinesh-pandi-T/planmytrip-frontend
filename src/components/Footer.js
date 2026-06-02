import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Upper footer content */}
        <div className="footer-top">
          
          {/* Logo on the left */}
          <div className="footer-logo-section">
            <div className="footer-logo-box">
              <img src="/images/logo.png" alt="PlanMyTrip Logo" className="footer-logo-img" />
              <div className="footer-logo-text">
                <span className="footer-logo-brand">PlanMyTrip</span>
                <span className="footer-logo-sub">Travel & Tour</span>
              </div>
            </div>
          </div>

          {/* Social media icons in the center */}
          <div className="footer-socials">
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.002 3.002 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Contact details at the bottom */}
        <div className="footer-bottom-info">
          <div className="info-block">
            <span className="info-label">CALL US</span>
            <span className="info-value">+91 9873214560</span>
          </div>
          <div className="info-block">
            <span className="info-label">LOCATION</span>
            <span className="info-value">COIMBATORE</span>
          </div>
          <div className="info-block">
            <span className="info-label">E MAIL</span>
            <span className="info-value">planmytrip45@gmail.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
