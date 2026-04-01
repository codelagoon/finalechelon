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
              Student-led private equity initiative. NYC, 2025.
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
              <li><a href="#portfolio">Research</a></li>
              <li><a href="#tracks">Analyst Tracks</a></li>
              <li><a href="#standards">Standards</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#about">About Echelon</a></li>
              <li><a href="#reviewers">Reviewers</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              <li><a href="https://echelonequity.co" target="_blank" rel="noopener noreferrer">Website</a></li>
              <li><a href="https://portal.echelonequity.co" target="_blank" rel="noopener noreferrer">Portal</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#twitter">Twitter</a></li>
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
