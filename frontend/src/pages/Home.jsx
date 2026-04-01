import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Positioning from '../components/Positioning';
import Review from '../components/Review';
import Partnerships from '../components/Partnerships';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Positioning />
      <Review />
      <Partnerships />
      <FinalCTA />
    </>
  );
};

export default Home;
