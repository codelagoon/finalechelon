import React, { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import PartnerTrustStrip from '../components/PartnerTrustStrip';
import { Link } from 'react-router-dom';

const Home = () => {
  const timelineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    let animationId;
    let scrollPos = 0;
    const scrollSpeed = 0.5;

    const autoScroll = () => {
      if (!isHovering && container) {
        scrollPos += scrollSpeed;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (scrollPos >= maxScroll) {
          scrollPos = 0;
        }
        
        container.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovering]);
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

      {/* The Echelon Experience */}
      <section className="content-section-final">
        <div className="content-container-final page-shell-narrow-final">
          <h2 className="section-title-final">The Echelon Experience</h2>
          
          <div 
            ref={timelineRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ position: 'relative', marginTop: '3rem', overflowX: 'hidden', cursor: isHovering ? 'grab' : 'default' }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', minWidth: '1000px', justifyContent: 'space-between' }}>
              <div className="timeline-step" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', padding: '1rem', borderRadius: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#000'; num.style.color = '#fff'; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#fff'; num.style.color = '#000'; } }}>
                <div style={{ width: '48px', height: '48px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', backgroundColor: '#fff', fontSize: '0.75rem', fontWeight: '700', transition: 'background-color 0.3s ease, color 0.3s ease' }} className="timeline-number">1</div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', transition: 'color 0.3s ease' }} className="timeline-title">Apply to Echelon</h3>
                <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>Students apply and are selected based on commitment, not prior finance experience.</p>
              </div>
              <div className="timeline-step" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', padding: '1rem', borderRadius: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#000'; num.style.color = '#fff'; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#fff'; num.style.color = '#000'; } }}>
                <div style={{ width: '48px', height: '48px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', backgroundColor: '#fff', fontSize: '0.75rem', fontWeight: '700', transition: 'background-color 0.3s ease, color 0.3s ease' }} className="timeline-number">2</div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', transition: 'color 0.3s ease' }} className="timeline-title">Get Sector Assignment</h3>
                <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>Analysts join one of six sector teams and own their coverage area.</p>
              </div>
              <div className="timeline-step" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', padding: '1rem', borderRadius: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#000'; num.style.color = '#fff'; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#fff'; num.style.color = '#000'; } }}>
                <div style={{ width: '48px', height: '48px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', backgroundColor: '#fff', fontSize: '0.75rem', fontWeight: '700', transition: 'background-color 0.3s ease, color 0.3s ease' }} className="timeline-number">3</div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', transition: 'color 0.3s ease' }} className="timeline-title">Research & Model</h3>
                <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>Build financial models from public filings and write investment memos.</p>
              </div>
              <div className="timeline-step" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', padding: '1rem', borderRadius: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#000'; num.style.color = '#fff'; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#fff'; num.style.color = '#000'; } }}>
                <div style={{ width: '48px', height: '48px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', backgroundColor: '#fff', fontSize: '0.75rem', fontWeight: '700', transition: 'background-color 0.3s ease, color 0.3s ease' }} className="timeline-number">4</div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', transition: 'color 0.3s ease' }} className="timeline-title">Professional Review</h3>
                <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>Every memo goes through peer and Wall Street professional review.</p>
              </div>
              <div className="timeline-step" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', padding: '1rem', borderRadius: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#000'; num.style.color = '#fff'; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#fff'; num.style.color = '#000'; } }}>
                <div style={{ width: '48px', height: '48px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', backgroundColor: '#fff', fontSize: '0.75rem', fontWeight: '700', transition: 'background-color 0.3s ease, color 0.3s ease' }} className="timeline-number">5</div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', transition: 'color 0.3s ease' }} className="timeline-title">Publish Research</h3>
                <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>Published research builds a track record analysts can point to.</p>
              </div>
              <div className="timeline-step" style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', padding: '1rem', borderRadius: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#000'; num.style.color = '#fff'; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; const num = e.currentTarget.querySelector('.timeline-number'); if(num) { num.style.backgroundColor = '#fff'; num.style.color = '#000'; } }}>
                <div style={{ width: '48px', height: '48px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', backgroundColor: '#fff', fontSize: '0.75rem', fontWeight: '700', transition: 'background-color 0.3s ease, color 0.3s ease' }} className="timeline-number">6</div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', transition: 'color 0.3s ease' }} className="timeline-title">Make the Investment</h3>
                <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>We invest real capital based on our published research.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Echelon Works */}
      <section className="content-section-final" style={{ backgroundColor: '#f8f7f4', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div className="content-container-final page-shell-narrow-final">
          <p className="page-intro-eyebrow-final">What Makes Us Different</p>
          <h2 className="section-title-final">Why Echelon Works when Other Programs Don't</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <article className="content-card-final">
              <div style={{ width: '40px', height: '40px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1rem', fontWeight: '700' }}>01</div>
              <h3 className="content-card-title-final">Real Capital Experience</h3>
              <p className="content-card-copy-final">
                Echelon analysts don't practice research—they publish it. Every memo has consequences, every thesis is reviewed by professionals, and every lesson comes from real work rather than classroom simulations.
              </p>
            </article>
            <article className="content-card-final">
              <div style={{ width: '40px', height: '40px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1rem', fontWeight: '700' }}>02</div>
              <h3 className="content-card-title-final">Meritocratic Structure</h3>
              <p className="content-card-copy-final">
                Advancement at Echelon is based on work quality. Analysts who submit strong equity proposals earn greater responsibility. No shortcuts based on seniority—just the same rules that govern professional research firms.
              </p>
            </article>
            <article className="content-card-final">
              <div style={{ width: '40px', height: '40px', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1rem', fontWeight: '700' }}>03</div>
              <h3 className="content-card-title-final">Professional Accountability</h3>
              <p className="content-card-copy-final">
                Names are attached to every published piece. Analysts stand behind their conclusions and can defend them under scrutiny. Real accountability that builds real skills for real careers.
              </p>
            </article>
          </div>

          {/* Comparison Table */}
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', textAlign: 'center' }}>Most Student Finance Programs</p>
                <div></div>
                <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', textAlign: 'center' }}>Echelon</p>
              </div>
              
              {[
                ['Simulated portfolios with fake money', 'Real research on real companies'],
                ['Instructor-led curriculum', 'Student-driven equity proposals'],
                ['Individual assignments', 'Collaborative sector teams'],
                ['No publication standards', 'Wall Street professional review'],
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ backgroundColor: '#f0f0f0', padding: '0.75rem 1rem', borderRadius: '6px', textAlign: 'center', color: '#666', fontSize: '0.85rem', border: '1px solid #e0e0e0' }}>{row[0]}</div>
                  <div style={{ width: '28px', height: '28px', border: '1px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '600' }}>VS</div>
                  <div style={{ backgroundColor: '#fff', padding: '0.75rem 1rem', borderRadius: '6px', textAlign: 'center', color: '#000', fontSize: '0.85rem', border: '1px solid #000' }}>{row[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
