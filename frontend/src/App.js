import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RouteManager from "./components/RouteManager";

import Home from "./pages/Home";
import Program from "./pages/Program";
import PortfolioPage from "./pages/PortfolioPage";
import Apply from "./pages/Apply";
import Team from "./pages/Team";
import Newsletter from "./pages/Newsletter";
import NewsletterArchive from "./pages/NewsletterArchive";
import NewsletterAdmin from "./pages/NewsletterAdmin";

function App() {
  return (
    <BrowserRouter>
      <RouteManager />
      <div className="App">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/program" element={<Program />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/newsletter/archive" element={<NewsletterArchive />} />
            <Route path="/newsletter/admin" element={<NewsletterAdmin />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
