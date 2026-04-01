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
      <header className="site-header">
        <div className="header-container">
          <div className="header-logo">
            <span className="logo-text">ECHELON EQUITY</span>
          </div>
          <nav className="header-nav">
            <button onClick={() => scrollToSection('portfolio')} className="nav-link">
              Research
            </button>
            <button onClick={() => scrollToSection('application')} className="nav-link">
              Apply
            </button>
            <button onClick={() => scrollToSection('careers')} className="nav-link">
              Careers
            </button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsContactOpen(true)}
              className="header-contact-btn"
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
