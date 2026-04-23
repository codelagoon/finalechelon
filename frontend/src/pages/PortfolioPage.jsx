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
        eyebrow="Equity research archive"
        title="Echelon Equity Research Portfolio"
        lead="This portfolio serves as the research and coverage hub for Echelon Equity, with analyst-driven work across public equities, valuation frameworks, and sector monitoring."
        supportingText="Each coverage stream is maintained with a repeatable process so thesis updates, risk discussion, and valuation changes remain traceable over time."
        links={[
          { to: "/program", label: "How the analyst program develops coverage" },
          { to: "/apply", label: "Apply to contribute research" },
        ]}
      />
      <Portfolio />
      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Coverage Areas</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Core sector coverage</h3>
              <p className="content-card-copy-final">
                Analysts maintain ongoing company and sector coverage across technology, healthcare, financials, consumer, and other high-relevance public equity segments.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Valuation-first analysis</h3>
              <p className="content-card-copy-final">
                Coverage is built around valuation assumptions and scenario framing, not short-term commentary disconnected from financial drivers.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Published research workflow</h3>
              <p className="content-card-copy-final">
                Work moves from analyst draft to reviewed publication through documented review standards maintained by the investment team.
              </p>
            </article>
          </div>
        </div>
      </section>
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
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '1.5rem auto 0' }}>
            To understand the analysts behind this coverage, review the <Link to="/team" className="inline-link-final">Echelon Equity team page</Link>. If you want to help build future coverage, <Link to="/apply" className="inline-link-final">apply to the program</Link>.
          </p>
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
