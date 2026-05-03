import React from 'react';
import Hero from '../components/Hero';
import PartnerTrustStrip from '../components/PartnerTrustStrip';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Hero />
      

      <PartnerTrustStrip />
      
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
