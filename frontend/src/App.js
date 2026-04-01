import React from "react";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Mission from "./components/Mission";
import ProgramTracks from "./components/ProgramTracks";
import Portfolio from "./components/Portfolio";
import WhatYouDo from "./components/WhatYouDo";
import Reviewers from "./components/Reviewers";
import Standards from "./components/Standards";
import ApplicationProcess from "./components/ApplicationProcess";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Careers from "./components/Careers";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Mission />
        <div id="tracks">
          <ProgramTracks />
        </div>
        <Portfolio />
        <WhatYouDo />
        <Reviewers />
        <Standards />
        <ApplicationProcess />
        <Testimonials />
        <FAQ />
        <div id="careers">
          <Careers />
        </div>
        <FinalCTA />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
