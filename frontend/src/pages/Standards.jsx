import React from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';

const Standards = () => {
  return (
    <div className="page-shell-final">
      <PageIntro
        eyebrow="Research operations"
        title="Standards & Quality Scorecard"
        lead="Echelon Equity operates with transparent standards for editorial rigor, analyst accountability, and research quality. This page documents our process, principles, and measurable output metrics."
        supportingText="Strong research begins with clear expectations. We publish our standards so analysts understand the bar, readers trust our work, and external observers can evaluate our credibility."
        links={[
          { to: "/newsletter", label: "Review published research" },
          { to: "/apply", label: "Join the research team" },
        ]}
      />

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Publication Standards</h2>
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
            <article className="content-card-final standards-centered-final">
              <h3 className="content-card-title-final">Data transparency</h3>
              <p className="content-card-copy-final">
                Sources are cited for financial data, company guidance, and market context. Model reconciliation to public filings is included or explicitly noted as out-of-scope.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Editorial Process</h2>
          <div className="standards-process">
            <div className="process-step">
              <div className="process-step-number">1</div>
              <div className="process-step-content">
                <h3>Draft submission</h3>
                <p>Analyst submits model, memo, and valuation summary for initial review.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number">2</div>
              <div className="process-step-content">
                <h3>Model review</h3>
                <p>Senior analyst or team lead validates assumptions, formula structure, and output reconciliation.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number">3</div>
              <div className="process-step-content">
                <h3>Memo review</h3>
                <p>Editorial team checks for clarity, thesis coherence, risk framing, and compliance with publication standards.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number">4</div>
              <div className="process-step-content">
                <h3>Revision cycle</h3>
                <p>Feedback is provided. Analyst revises and resubmits. Process repeats until publication ready.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number">5</div>
              <div className="process-step-content">
                <h3>Publication</h3>
                <p>Reviewed work is published to portfolio with analyst attribution and publication date.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Analyst Expectations</h2>
          <div className="content-grid-final standards-expectations-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Communication</h3>
              <p className="content-card-copy-final">
                Analysts are expected to write with precision and clarity, using plain English where possible and technical terms where necessary. Editing feedback is viewed as a tool for growth, not criticism.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Discipline</h3>
              <p className="content-card-copy-final">
                Deadlines are binding. Models are documented. Reputational risk is taken seriously. We do not publish work we would not defend to external stakeholders.
              </p>
            </article>
            <article className="content-card-final standards-expectations-centered-final">
              <h3 className="content-card-title-final">Coachability</h3>
              <p className="content-card-copy-final">
                Feedback is frequent and direct. The expectation is to incorporate critique, improve output, and ask questions when the bar is unclear.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Quality Control Principles</h2>
          <div className="principles-list">
            <div className="principle-item">
              <h3>No surface-level commentary</h3>
              <p>
                Research must include primary financial analysis. Market recaps and news summary commentary do not advance investor judgment.
              </p>
            </div>
            <div className="principle-item">
              <h3>Assumption clarity</h3>
              <p>
                Every valuation output is traceable to explicit assumptions. Readers should be able to recalculate results from stated inputs.
              </p>
            </div>
            <div className="principle-item">
              <h3>Risk acknowledgment</h3>
              <p>
                Notable downside risks, competitive threats, and macro headwinds are documented. No analysis is presented as risk-free.
              </p>
            </div>
            <div className="principle-item">
              <h3>Accountability for output</h3>
              <p>
                Analyst names are attached to published work. We stand behind conclusions and are prepared to defend them.
              </p>
            </div>
            <div className="principle-item">
              <h3>Replicability</h3>
              <p>
                Another analyst with access to the same data should be able to replicate the valuation methodology and understand divergence in conclusions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="page-cta-section-final">
        <div className="content-container-final page-cta-panel-final">
          <h2 className="page-cta-title-final">Ready to Meet Our Standard?</h2>
          <p className="page-cta-subtitle-final">
            Join a team of analysts committed to rigorous, publishable research backed by clear assumptions and editorial review.
          </p>
          <Link
            to="/apply"
            className="page-cta-button-final page-cta-button-dark-final"
          >
            View Application Requirements
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Standards;
