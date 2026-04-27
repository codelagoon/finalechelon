import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RouteManager from "./components/RouteManager";

import Home from "./pages/Home";

const Program = lazy(() => import("./pages/Program"));
const Apply = lazy(() => import("./pages/Apply"));
const Team = lazy(() => import("./pages/Team"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const NewsletterArchive = lazy(() => import("./pages/NewsletterArchive"));
const NewsletterIssueDetail = lazy(() => import("./pages/NewsletterIssueDetail"));
const NewsletterAdmin = lazy(() => import("./pages/NewsletterAdmin"));
const Toolkit = lazy(() => import("./pages/Toolkit"));
const WhyStudentFinanceIsWeak = lazy(() => import("./pages/WhyStudentFinanceIsWeak"));
const DCFBuilder = lazy(() => import("./pages/DCFBuilder"));
const About = lazy(() => import("./pages/About"));
const Analysts = lazy(() => import("./pages/Analysts"));

function App() {
  return (
    <BrowserRouter>
      <RouteManager />
      <div className="App">
        <Header />
        <main id="main-content">
          <Suspense
            fallback={
              <div className="route-loading-final">
                <div className="content-container-final">
                  <p>Loading page...</p>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/analysts" element={<Analysts />} />
              <Route path="/program" element={<Program />} />
              <Route path="/team" element={<Team />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/newsletter/archive" element={<NewsletterArchive />} />
              <Route path="/newsletter/:issueId" element={<NewsletterIssueDetail />} />
              <Route path="/newsletter/admin" element={<NewsletterAdmin />} />
              <Route path="/toolkit" element={<Toolkit />} />
              <Route path="/why-student-finance-work-is-weak" element={<WhyStudentFinanceIsWeak />} />
              <Route path="/toolkit/dcf-builder" element={<DCFBuilder />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
