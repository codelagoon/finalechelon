import React from 'react';
import Hero from '../components/Hero';
import PartnerTrustStrip from '../components/PartnerTrustStrip';
import Stats from '../components/Stats';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Hero />
      
      {/* Why we built this section */}
      <section className="content-section-final">
        <div className="content-container-final page-shell-narrow-final">
          <h2 className="section-title-final">Why we built this</h2>
          <p className="positioning-paragraph-final">
            We started Echelon because every student finance program we'd seen was either a club or a costume. We wanted something that actually functioned like a firm — real coverage, real structure, real accountability. That meant building the whole thing ourselves: a sector model, an editorial process, a leadership hierarchy, and standards we'd be embarrassed to publish below.
          </p>
        </div>
      </section>

      <PartnerTrustStrip />
      <Stats />
      
      {/* Simple content grid */}
      <section className="content-section-final">
        <div className="content-container-final">
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">How it works</h3>
              <p className="content-card-copy-final">
                32 analysts across six sector tracks. Real company coverage. Wall Street review. No simulations.
              </p>
              <Link to="/program" className="inline-link-final">See how it works</Link>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Our research</h3>
              <p className="content-card-copy-final">
                Goldman Sachs–style investment memos on real companies, published after professional review.
              </p>
              <Link to="/newsletter" className="inline-link-final">Read the research</Link>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">Who we are</h3>
              <p className="content-card-copy-final">
                Founded by George and Jonathan, two high school students who wanted the real thing.
              </p>
              <Link to="/about" className="inline-link-final">Meet the founders</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
