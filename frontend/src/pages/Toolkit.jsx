import React from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import { Download, ChevronRight } from 'lucide-react';

const Toolkit = () => {
  const resources = [
    {
      title: "Stock Pitch Template",
      description: "A structured template for communicating a core investment thesis with company overview, investment thesis, key catalysts, valuation summary, risks, and final recommendation.",
      category: "FrameworkTemplate",
      downloadInfo: "PDF template",
      file: "/downloads/investor-toolkit/stock-pitch-template.html"
    },
    {
      title: "Equity Research Report Template",
      description: "Full research report structure including executive summary, company description, industry overview, business model, financial analysis, valuation, risks, and appendix.",
      category: "FrameworkTemplate",
      downloadInfo: "PDF template",
      file: "/downloads/investor-toolkit/equity-research-report-template.html"
    },
    {
      title: "DCF Model Template",
      description: "Excel-compatible template with tabs for assumptions, income statement forecast, free cash flow, WACC, terminal value, and valuation summary with sensitivity analysis.",
      category: "ModelTemplate",
      downloadInfo: "Excel template",
      file: "/downloads/investor-toolkit/dcf-model-template.csv"
    },
    {
      title: "Comparable Companies Template",
      description: "Excel template for analyzing peer companies with columns for market cap, revenue, EBITDA, net income, and key multiples (EV/Revenue, EV/EBITDA, P/E).",
      category: "ModelTemplate",
      downloadInfo: "Excel template",
      file: "/downloads/investor-toolkit/comparable-companies-template.csv"
    },
    {
      title: "Financial Statement Guide",
      description: "Beginner-friendly guide explaining income statement, balance sheet, cash flow statement, MD&A, and common ratios including P/E, debt-to-equity, operating margin, and working capital.",
      category: "Guide",
      downloadInfo: "PDF guide",
      file: "/downloads/investor-toolkit/financial-statement-guide.html"
    },
    {
      title: "SEC EDGAR Research Checklist",
      description: "Comprehensive checklist for SEC filings research: how to find 10-K and 10-Q filings, what sections to read first (risk factors, MD&A, financial statements), and red flags to watch for.",
      category: "Checklist",
      downloadInfo: "PDF checklist",
      file: "/downloads/investor-toolkit/sec-edgar-research-checklist.html"
    },
  ];

  const learningPaths = [
    {
      level: "Foundational",
      description: "Getting started with financial modeling and valuation",
      items: [
        "Financial statement walkthrough (Form 10-K, 10-Q)",
        "Basic valuation methods overview",
        "Intro to DCF logic and terminal value",
        "How to read equity research"
      ]
    },
    {
      level: "Intermediate",
      description: "Building models, refining thesis, and writing analysis",
      items: [
        "Revenue modeling from segment data",
        "Margin driver analysis and forecasting",
        "Multi-method valuation (DCF, comps, transactions)",
        "Constructing a credible thesis"
      ]
    },
    {
      level: "Advanced",
      description: "Advanced techniques and investment applications",
      items: [
        "Sensitivity analysis and scenario modeling",
        "Distressed / restructuring analysis",
        "Merger arbitrage and deal analysis",
        "Publishing institutional-quality research"
      ]
    }
  ];

  return (
    <div className="page-shell-final">
      <PageIntro
        eyebrow="Investor toolkit"
        title="Student Investor Toolkit & Resources"
        lead="Curated downloadable templates, checklists, and learning guides for building financial models, writing investment memos, and developing disciplined research process."
        supportingText="These resources are designed to align with Echelon Equity standards and support analysts from first pitch through published research."
        links={[
          { to: "/toolkit/dcf-builder", label: "Build a DCF interactively" },
        ]}
      />

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Templates & Frameworks</h2>
          <p className="positioning-paragraph-final" style={{ marginBottom: '2rem' }}>
            Ready-to-use templates to structure your analysis and communication.
          </p>
          <div className="toolkit-resources">
            {resources.map((resource, idx) => (
              <div key={idx} className="toolkit-resource-card">
                <div className="resource-header">
                  <h3 className="resource-title">{resource.title}</h3>
                  <Download size={18} className="resource-icon" />
                </div>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-footer">
                  <span className="resource-category">{resource.downloadInfo}</span>
                  <a href={resource.file} download className="resource-download-btn">
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Learning Paths by Skill Level</h2>
          <p className="positioning-paragraph-final" style={{ marginBottom: '2rem' }}>
            Self-directed learning sequences to build depth in financial modeling and investment analysis.
          </p>
          <div className="learning-paths">
            {learningPaths.map((path, idx) => (
              <div key={idx} className="learning-path-card">
                <div className="path-header">
                  <h3 className="path-level">{path.level}</h3>
                  <p className="path-description">{path.description}</p>
                </div>
                <ul className="path-items">
                  {path.items.map((item, i) => (
                    <li key={i}>
                      <ChevronRight size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Interactive Tools</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Build a DCF</h3>
              <p className="content-card-copy-final">
                Step-by-step DCF builder that shows you exactly how assumptions flow through revenue, margins, cash flow, and valuation output.
              </p>
              <Link to="/toolkit/dcf-builder" className="inline-link-final" style={{ marginTop: '1rem', display: 'inline-block' }}>
                Open DCF builder →
              </Link>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Research Stack</h3>
              <p className="content-card-copy-final">
                Directory of free and paid tools used by institutional investors for financial modeling, data analysis, and research workflow.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-gray-text)' }} className="content-card-copy-final">
                Coming soon
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Valuation Glossary</h3>
              <p className="content-card-copy-final">
                Quick reference for key valuation terms, formulas, and concepts: WACC, terminal value, multiples, implied returns.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-gray-text)' }} className="content-card-copy-final">
                Coming soon
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">For Echelon Equity Analysts</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Publication Checklist</h3>
              <p className="content-card-copy-final">
                Final verification that your memo meets standards: thesis clarity, assumption documentation, valuation support, and writing quality.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Style Guide</h3>
              <p className="content-card-copy-final">
                Echelon Equity documentation standards: formatting, terminology, footnote conventions, and common style decisions.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Model Documentation Template</h3>
              <p className="content-card-copy-final">
                Excel-ready template for documenting model inputs, key formulas, and assumptions so reviewers can quickly understand your work.
              </p>
            </article>
          </div>
        </div>
      </section>

      <div className="page-cta-section-final">
        <div className="content-container-final page-cta-panel-final">
          <h2 className="page-cta-title-final">Apply to Become an Echelon Analyst</h2>
          <p className="page-cta-subtitle-final">
            Download templates, work through learning sequences, and apply your skills to produce institutional-quality research.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link
              to="/apply"
              className="page-cta-button-final page-cta-button-dark-final"
            >
              Apply to Echelon Equity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolkit;
