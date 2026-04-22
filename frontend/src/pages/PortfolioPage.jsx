import React from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import Portfolio from '../components/Portfolio';
import HalDealCTA from '../components/HalDealCTA';

const PortfolioPage = () => {
  return (
    <div className="page-shell-final">
      <HalDealCTA />
      <PageIntro
        eyebrow="Coverage and research"
        title="Investment Research Portfolio and Coverage"
        lead="Echelon Equity publishes and maintains investment research coverage across public equities with emphasis on valuation discipline, market context, and clear written reasoning."
        supportingText="The portfolio is designed to show how student-led investment research can be structured with institutional standards, repeatable process, and real analyst accountability across sectors."
        links={[
          { to: "/program", label: "Learn how the research program works" },
          { to: "/team", label: "Meet the analyst team" },
        ]}
      />
      <Portfolio />
      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">How Echelon Equity Builds Research</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Coverage discipline</h3>
              <p className="content-card-copy-final">
                Each company in the coverage universe is supported by a defined
                thesis, sector context, valuation work, and ongoing monitoring
                rather than headline-driven commentary alone.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Analyst process</h3>
              <p className="content-card-copy-final">
                Research analysts are expected to work from filings, earnings,
                assumptions, and scenario analysis so conclusions are tied to a
                documented process instead of vague conviction.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Institutional review</h3>
              <p className="content-card-copy-final">
                The goal is not just to publish coverage, but to produce
                investment research that reflects institutional standards for
                structure, clarity, and defensible judgment.
              </p>
            </article>
          </div>
        </div>
      </section>
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
