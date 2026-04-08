import React from 'react';
import { Link } from 'react-router-dom';
import Tracks from '../components/Tracks';
import Standards from '../components/Standards';
import Selection from '../components/Selection';
import AnalystWork from '../components/AnalystWork';
import PageIntro from '../components/PageIntro';

const Program = () => {
  return (
    <div className="page-shell-final">
      <PageIntro
        eyebrow="Investment research program"
        title="Student-Led Investment Research Program"
        lead="The Echelon Equity program is built for analysts who want to learn by producing investment research under review, not by staying theoretical. Members move through structured tracks, receive feedback, and improve through repetition."
        supportingText="From financial modeling and valuation to memo writing and market analysis, the program is designed to develop research analysts who can think clearly, communicate well, and work to institutional standards."
        links={[
          { to: "/apply", label: "Apply to the research program" },
          { to: "/portfolio", label: "See investment research coverage" },
        ]}
      />
      <Tracks />
      <Standards />
      <Selection />
      <AnalystWork />
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
