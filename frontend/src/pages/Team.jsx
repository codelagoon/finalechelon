import React from 'react';
import { Link } from 'react-router-dom';
import TeamMembers from '../components/TeamMembers';

const Team = () => {
  return (
    <div className="team-page page-shell-final">
        <div className="team-header-section">
          <div className="content-container-final">
            <h1 className="section-title-final">Echelon Equity Analyst and Leadership Team</h1>
            
            <div className="team-description">
              <p className="positioning-paragraph-final">
                Echelon Equity brings together student analysts from leading high schools and universities across the United States. The team contributes equity research, technical and macro analysis, and operating support under shared standards for quality and accountability.
                The broader member base has included students from institutions such as NYU,
                Colgate, and the University of Maryland.
              </p>
              <p className="positioning-paragraph-final">
                Across technology, healthcare, financial services, consumer, energy, and industrial names, analysts are expected to communicate clear theses and defensible valuation logic. To review published work, visit the <Link to="/newsletter" className="inline-link-final">newsletter</Link>. To understand training, review the <Link to="/program" className="inline-link-final">investment research program</Link>.
              </p>
            </div>
            
            <p className="team-disclaimer">
              Please note: not every Echelon Equity member is featured on this page.
              Some members chose not to be displayed on the website.
              This page is populated directly from our internal member form submissions and updates automatically as new profiles are added.
            </p>
          </div>
        </div>

        <section className="content-section-final">
          <div className="content-container-final">
            <h2 className="section-title-final">Team Standards</h2>
            <div className="content-grid-final">
              <article className="content-card-final">
                <h3 className="content-card-title-final">Research credibility</h3>
                <p className="content-card-copy-final">
                  Analysts are evaluated on how well they support conclusions with primary data, valuation assumptions, and coherent risk framing.
                </p>
              </article>
              <article className="content-card-final">
                <h3 className="content-card-title-final">Editorial accountability</h3>
                <p className="content-card-copy-final">
                  Leadership and senior contributors review drafts for structure, precision, and consistency before work is shared publicly.
                </p>
              </article>
              <article className="content-card-final">
                <h3 className="content-card-title-final">Professional communication</h3>
                <p className="content-card-copy-final">
                  Team members are expected to write clearly, respond to feedback, and maintain reliable execution timelines.
                </p>
              </article>
            </div>
            <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '1.5rem auto 0' }}>
              Interested in joining this team? Start your <Link to="/apply" className="inline-link-final">Echelon Equity application</Link>.
            </p>
          </div>
        </section>

        <TeamMembers />
      </div>
  );
};

export default Team;
