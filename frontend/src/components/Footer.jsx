import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../seo/siteConfig';
import NewsletterSignupForm from './newsletter/NewsletterSignupForm';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: 'LinkedIn', href: siteConfig.social.linkedin },
    { label: 'Instagram', href: siteConfig.social.instagram },
    { label: 'TikTok', href: siteConfig.social.tiktok },
    { label: 'Facebook', href: siteConfig.social.facebook },
    { label: 'X', href: siteConfig.social.x },
    { label: 'YouTube', href: siteConfig.social.youtube },
  ].filter((link) => link.href);

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h2 className="footer-brand">ECHELON EQUITY</h2>
            <p className="footer-tagline">
              {siteConfig.slogan}<br />
              Student-led investment research platform focused on analyst development, institutional standards, and real work.
            </p>
            <div className="footer-contact-info">
              <p className="footer-email">
                <a href={`mailto:${siteConfig.emails.general}`}>{siteConfig.emails.general}</a>
              </p>
              <p className="footer-email">
                <a href={`mailto:${siteConfig.emails.admissions}`}>{siteConfig.emails.admissions}</a>
              </p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Program</h4>
            <ul className="footer-links">
              <li><Link to="/program">Investment Research Program</Link></li>
              <li><Link to="/apply">Apply to Echelon</Link></li>
              <li><Link to="/team">Research Analyst Team</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/newsletter">Newsletter</Link></li>
              <li><Link to="/program">Analyst Tracks and Standards</Link></li>
              <li><Link to="/team">Meet Echelon Equity</Link></li>
              <li><a href="https://portal.echelonequity.co" target="_blank" rel="noopener noreferrer">Member Portal</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-newsletter-panel-final">
          <div className="footer-newsletter-copy-final">
            <p className="footer-newsletter-eyebrow-final">Newsletter</p>
            <h3 className="footer-newsletter-title-final">Read the research before you apply</h3>
            <p className="footer-newsletter-description-final">
              A compact weekly letter for readers tracking Echelon's work, standards, and market notes.
            </p>
          </div>
          <div className="footer-newsletter-form-final">
            <NewsletterSignupForm
              source="footer"
              segment="homepage-footer"
              buttonLabel="Join"
              helperText=""
              compact
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Echelon Equity. All rights reserved.
          </p>
          <p className="footer-tagline-bottom">
            Co-Founders: George Tetteh (Operations) · Jonathan Silva (Research)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
