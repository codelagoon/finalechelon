import React from "react";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Positioning from "./components/Positioning";
import Portfolio from "./components/Portfolio";
import WhatYouDo from "./components/WhatYouDo";
import AnalystWork from "./components/AnalystWork";
import Review from "./components/Review";
import Standards from "./components/Standards";
import Partnerships from "./components/Partnerships";
import Tracks from "./components/Tracks";
import Selection from "./components/Selection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Positioning />
        <Portfolio />
        <WhatYouDo />
        <AnalystWork />
        <Review />
        <Standards />
        <Partnerships />
        <Tracks />
        <Selection />
        <FinalCTA />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
