import React, { useState } from 'react';
import { Button } from './ui/button';
import ContactDialog from './ContactDialog';

const Header = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="site-header-final">
        <div className="header-container-final">
          <div className="header-logo-final">
            <span className="logo-text-final">ECHELON EQUITY</span>
          </div>
          <nav className="header-nav-final">
            <button onClick={() => scrollToSection('coverage')} className="nav-link-final">
              Research
            </button>
            <button onClick={() => window.location.href = '#apply'} className="nav-link-final">
              Apply
            </button>
            <button onClick={() => scrollToSection('tracks')} className="nav-link-final">
              Tracks
            </button>
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
