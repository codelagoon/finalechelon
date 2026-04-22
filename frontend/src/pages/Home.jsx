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
import HalDealCTA from '../components/HalDealCTA';

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
      <HalDealCTA />
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
    </>
  );
};

export default Home;
