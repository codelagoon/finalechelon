import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TeamMembers from '../components/TeamMembers';

const Team = () => {
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
      {/* 32 analysts across six sector tracks */}
      <section 
        ref={(el) => sectionRefs.current['header'] = el}
        data-section="header"
        className="content-section-final"
        style={{
          opacity: visibleSections['header'] ? 1 : 0,
          transform: visibleSections['header'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div className="content-container-final page-shell-narrow-final">
          <h1 
            className="page-title-final"
            style={{
              opacity: visibleSections['header'] ? 1 : 0,
              transform: visibleSections['header'] ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}
          >32 analysts across six sector tracks</h1>
          <p 
            className="positioning-paragraph-final"
            style={{
              opacity: visibleSections['header'] ? 1 : 0,
              transform: visibleSections['header'] ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
            }}
          >
            Echelon's research team is organized by sector to ensure deep coverage and specialized expertise.
          </p>
        </div>
      </section>

      {/* Reference to About page for founder bios */}
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
          <div 
            className="content-card-final" 
            style={{ 
              maxWidth: '600px', 
              margin: '0 auto',
              opacity: visibleSections['founders'] ? 1 : 0,
              transform: visibleSections['founders'] ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s, transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className="content-card-title-final">Founders</h2>
            <p className="content-card-copy-final">
              Echelon was founded by George (Head of Operations) and Jonathan Silva (Head of Research). 
              <Link 
                to="/about" 
                className="inline-link-final" 
                style={{ 
                  marginLeft: '0.5rem',
                  transition: 'color 0.3s ease, transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                Meet the founders →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Team members component */}
      <TeamMembers />
    </div>
  );
};

export default Team;
