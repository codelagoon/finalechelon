import React from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import { Download, ChevronRight } from 'lucide-react';

const Toolkit = () => {
  const resources = [
    {
      title: "Stock Pitch Template",
      description: "A structured 1-page template for communicating a core investment thesis with key valuation outputs and risk factors.",
      category: "FrameworkTemplate",
      downloadInfo: "PDF template"
    },
    {
      title: "Investment Memo Framework",
      description: "Full memo structure including sections for company overview, valuation analysis, bull/bear cases, and risk summary.",
      category: "FrameworkTemplate",
      downloadInfo: "Word document"
    },
    {
      title: "DCF Model Checklist",
      description: "Step-by-step checklist for building a defensible DCF model: revenue build, margin assumptions, discount rate, terminal value.",
      category: "Checklist",
      downloadInfo: "Downloadable checklist"
    },
    {
      title: "Comparable Companies Checklist",
      description: "Framework for selecting, analyzing, and using comparable companies to validate valuation multiples and identify outliers.",
      category: "Checklist",
      downloadInfo: "Downloadable checklist"
    },
    {
      title: "Earnings Note Template",
      description: "Quick reference template for post-earnings analysis: key metrics, management guidance, analyst estimates, and verdict.",
      category: "FrameworkTemplate",
      downloadInfo: "Google Docs template"
    },
    {
      title: "Research Process Checklist",
      description: "End-to-end checklist covering prep work, primary research, financial modeling, memo drafting, and submission readiness.",
      category: "Checklist",
      downloadInfo: "Interactive checklist"
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
          { to: "/standards", label: "Review publication standards" },
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
                  <button className="resource-download-btn">
                    Download
                  </button>
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
              <p style={{ marginTop: '1rem' }} className="content-card-copy-final" style={{ fontSize: '0.9rem', color: 'var(--color-gray-text)' }}>
                Coming soon
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Valuation Glossary</h3>
              <p className="content-card-copy-final">
                Quick reference for key valuation terms, formulas, and concepts: WACC, terminal value, multiples, implied returns.
              </p>
              <p style={{ marginTop: '1rem' }} className="content-card-copy-final" style={{ fontSize: '0.9rem', color: 'var(--color-gray-text)' }}>
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
          <h2 className="page-cta-title-final">Build Your Research Skills</h2>
          <p className="page-cta-subtitle-final">
            Download templates, work through learning sequences, and experiment with the DCF builder to strengthen your analysis.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link
              to="/toolkit/dcf-builder"
              className="page-cta-button-final page-cta-button-dark-final"
            >
              Try the DCF Builder
            </Link>
            <Link
              to="/apply"
              className="page-cta-button-final"
              style={{ backgroundColor: 'transparent', color: 'var(--color-black)', border: '1px solid var(--color-black)' }}
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
