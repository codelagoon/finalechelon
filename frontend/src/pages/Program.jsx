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
        title="Echelon Equity Investment Research Program"
        lead="Echelon Equity trains student analysts through structured equity research workflows, practical review cycles, and measurable standards for communication, valuation, and judgment."
        supportingText="Applications are open across research and selected operating roles, but every role is tied to accountable output and professional expectations."
        links={[
          { to: "/apply", label: "Apply to the analyst program" },
          { to: "/newsletter", label: "Review published research coverage" },
        ]}
      />
      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Program Overview</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">What analysts learn</h3>
              <p className="content-card-copy-final">
                Analysts learn to turn raw filings, earnings commentary, and market context into written investment views backed by explicit assumptions.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">How work is reviewed</h3>
              <p className="content-card-copy-final">
                Draft models and memos are reviewed for structure, valuation discipline, and clarity before analysts move work into a publishable state.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Who should apply</h3>
              <p className="content-card-copy-final">
                The strongest candidates are curious, coachable, and consistent under deadlines, not just fluent in finance vocabulary.
              </p>
            </article>
          </div>
        </div>
      </section>
      <Tracks />
      <Standards />
      <Selection />
      <AnalystWork />
      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">From Training to Published Coverage</h2>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '0 auto 1.25rem' }}>
            Program outcomes are visible in the research portfolio. As analysts progress, they are expected to communicate a clearer thesis, tighter risk framing, and stronger valuation support.
          </p>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '0 auto' }}>
            Before applying, review the <Link to="/newsletter" className="inline-link-final">newsletter</Link> and the <Link to="/team" className="inline-link-final">analyst team profiles</Link> to understand the expected standard.
          </p>
        </div>
      </section>
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
