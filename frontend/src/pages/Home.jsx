import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import HomeOverview from '../components/HomeOverview';
import Positioning from '../components/Positioning';
import WhatYouDo from '../components/WhatYouDo';
import Standards from '../components/Standards';
import AnalystWork from '../components/AnalystWork';
import Review from '../components/Review';
import Partnerships from '../components/Partnerships';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <HomeOverview />
      <Positioning />
      <WhatYouDo />
      <Standards />
      <AnalystWork />
      <Review />
      <Partnerships />
      <FinalCTA />
    </>
  );
};

export default Home;
