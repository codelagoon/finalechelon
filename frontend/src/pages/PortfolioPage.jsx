import React from 'react';
import { Link } from 'react-router-dom';
import Portfolio from '../components/Portfolio';

const PortfolioPage = () => {
  return (
    <div className="page-shell-final">
      <Portfolio />
      <div className="portfolio-cta-section page-cta-section-final">
        <div className="content-container-final page-cta-panel-final page-cta-panel-dark-final">
          <h2 className="page-cta-title-final page-cta-title-dark-final">
            Want to Contribute Research?
          </h2>
          <p className="page-cta-subtitle-final page-cta-subtitle-dark-final">
            Join our analyst program and build institutional-grade coverage.
          </p>
          <Link
            to="/apply"
            className="page-cta-button-final page-cta-button-light-final"
          >
            Apply to Echelon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
