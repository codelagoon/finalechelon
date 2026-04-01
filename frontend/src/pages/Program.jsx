import React from 'react';
import Tracks from '../components/Tracks';
import Selection from '../components/Selection';

const Program = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Tracks />
      <Selection />
      <div className="program-cta-section">
        <div className="content-container-final" style={{ textAlign: 'center', padding: '80px 2rem' }}>
          <h2 className="section-title-final">Ready to Apply?</h2>
          <p className="section-subtitle-final" style={{ marginBottom: '2rem' }}>
            Analysts are selected based on demonstrated potential and ability to meet the standard.
          </p>
          <a 
            href="/apply" 
            className="program-apply-button"
            style={{
              display: 'inline-block',
              backgroundColor: '#000',
              color: '#fff',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'opacity 0.2s ease'
            }}
          >
            Submit Application
          </a>
        </div>
      </div>
    </div>
  );
};

export default Program;
