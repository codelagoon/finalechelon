import React from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import FinalCTA from '../components/FinalCTA';

const About = () => {
  return (
    <div className="page-shell-final">
      <PageIntro
        eyebrow="About Echelon Equity"
        title="A Student-Led Equity Research Network"
        lead="Echelon Equity is a student investment network that helps ambitious students build real investing experience through structured equity research programs, institutional-grade standards, and peer review."
        supportingText="We exist to bridge the gap between academic finance and professional investment research by providing students with real-world experience producing valuation models, investment memos, and market analysis."
        links={[
          { to: "/analysts", label: "Learn about the analyst program" },
          { to: "/apply", label: "Apply to join" },
        ]}
      />

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Our Mission</h2>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '0 auto 1.5rem' }}>
            Echelon Equity's mission is to create a credible, structured pathway for students to develop institutional-grade investment research skills. We believe that serious students deserve access to real research experience—not just theoretical coursework.
          </p>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '0 auto' }}>
            By maintaining high standards for output, structure, and review, we ensure that every analyst who completes our program builds work that demonstrates professional-level judgment and analytical capability.
          </p>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Who It's For</h2>
          <p className="section-subtitle-final" style={{ marginBottom: '2rem' }}>
            Echelon Equity is designed for high school and college students from 9th grade through college junior year.
          </p>
          <div className="content-grid-final who-for-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">High School Students</h3>
              <p className="content-card-copy-final">
                Students in 9th through 12th grade who are curious about finance and want to build real investment research experience before college.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">College Students</h3>
              <p className="content-card-copy-final">
                College freshmen through juniors who want to move beyond classroom theory and build practical investment research skills for internships and careers.
              </p>
            </article>
            <article className="content-card-final who-for-centered-final">
              <h3 className="content-card-title-final">Dedicated Learners</h3>
              <p className="content-card-copy-final">
                Students who have demonstrated commitment in an area of interest—whether through projects, competitions, self-study, or extracurricular activities—and want to apply that dedication to investment research.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">What Makes Echelon Different</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Output Over Credentials</h3>
              <p className="content-card-copy-final">
                We evaluate based on the quality of your work, not your school name or resume. Every analyst is expected to produce real research that stands up to review.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Institutional Standards</h3>
              <p className="content-card-copy-final">
                Our review process mirrors professional expectations. Models, memos, and analysis are evaluated for clarity, structure, and valuation discipline.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Peer Accountability</h3>
              <p className="content-card-copy-final">
                Analysts work in a collaborative environment where feedback is direct, standards are clear, and everyone is expected to contribute at a high level.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Team Connection</h3>
              <p className="content-card-copy-final">
                We value team chemistry and connection because we're all young students who love finance. The community is built on shared passion, mutual support, and genuine friendships.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Leadership Team</h2>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '0 auto 1.5rem' }}>
            Echelon Equity is led by a team of experienced students and recent graduates who are committed to raising the standard of student-led investment research.
          </p>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Investment Team Leadership</h3>
              <p className="content-card-copy-final">
                Responsible for maintaining research standards, overseeing coverage areas, and ensuring that all published work meets institutional expectations.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Operations & Recruiting</h3>
              <p className="content-card-copy-final">
                Manages application processes, onboarding, and the overall member experience to ensure that every analyst has the support they need to succeed.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Program Development</h3>
              <p className="content-card-copy-final">
                Continuously improves the curriculum, training resources, and review frameworks to keep the program aligned with professional standards.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Fundraising</h3>
              <p className="content-card-copy-final">
                Leads sponsorship, donor, and partnership efforts to expand the platform's reach and ensure sustainable growth for the organization.
              </p>
            </article>
          </div>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '1.5rem auto 0' }}>
            To meet the current analyst team, visit the <Link to="/team" className="inline-link-final">team page</Link>.
          </p>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
};

export default About;
