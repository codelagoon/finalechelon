import React from 'react';
import { Link } from 'react-router-dom';
import Tracks from '../components/Tracks';

const Program = () => {
  return (
    <div className="page-shell-final">
      <section className="content-section-final">
        <div className="content-container-final page-shell-narrow-final">
          <h1 className="section-title-final">How Echelon Works</h1>
          <p className="positioning-paragraph-final">
            We built Echelon to function like a real investment research firm, not a school club. Here's exactly how it works.
          </p>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">What analysts do</h2>
          <p className="positioning-paragraph-final">
            Analysts are assigned sector coverage on day one. The workflow from there: sector team meetings → company selection → financial modeling → draft memo → editorial review by Wall Street professionals → publish. No fake portfolios. No simulated trades.
          </p>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">How we get to our conclusions</h2>
          <p className="positioning-paragraph-final">
            An Echelon thesis starts with sector research. Analysts identify companies within their coverage area, build financial models from public filings, test assumptions against market data, and write investment memos that follow Goldman Sachs formatting. Every draft goes through peer review and then professional review before publication. We challenge assumptions, stress-test models, and require clear risk framing. Nothing publishes until it meets professional standards.
          </p>
          
          <div className="content-grid-final standards-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Valuation rigor</h3>
              <p className="content-card-copy-final">
                Every published memo includes explicit assumptions (revenue growth, margins, discount rate, terminal growth) with documented reasoning. We do not publish claims without quantitative support.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Clear thesis framing</h3>
              <p className="content-card-copy-final">
                Research memos articulate a core investment view (bullish, bearish, hold) with risk factors clearly stated. Readers should understand the primary thesis within the first two pages.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Data transparency</h3>
              <p className="content-card-copy-final">
                Sources are cited for financial data, company guidance, and market context. Model reconciliation to public filings is included or explicitly noted as out-of-scope.
              </p>
            </article>
          </div>
          
          <h3 className="section-title-final" style={{ marginTop: '3rem', fontSize: '1.5rem' }}>Quality Control Principles</h3>
          <div className="principles-list">
            <div className="principle-item">
              <h4>No surface-level commentary</h4>
              <p>Research must include primary financial analysis. Market recaps and news summary commentary do not advance investor judgment.</p>
            </div>
            <div className="principle-item">
              <h4>Assumption clarity</h4>
              <p>Every valuation output is traceable to explicit assumptions. Readers should be able to recalculate results from stated inputs.</p>
            </div>
            <div className="principle-item">
              <h4>Risk acknowledgment</h4>
              <p>Notable downside risks, competitive threats, and macro headwinds are documented. No analysis is presented as risk-free.</p>
            </div>
            <div className="principle-item">
              <h4>Accountability for output</h4>
              <p>Analyst names are attached to published work. We stand behind conclusions and are prepared to defend them.</p>
            </div>
          </div>
        </div>
      </section>

      <Tracks />

      <section className="content-section-final">
        <div className="content-container-final page-shell-narrow-final">
          <h2 className="section-title-final">Who this is for</h2>
          <p className="positioning-paragraph-final">
            Students who want to do real work. If you're looking for a line on your résumé, this isn't it. If you want to build something you can actually point to, apply.
          </p>
        </div>
      </section>

      <div className="program-cta-section page-cta-section-final">
        <div className="content-container-final page-cta-panel-final">
          <h2 className="page-cta-title-final">Apply to Echelon</h2>
          <p className="page-cta-subtitle-final">
            Applications are rolling and selective.
          </p>
          <Link
            to="/apply"
            className="page-cta-button-final page-cta-button-dark-final"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Program;
