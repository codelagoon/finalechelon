import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="page-shell-final">
      {/* Section 1 — Founders */}
      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Founders</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '50%', 
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: '#666',
                textAlign: 'center'
              }}>
                george-photo.jpg
              </div>
              <h3 className="content-card-title-final">George — Head of Operations</h3>
              <p className="content-card-copy-final">
                George is a sophomore in New York who oversees operations across all 32 analysts at Echelon. He also founded Avarent, an AI governance platform for lending, and leads a Financial Literacy club at his school. He built Echelon because he wanted a program that held students to real standards — not simulated ones.
              </p>
            </article>
            <article className="content-card-final">
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '50%', 
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: '#666',
                textAlign: 'center'
              }}>
                jonathan-photo.jpg
              </div>
              <h3 className="content-card-title-final">Jonathan Silva — Head of Research</h3>
              <p className="content-card-copy-final">
                Jonathan leads all research operations at Echelon, overseeing analyst output across six sector tracks. He co-founded the program with George with one goal: to produce equity research that could stand next to professional work. He sets the standard for valuation discipline and memo structure — and expects analysts to meet it.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Section 2 — Founding story */}
      <section className="content-section-final">
        <div className="content-container-final page-shell-narrow-final">
          <h2 className="section-title-final">Why we built this</h2>
          <p className="positioning-paragraph-final">
            Most student finance programs are résumé lines. You join, you sit through a few meetings, you call yourself an analyst. We wanted something different — a program where the work actually meant something, where analysts had real coverage, real accountability, and something they could genuinely point to. So we built it from scratch. Sector structure, editorial standards, Wall Street reviewers, the whole thing. Echelon is what we wished existed when we started.
          </p>
        </div>
      </section>

      {/* Section 3 — Stat strip */}
      <section className="stats-section-final">
        <div className="stats-container-final">
          <div className="stat-item-final">
            <div className="stat-value-final">32</div>
            <div className="stat-label-final">Analysts</div>
          </div>
          <div className="stat-item-final">
            <div className="stat-value-final">6</div>
            <div className="stat-label-final">Sectors</div>
          </div>
          <div className="stat-item-final">
            <div className="stat-value-final">200+</div>
            <div className="stat-label-final">Applications</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
