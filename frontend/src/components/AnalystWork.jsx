import React from 'react';

const analystWorkSamples = [
  {
    id: 1,
    title: "Three-Statement Model — 10-K Integration",
    description: "Integrated financials built directly from public filings."
  },
  {
    id: 2,
    title: "LBO Analysis — TransDigm Group",
    description: "Leverage structure, debt schedule, IRR scenarios, and exit multiples."
  },
  {
    id: 3,
    title: "Investment Memo — Visa Inc.",
    description: "Positioning, competitive moat, risk factors, and valuation range."
  },
  {
    id: 4,
    title: "DCF Valuation — Palantir Technologies",
    description: "Revenue projections, margin expansion assumptions, terminal value sensitivity."
  }
];

const AnalystWork = () => {
  return (
    <section className="analyst-work-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">Recent Analyst Work</h2>
        <p className="section-subtitle-final">Selected excerpts from current analyst output.</p>
        <div className="analyst-work-grid-final">
          {analystWorkSamples.map((sample) => (
            <div key={sample.id} className="work-sample-card-final">
              <h3 className="work-sample-title-final">{sample.title}</h3>
              <p className="work-sample-description-final">{sample.description}</p>
            </div>
          ))}
        </div>
        <p className="analyst-work-footer-final">Full materials are internal.</p>
      </div>
    </section>
  );
};

export default AnalystWork;
