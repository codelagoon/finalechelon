import React from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import FinalCTA from '../components/FinalCTA';

const Analysts = () => {
  return (
    <div className="page-shell-final">
      <PageIntro
        eyebrow="Join Echelon Equity"
        title="Build Real Experience Across Investment and Operating Roles"
        lead="Echelon Equity offers multiple pathways for students to contribute—from equity research and technical analysis to leadership, fundraising, and marketing roles."
        supportingText="Every role is selective, clearly scoped, and expected to contribute real work. We evaluate based on judgment, communication, and reliable execution."
        links={[
          { to: "/apply", label: "Apply to join Echelon" },
          { to: "/newsletter", label: "View published research" },
        ]}
      />

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Open Roles</h2>
          <p className="section-subtitle-final" style={{ marginBottom: '2rem' }}>
            Applications are open across the investment team and selected operating roles.
          </p>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Equity Research Analyst</h3>
              <p className="content-card-copy-final">
                Build company research, valuation work, and formal investment memos under review. Work through filings, earnings calls, competitive positioning, and thesis support.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Technical Analyst</h3>
              <p className="content-card-copy-final">
                Track price action, structure, momentum, and technical setups across names under coverage. Translate charts into disciplined trade framing and risk-aware market commentary.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Macro Policy Analyst</h3>
              <p className="content-card-copy-final">
                Monitor macro developments, central bank policy, and regulation that affect markets. Write concise views that connect policy change to sectors, risk, and positioning.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Leadership</h3>
              <p className="content-card-copy-final">
                Help drive standards, accountability, recruiting, and cross-functional execution. Own decisions that affect member experience and organizational quality.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Fundraising</h3>
              <p className="content-card-copy-final">
                Support sponsorship, donor, and partnership efforts that expand the platform's reach. Build organized outreach, track conversations, and help position the organization professionally.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Marketing / Content</h3>
              <p className="content-card-copy-final">
                Shape Echelon Equity's outward-facing presence across written content, social, and brand materials. Turn research, team updates, and events into clear public communication.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">What You'll Do</h2>
          <div className="content-grid-final what-youll-do-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Investment Team Work</h3>
              <p className="content-card-copy-final">
                Research analysts build financial models, write investment memos, and develop valuation skills. Technical and macro analysts focus on market patterns and policy-driven sector impacts.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Operating Team Work</h3>
              <p className="content-card-copy-final">
                Leadership, fundraising, and marketing roles drive organizational growth, partnerships, and brand presence. These roles require strong communication and project management.
              </p>
            </article>
            <article className="content-card-final what-youll-do-centered-final">
              <h3 className="content-card-title-final">Collaborative Environment</h3>
              <p className="content-card-copy-final">
                All roles work in a feedback-driven environment. Work is reviewed by peers and leadership, with clear standards for quality and accountability.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Expectations</h2>
          <div className="content-grid-final expectations-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Quality Standards</h3>
              <p className="content-card-copy-final">
                All work is reviewed against institutional standards for clarity, structure, and execution. Members are expected to iterate based on feedback.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Consistent Output</h3>
              <p className="content-card-copy-final">
                Members meet regular deadlines and produce work that demonstrates improvement over time. Reliability is as important as skill.
              </p>
            </article>
            <article className="content-card-final expectations-centered-final">
              <h3 className="content-card-title-final">Collaboration</h3>
              <p className="content-card-copy-final">
                Work is reviewed by peers and leadership. Members participate in feedback sessions, share knowledge, and contribute to team standards.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Benefits</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Real Portfolio Work</h3>
              <p className="content-card-copy-final">
                Build a portfolio of actual work—models, memos, analysis, or campaign materials—that demonstrates your capabilities to employers.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Professional Feedback</h3>
              <p className="content-card-copy-final">
                Receive direct, actionable feedback from experienced peers and leadership that helps you improve faster than self-study alone.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Credible Experience</h3>
              <p className="content-card-copy-final">
                Gain experience that signals serious commitment to your field, distinguishing you from other candidates in recruiting processes.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Network Access</h3>
              <p className="content-card-copy-final">
                Join a community of ambitious students and recent graduates who are serious about careers in finance, marketing, and operations.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Program Structure</h2>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '0 auto 1.5rem' }}>
            The program runs with 3 weekly sessions where we go over skills, teach concepts, and host guest speakers from the finance industry.
          </p>
          <div className="content-grid-final program-structure-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Skill Building</h3>
              <p className="content-card-copy-final">
                Hands-on sessions focused on practical skills like financial modeling, valuation techniques, memo writing, and technical analysis.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Concept Teaching</h3>
              <p className="content-card-copy-final">
                Structured lessons on core finance concepts, market dynamics, sector analysis, and investment frameworks from a practitioner's perspective.
              </p>
            </article>
            <article className="content-card-final program-structure-centered-final">
              <h3 className="content-card-title-final">Guest Speakers</h3>
              <p className="content-card-copy-final">
                Regular talks from professionals across investment research, asset management, and related fields who share real-world insights and career guidance.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Who Should Apply</h2>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '0 auto 1.5rem' }}>
            The strongest candidates are curious, coachable, and consistent. We value judgment and communication over prior experience or credentials.
          </p>
          <div className="content-grid-final who-should-apply-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Detail-Oriented Thinkers</h3>
              <p className="content-card-copy-final">
                Members must be comfortable working with details—whether numbers, assumptions, campaign metrics, or partnership pipelines. Precision matters across all roles.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Clear Communicators</h3>
              <p className="content-card-copy-final">
                Whether writing research memos, crafting marketing copy, or managing donor relationships, strong communication skills and the ability to explain complex ideas simply are essential.
              </p>
            </article>
            <article className="content-card-final who-should-apply-centered-final">
              <h3 className="content-card-title-final">Coachable Learners</h3>
              <p className="content-card-copy-final">
                The program is built on feedback. Members must be open to critique, willing to iterate, and committed to continuous improvement.
              </p>
            </article>
          </div>
        </div>
      </section>

      <div className="program-cta-section page-cta-section-final">
        <div className="content-container-final page-cta-panel-final">
          <h2 className="page-cta-title-final">Ready to Apply?</h2>
          <p className="page-cta-subtitle-final">
            Join the next cohort and start building real experience across investment and operating roles.
          </p>
          <Link
            to="/apply"
            className="page-cta-button-final page-cta-button-dark-final"
          >
            Submit Application
          </Link>
        </div>
      </div>

      <FinalCTA />
    </div>
  );
};

export default Analysts;
