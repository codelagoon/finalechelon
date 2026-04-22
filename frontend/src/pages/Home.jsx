import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import NewsletterSignupCta from '../components/newsletter/NewsletterSignupCta';

const PartnerTrustStrip = lazy(() => import('../components/PartnerTrustStrip'));
const Stats = lazy(() => import('../components/Stats'));
const HomeOverview = lazy(() => import('../components/HomeOverview'));
const Positioning = lazy(() => import('../components/Positioning'));
const WhatYouDo = lazy(() => import('../components/WhatYouDo'));
const Standards = lazy(() => import('../components/Standards'));
const AnalystWork = lazy(() => import('../components/AnalystWork'));
const Review = lazy(() => import('../components/Review'));
const Partnerships = lazy(() => import('../components/Partnerships'));
const FinalCTA = lazy(() => import('../components/FinalCTA'));

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
      <Suspense fallback={null}>
        <PartnerTrustStrip />
        <Stats />
        <HomeOverview />
        <Positioning />
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
      </Suspense>
    </>
  );
};

export default Home;
