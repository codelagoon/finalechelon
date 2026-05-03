import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import ContactDialog from './ContactDialog';
import ResourcesDropdown from './ResourcesDropdown';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const Header = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/program', label: 'Program' },
    { to: '/apply', label: 'Apply', isPrimary: true },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
            {navItems.map((item) => (
              item.isPrimary ? (
                <Button
                  key={item.to}
                  size="sm"
                  onClick={() => (window.location.href = item.to)}
                  className="header-apply-btn-final"
                >
                  {item.label}
                </Button>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link-final ${isActive(item.to) ? 'nav-active' : ''}`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <ResourcesDropdown isMobile={false} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsContactOpen(true)}
              className="header-contact-btn-final"
            >
              Contact
            </Button>
          </nav>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="header-menu-toggle-final"
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-nav-sheet-final">
              <SheetHeader className="mobile-nav-header-final">
                <SheetTitle className="mobile-nav-title-final">Navigate</SheetTitle>
              </SheetHeader>

              <nav className="mobile-nav-final" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  item.isPrimary ? (
                    <Button
                      key={item.to}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.location.href = item.to;
                      }}
                      className="mobile-apply-btn-final"
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <SheetClose asChild key={item.to}>
                      <Link
                        to={item.to}
                        className={`mobile-nav-link-final ${isActive(item.to) ? 'nav-active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  )
                ))}
                <ResourcesDropdown isMobile={true} />

                <Button
                  variant="outline"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="mobile-contact-btn-final"
                >
                  Contact
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {isContactOpen ? (
        <ContactDialog
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      ) : null}
    </>
  );
};

export default Header;
