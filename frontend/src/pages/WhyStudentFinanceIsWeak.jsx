import React from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';

const WhyStudentFinanceIsWeak = () => {
  return (
    <div className="page-shell-final">
      <PageIntro
        eyebrow="Research positioning"
        title="Why Most Student Finance Work is Weak"
        lead="A sharp critique of what makes student-authored financial analysis fall short—and how Echelon Equity is fundamentally different."
        supportingText="The gap between student research and publishable work is not talent. It's process."
        links={[
          { to: "/program", label: "Learn about our program" },
        ]}
      />

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">The Problem: A Diagnosis</h2>
          <div className="problem-grid">
            <article className="problem-card">
              <h3>Surface-level commentary, no analysis</h3>
              <p>
                Most student coverage restates company news, recaps earnings results, or summarizes quarterly metrics. It's summarization, not analysis. Readers don't gain new insight.
              </p>
              <p className="example">
                <strong>Weak:</strong> "Apple reported iPhone sales up 15% YoY, beating expectations. Services revenue grew 10%." 
              </p>
              <p className="example">
                <strong>Strong:</strong> "iPhone growth is decelerating. Services expansion is offset by reduced unit volumes in emerging markets. At $2 trillion market cap, valuation leaves limited upside unless Services reaches 50% of revenue by 2028."
              </p>
            </article>

            <article className="problem-card">
              <h3>No explicit assumptions</h3>
              <p>
                Valuations lack documented reasoning. Margins assumptions appear without justification. Discount rates are guessed. A reader cannot replicate or challenge the analysis.
              </p>
              <p className="example">
                <strong>Weak:</strong> "Using DCF, I calculate a fair value of $150/share."
              </p>
              <p className="example">
                <strong>Strong:</strong> "DCF using 12% WACC (reflecting 5-year beta of 1.2 and 40bps equity risk premium), 7% terminal growth (vs. 2.5% GDP), and 5-year revenue CAGR of 8% (below historical 10% but reflecting market saturation). Fair value: $150."
              </p>
            </article>

            <article className="problem-card">
              <h3>Weak valuation discipline</h3>
              <p>
                Assumptions are not stress-tested. Comparable companies analysis is sloppy. Terminal values drive output but are never justified. The conclusion is often pre-determined; the model just reaches it.
              </p>
              <p className="example">
                <strong>Weak:</strong> "Using 15x revenue multiple and 10x EBITDA multiple, the company is worth $180/share."
              </p>
              <p className="example">
                <strong>Strong:</strong> "Comparable healthcare software companies trade at 8-12x revenue. This player's higher margins and faster growth justify 12x, but not 15x. Downside sensitivity: if churn accelerates, multiples compress to 8x (≈$120)."
              </p>
            </article>

            <article className="problem-card">
              <h3>Lack of editorial review</h3>
              <p>
                Most student work is published with zero external review. Errors propagate. Logic gaps go unnoticed. Writing is unclear because no one asked for clarification.
              </p>
              <p className="example">
                Unreviewed student note: "The company will grow 20% annually forever" (terminal value issue). Reviewed version: "Growth will normalize to 5% by year 10 due to market maturity, supported by peer precedent."
              </p>
            </article>

            <article className="problem-card">
              <h3>No repeatable process</h3>
              <p>
                Each piece of work starts from zero. There's no standard for how to build models, what to research, how to structure memos, or when work is ready to share. Consistency suffers.
              </p>
            </article>

            <article className="problem-card">
              <h3>No accountability for quality</h3>
              <p>
                Student research often lives on Medium, Substack, or personal sites with zero attribution accountability. If a thesis is wrong, there's no reputational consequence.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">The Echelon Equity Difference</h2>
          <div className="solution-grid">
            <div className="solution-column">
              <h3>Process Over Heroics</h3>
              <p>
                We don't bet on individual genius. We design a repeatable research workflow: company research → model build → memo draft → editorial review → publication. Every analyst follows the same process.
              </p>
              <p>
                <strong>Output:</strong> Consistency. New readers know what to expect.
              </p>
            </div>

            <div className="solution-column">
              <h3>Standards for Assumptions</h3>
              <p>
                Every value is documented. Revenue assumptions trace back to segment data and growth trends. Margins reflect historical range and competitive dynamics. Discount rates are calculated, not guessed.
              </p>
              <p>
                <strong>Output:</strong> Defensibility. We can justify every input.
              </p>
            </div>

            <div className="solution-column">
              <h3>Rigor, Not Speed</h3>
              <p>
                We do not rush publication. A memo takes 3-6 weeks from draft to publication. Multiple reviews occur. Feedback is incorporated. The process is visible to analysts so they understand why it matters.
              </p>
              <p>
                <strong>Output:</strong> Publishable work. Research that won't embarrass readers or authors.
              </p>
            </div>

            <div className="solution-column">
              <h3>Editorial Review</h3>
              <p>
                Every piece undergoes model review (senior analyst), memo review (editorial team), and revision before publication. It's not optional; it's required.
              </p>
              <p>
                <strong>Output:</strong> Error reduction. Unclear thinking gets caught early.
              </p>
            </div>

            <div className="solution-column">
              <h3>Attribution & Accountability</h3>
              <p>
                Analyst names are published with their work. We archive work permanently. If a thesis is wrong, it stays visible so we learn from it and readers can trace our thinking over time.
              </p>
              <p>
                <strong>Output:</strong> Accountability. Teams take their own work seriously.
              </p>
            </div>

            <div className="solution-column">
              <h3>Training Loop</h3>
              <p>
                Feedback is systematic. Analysts receive detailed editorial comments, are expected to incorporate them, and track improvement over time. The first memo is rarely publishable; the tenth is.
              </p>
              <p>
                <strong>Output:</strong> Growth. Analysts get better because they're required to.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">How This Changes the Game</h2>
          <div className="impact-statement">
            <p className="big-claim">
              When a student research team operates with institutional process, institutional standards, and institutional accountability, the output becomes genuinely publishable.
            </p>
            <p className="supporting-claim">
              Readers trust it. Investors reference it. Universities notice. Careers are built on it.
            </p>
          </div>
          <div className="content-grid-final" style={{ marginTop: '3rem' }}>
            <article className="content-card-final">
              <h3 className="content-card-title-final">For analysts</h3>
              <p className="content-card-copy-final">
                You learn how institutional research teams actually work. Your published work becomes portfolio material for investment roles or finance careers.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">For readers</h3>
              <p className="content-card-copy-final">
                Research you can trust. Clear theses backed by valuation discipline. No fluff, no excuses. You know exactly how we got to our conclusion.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">For finance</h3>
              <p className="content-card-copy-final">
                Proof that process matters more than individual talent. A template for student investment teams everywhere to raise their standard.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">See It In Practice</h2>
          <div className="comparison-section">
            <p className="positioning-paragraph-final" style={{ marginBottom: '1.5rem' }}>
              Compare our standards, research coverage, and team profiles to understand what institutional-quality student research looks like.
            </p>
            <div className="cta-links" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/newsletter" className="comparison-link">
                Browse Research Portfolio →
              </Link>
              <Link to="/team" className="comparison-link">
                View Analyst Profiles →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="page-cta-section-final">
        <div className="content-container-final page-cta-panel-final">
          <h2 className="page-cta-title-final">Ready to Work at Our Standard?</h2>
          <p className="page-cta-subtitle-final">
            We're recruiting analysts who are curious, coachable, and committed to publishing disciplined research. Join the team.
          </p>
          <Link
            to="/apply"
            className="page-cta-button-final page-cta-button-dark-final"
          >
            View Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyStudentFinanceIsWeak;
