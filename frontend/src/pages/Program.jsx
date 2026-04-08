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
        eyebrow="Roles at Echelon Equity"
        title="Open Roles Across Echelon Equity"
        lead="Echelon Equity recruits across the investment team and a small set of operating roles. Whether you are applying for research, leadership, fundraising, or marketing / content, the standard is the same: sound judgment, strong communication, and reliable execution."
        supportingText="The role outlines below are intentionally concise. We look for people who can contribute meaningfully, respond well to feedback, and help raise the quality of the organization."
        links={[
          { to: "/apply", label: "Apply to Echelon Equity" },
          { to: "/team", label: "Meet current members" },
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
            Applicants are selected based on role fit, judgment, and ability to meet the standard.
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
