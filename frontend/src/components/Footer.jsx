import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-brand">ECHELON EQUITY</h3>
            <p className="footer-tagline">
              The Work Is the Credential.<br />
              Student-led investment research platform. NYC, 2025.
            </p>
            <div className="footer-contact-info">
              <p className="footer-email">team@echelonequity.co</p>
              <p className="footer-email">admissions@echelonequity.co</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Program</h4>
            <ul className="footer-links">
              <li><a href="#application">Apply</a></li>
              <li><a href="#coverage">Research</a></li>
              <li><a href="#tracks">Analyst Tracks</a></li>
              <li><a href="#selection">Selection</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="https://echelonequity.co" target="_blank" rel="noopener noreferrer">Website</a></li>
              <li><a href="https://portal.echelonequity.co" target="_blank" rel="noopener noreferrer">Portal</a></li>
              <li><a href="#partnerships">Partnerships</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              <li><a href="https://www.linkedin.com/company/echelon-equity" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/echelonequity" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@echelonequity" target="_blank" rel="noopener noreferrer">TikTok</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Echelon Equity. All rights reserved.
          </p>
          <p className="footer-tagline-bottom">
            Co-Founders: George Afram (Operations) · Jonathan Silva (Research)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
