import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const ResourcesDropdown = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  const resources = [
    { to: '/standards', label: 'Standards & Scorecard' },
    { to: '/toolkit', label: 'Investor Toolkit' },
    { to: '/why-student-finance-work-is-weak', label: 'Why Research Discipline Matters' },
    { to: '/toolkit/dcf-builder', label: 'Build a DCF' },
  ];

  const isResourceActive = resources.some(r => location.pathname === r.to);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (!isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, isMobile]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (isMobile) {
    return (
      <div className="dropdown-mobile">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`dropdown-mobile-trigger nav-link-final ${isResourceActive ? 'nav-active' : ''}`}
          aria-expanded={isOpen}
        >
          <span>Resources</span>
          <ChevronRight size={16} style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </button>
        {isOpen && (
          <div className="dropdown-mobile-menu">
            {resources.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`dropdown-mobile-item nav-link-final ${location.pathname === item.to ? 'nav-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop version with hover
  return (
    <div
      ref={dropdownRef}
      className={`dropdown-desktop ${isOpen ? 'open' : ''} ${isResourceActive ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`dropdown-desktop-trigger nav-link-final ${isResourceActive ? 'nav-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>Resources</span>
        <ChevronDown size={14} style={{ transition: 'transform 0.2s' }} />
      </button>
      {isOpen && (
        <div className="dropdown-desktop-menu">
          {resources.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`dropdown-desktop-item ${location.pathname === item.to ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesDropdown;
