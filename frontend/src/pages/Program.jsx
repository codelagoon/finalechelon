import React from 'react';
import { Link } from 'react-router-dom';
import Tracks from '../components/Tracks';
import Selection from '../components/Selection';

const Program = () => {
  return (
    <div className="page-shell-final">
      <Tracks />
      <Selection />
      <div className="program-cta-section page-cta-section-final">
        <div className="content-container-final page-cta-panel-final">
          <h2 className="page-cta-title-final">Ready to Apply?</h2>
          <p className="page-cta-subtitle-final">
            Analysts are selected based on demonstrated potential and ability to meet the standard.
          </p>
          <Link
            to="/apply"
            className="page-cta-button-final page-cta-button-dark-final"
          >
            Submit Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Program;
