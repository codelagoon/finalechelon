import React from 'react';
import Hero from '../components/Hero';
import PartnerTrustStrip from '../components/PartnerTrustStrip';
import Stats from '../components/Stats';
import HomeOverview from '../components/HomeOverview';
import Positioning from '../components/Positioning';
import WhatYouDo from '../components/WhatYouDo';
import Standards from '../components/Standards';
import AnalystWork from '../components/AnalystWork';
import Review from '../components/Review';
import Partnerships from '../components/Partnerships';
import FinalCTA from '../components/FinalCTA';
import NewsletterSignupCta from '../components/newsletter/NewsletterSignupCta';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Hero />
      <NewsletterSignupCta
        className="home-hero-newsletter-cta-final"
        eyebrow="For readers who want the research without the application"
        title="Get Echelon's market notes before you apply"
        description="A concise weekly letter with student-led equity research, memo highlights, and market context for readers who are still deciding whether to join the program."
        source="homepage-hero"
        segment="homepage-reader"
        buttonLabel="Subscribe to Notes"
        helperText="Built for readers. Unsubscribable anytime."
      />
      <PartnerTrustStrip />
      <Stats />
      <HomeOverview />
      <Positioning />
      <section className="content-section-final">
        <div className="content-container-final">
          <h2 className="section-title-final">Student-Led Equity Research With Clear Next Steps</h2>
          <p className="positioning-paragraph-final" style={{ maxWidth: '860px', margin: '0 auto 1.25rem' }}>
            Echelon Equity is designed for students who want to build real investment research output. Each page below helps you evaluate fit before applying.
          </p>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">Investment research program</h3>
              <p className="content-card-copy-final">
                Review how the analyst development process works, what standards are expected, and how selection decisions are made.
              </p>
              <Link to="/program" className="inline-link-final">Explore the investment research program</Link>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Research portfolio and coverage</h3>
              <p className="content-card-copy-final">
                See current coverage areas, valuation-first research work, and examples of published analyst thinking across sectors.
              </p>
              <Link to="/portfolio" className="inline-link-final">Browse the research portfolio</Link>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Analyst team credibility</h3>
              <p className="content-card-copy-final">
                Meet the analyst and leadership profiles responsible for maintaining quality control and research communication standards.
              </p>
              <Link to="/team" className="inline-link-final">Meet the analyst team</Link>
            </article>
          </div>
        </div>
      </section>
      <WhatYouDo />
      <Standards />
      <AnalystWork />
      <NewsletterSignupCta
        eyebrow="Before you apply"
        title="Stay close to the work"
        description="Follow the research cadence, observe the standards, and see whether the program is a fit before you submit an application."
        source="homepage-analyst-work"
        segment="homepage-pre-apply"
        buttonLabel="Join the Newsletter"
        helperText="Low-friction, high-signal updates from the research team."
      />
      <Review />
      <Partnerships />
      <FinalCTA />
    </>
  );
};

export default Home;
