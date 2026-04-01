import React from 'react';
import Portfolio from '../components/Portfolio';

const PortfolioPage = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Portfolio />
      <div className="portfolio-cta-section">
        <div className="content-container-final" style={{ textAlign: 'center', padding: '80px 2rem', backgroundColor: '#000', color: '#fff' }}>
          <h2 style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Want to Contribute Research?
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            marginBottom: '2rem',
            color: '#ccc'
          }}>
            Join our analyst program and build institutional-grade coverage.
          </p>
          <a 
            href="/apply"
            style={{
              display: 'inline-block',
              backgroundColor: '#fff',
              color: '#000',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem'
            }}
          >
            Apply to Echelon
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
