import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Program from "./pages/Program";
import PortfolioPage from "./pages/PortfolioPage";
import Apply from "./pages/Apply";
import Members from "./pages/Members";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/program" element={<Program />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/members" element={<Members />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
