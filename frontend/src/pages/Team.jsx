import React, { useEffect } from 'react';
import TeamMembers from '../components/TeamMembers';

const Team = () => {
  // Scroll to top on mount and update document title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Team | Echelon Equity";
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 
        "Meet the outstanding student analysts from top high schools and universities across the United States producing institutional-grade investment research at Echelon Equity."
      );
    }
    
    return () => {
      document.title = "Echelon Equity";
    };
  }, []);

  return (
    <div className="team-page" style={{ paddingTop: '80px' }}>
        {/* Page Header */}
        <div className="team-header-section">
          <div className="content-container-final">
            <h1 className="section-title-final">Our Team</h1>
            
            <div className="team-description">
              <p className="positioning-paragraph-final">
                Echelon Equity brings together outstanding student analysts from top high schools 
                and universities across the United States. Our team produces thoughtful research across 
                equity analysis, technical strategy, macroeconomic policy, and strategic marketing, 
                with each member selected for analytical ability, curiosity, and commitment to excellence.
              </p>
              <p className="positioning-paragraph-final">
                Across sectors such as technology, healthcare, financial services, consumer, energy, 
                and industrials, our members develop and communicate research using disciplined analysis, 
                valuation thinking, and market awareness shaped by high professional standards.
              </p>
            </div>
            
            <p className="team-disclaimer">
              Please note: not every Echelon Equity member is featured on this page. 
              Some members chose not to be displayed on the website.
            </p>
          </div>
        </div>

        {/* Team Members Grid */}
        <TeamMembers />
      </div>
  );
};

export default Team;
