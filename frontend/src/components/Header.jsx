import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import ContactDialog from './ContactDialog';

const Header = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="site-header-final">
        <div className="header-container-final">
          <div className="header-logo-final">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="logo-text-final">Echelon.</span>
            </Link>
          </div>
          <nav className="header-nav-final">
            <Link
              to="/portfolio"
              className={`nav-link-final ${isActive('/portfolio') ? 'nav-active' : ''}`}
            >
              Research
            </Link>
            <Link
              to="/team"
              className={`nav-link-final ${isActive('/team') ? 'nav-active' : ''}`}
            >
              Team
            </Link>
            <Link
              to="/program"
              className={`nav-link-final ${isActive('/program') ? 'nav-active' : ''}`}
            >
              Program
            </Link>
            <Link
              to="/apply"
              className={`nav-link-final ${isActive('/apply') ? 'nav-active' : ''}`}
            >
              Apply
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsContactOpen(true)}
              className="header-contact-btn-final"
            >
              Contact
            </Button>
          </nav>
        </div>
      </header>
      <ContactDialog 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  );
};

export default Header;
