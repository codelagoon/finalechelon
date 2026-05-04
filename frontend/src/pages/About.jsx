import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.dataset.section;
            setVisibleSections((prev) => ({ ...prev, [sectionId]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell-final">
      {/* Section 1 — Why we built this */}
      <section 
        ref={(el) => sectionRefs.current['why'] = el}
        data-section="why"
        className="content-section-final"
        style={{
          opacity: visibleSections['why'] ? 1 : 0,
          transform: visibleSections['why'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div className="content-container-final page-shell-narrow-final">
          <h2 
            className="section-title-final"
            style={{
              opacity: visibleSections['why'] ? 1 : 0,
              transform: visibleSections['why'] ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}
          >Why we built this</h2>
          <div className="positioning-paragraph-final" style={{
            opacity: visibleSections['why'] ? 1 : 0,
            transform: visibleSections['why'] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
          }}>
            <p className="positioning-paragraph-final">
              Here's what most student finance programs actually are: you join, you get a title, and six months later you have a bullet point. No one reads what you wrote. No one challenged it. It never went anywhere. You didn't cover a company — you practiced covering a company. There's a difference, and most programs are built around pretending that difference doesn't exist.
            </p>
            <p className="positioning-paragraph-final" style={{ marginTop: '1.5rem' }}>
              We built Echelon because we thought that was embarrassing. If you're going to call yourself an analyst, the work should hold up. It should exist somewhere. Someone serious should have pushed back on your assumptions before it published. So that's what we built — a program where the work is real, the structure is real, and the accountability is real.
            </p>
            <p className="positioning-paragraph-final" style={{ marginTop: '1.5rem' }}>
              That meant starting from scratch. Sector organization. Coverage assignments. A formal editorial process. Wall Street professionals reviewing research before it goes anywhere. A leadership hierarchy that runs the whole thing. We were sophomores in high school when we started. We built what we couldn't find.
            </p>
            <p className="positioning-paragraph-final" style={{ marginTop: '1.5rem' }}>
              Echelon is not a club. It's not a simulation. It's a firm — and the research we publish reflects that. If you're serious about doing real work, that's what we're offering. If you just want the line, there are easier places to get it.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Founders */}
      <section 
        ref={(el) => sectionRefs.current['founders'] = el}
        data-section="founders"
        className="content-section-final"
        style={{
          opacity: visibleSections['founders'] ? 1 : 0,
          transform: visibleSections['founders'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div className="content-container-final">
          <h2 
            className="section-title-final"
            style={{
              opacity: visibleSections['founders'] ? 1 : 0,
              transform: visibleSections['founders'] ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}
          >Founders</h2>
          <div className="content-grid-final">
            <article 
              className="content-card-final"
              style={{
                opacity: visibleSections['founders'] ? 1 : 0,
                transform: visibleSections['founders'] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s, transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '50%', 
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: '#666',
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease'
              }}>
                <img 
                  src="/george.png" 
                  alt="George Tetteh"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 30%' // Center on face - George's face is slightly higher
                  }}
                />
              </div>
              <h3 className="content-card-title-final">George — Head of Operations</h3>
              <p className="content-card-copy-final">
                George is a sophomore in New York who built the Echelon website from scratch and manages day-to-day operations across all 32 analysts. He oversees applications, marketing, fundraising, and the research department. He also founded Avarent, an AI governance platform for lending, and leads a Financial Literacy club at his school. He built Echelon because he wanted a program that held students to real standards — not simulated ones.
              </p>
            </article>
            <article 
              className="content-card-final"
              style={{
                opacity: visibleSections['founders'] ? 1 : 0,
                transform: visibleSections['founders'] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s, transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '50%', 
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: '#666',
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease'
              }}>
                <img 
                  src="/jonathan.png" 
                  alt="Jonathan Silva"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 25%' // Center on face
                  }}
                />
              </div>
              <h3 className="content-card-title-final">Jonathan Silva — Head of Research</h3>
              <p className="content-card-copy-final">
                Jonathan leads all research operations at Echelon, overseeing analyst output across six sector tracks. He co-founded the program with George with one goal: to produce equity research that could stand next to professional work. He sets the standard for valuation discipline and memo structure — and expects analysts to meet it.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
