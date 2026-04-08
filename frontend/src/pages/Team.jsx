import React from 'react';
import { Link } from 'react-router-dom';
import TeamMembers from '../components/TeamMembers';

const Team = () => {
  return (
    <div className="team-page page-shell-final">
        {/* Page Header */}
        <div className="team-header-section">
          <div className="content-container-final">
            <h1 className="section-title-final">Echelon Equity Research Analysts</h1>
            
            <div className="team-description">
              <p className="positioning-paragraph-final">
                Echelon Equity brings together student analysts from top high schools
                and universities across the United States. Our team produces investment research across
                equity analysis, technical strategy, macroeconomic policy, and strategic marketing,
                with each member selected for analytical ability, curiosity, and commitment to institutional standards.
                The broader member base has included students from institutions such as NYU,
                Colgate, and the University of Maryland.
              </p>
              <p className="positioning-paragraph-final">
                Across sectors such as technology, healthcare, financial services, consumer, energy,
                and industrials, our research analysts develop and communicate investment research using disciplined analysis,
                valuation thinking, and market awareness shaped by high professional standards. To understand how the platform works, visit the{" "}
                <Link to="/program" className="inline-link-final">investment research program</Link>{" "}
                or{" "}
                <Link to="/apply" className="inline-link-final">start an application</Link>.
              </p>
            </div>
            
            <p className="team-disclaimer">
              Please note: not every Echelon Equity member is featured on this page.
              Some members chose not to be displayed on the website.
              This page is populated directly from our internal member form submissions and updates automatically as new profiles are added.
            </p>
          </div>
        </div>

        {/* Team Members Grid */}
        <TeamMembers />
      </div>
  );
};

export default Team;
