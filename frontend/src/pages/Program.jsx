import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Program = () => {
  const [expandedRole, setExpandedRole] = useState(null);
  const [visibleStages, setVisibleStages] = useState([]);
  const [visibleSections, setVisibleSections] = useState({});
  const pipelineRef = useRef(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stageNumber = parseInt(entry.target.dataset.stage);
            if (!visibleStages.includes(stageNumber)) {
              setVisibleStages((prev) => [...prev, stageNumber]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const stages = pipelineRef.current?.querySelectorAll('.pipeline-stage');
    stages?.forEach((stage) => {
      observer.observe(stage);
    });

    return () => observer.disconnect();
  }, [visibleStages]);

  // Section fade-in observer
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
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
      if (ref) sectionObserver.observe(ref);
    });

    return () => sectionObserver.disconnect();
  }, []);

  const toggleRole = (roleId) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const stages = [
    { number: "01", title: "Sector Assignment", description: "Every analyst is placed in a sector on day one. Coverage is real — not simulated." },
    { number: "02", title: "Company Selection", description: "Analysts identify companies within their sector and make a case for why the name is worth covering." },
    { number: "03", title: "Financial Modeling", description: "Models are built from public filings — 10-Ks, earnings calls, SEC data. No pre-built templates." },
    { number: "04", title: "Draft Memo", description: "Research is written to Goldman Sachs formatting standards. Thesis, valuation, risks, all documented." },
    { number: "05", title: "Editorial Review", description: "Every draft is reviewed by a Wall Street professional before it moves forward. If it doesn't hold up, it doesn't go out." },
    { number: "06", title: "Publication", description: "Work publishes under the analyst's name. They stand behind it." },
  ];

  const principles = [
    { title: "No surface-level commentary", description: "Research must include primary financial analysis. Market recaps and news summaries don't make the cut." },
    { title: "Assumption clarity", description: "Every valuation output is traceable to explicit inputs. Readers can recalculate results from what we publish." },
    { title: "Risk acknowledgment", description: "Downside risks, competitive threats, and macro headwinds are documented in every memo. No analysis is risk-free." },
    { title: "Accountability for output", description: "Analyst names are attached to published work. We stand behind conclusions and are prepared to defend them." },
  ];

  const roles = [
    { id: "01", title: "Equity Research Analyst", team: "Investment Team", description: "Build company research, valuation work, and formal investment memos under editorial review. Work through filings, earnings calls, competitive positioning, and thesis support. Best suited to applicants who are detail-oriented and comfortable defending a view." },
    { id: "02", title: "Technical Analyst", team: "Investment Team", description: "Track price action, structure, momentum, and technical setups across names under coverage. Translate charts into disciplined trade framing and risk-aware market commentary. Best suited to applicants who can communicate pattern-based views with precision." },
    { id: "03", title: "Macro Policy Analyst", team: "Investment Team", description: "Monitor macro developments, central bank policy, and regulation that affect markets. Write concise views connecting policy change to sectors, risk, and positioning. Best suited to applicants who follow economics closely and synthesize quickly." },
    { id: "04", title: "Leadership", team: "Operations", description: "Drive standards, accountability, recruiting, and cross-functional execution. Own decisions that affect member experience and organizational quality. Best suited to applicants with maturity, follow-through, and strong judgment." },
    { id: "05", title: "Fundraising", team: "Operations", description: "Support sponsorship, donor, and partnership efforts that expand the platform's reach. Build organized outreach, track conversations, and help position the organization professionally. Best suited to applicants who are persistent, polished, and comfortable representing the brand." },
    { id: "06", title: "Marketing & Content", team: "Operations", description: "Shape Echelon's outward-facing presence across written content, social, and brand materials. Turn research, team updates, and events into clear public communication. Best suited to applicants with editorial judgment, consistency, and strong taste." },
  ];

  const sectors = [
    { name: "Technology", description: "Software, semiconductors, AI infrastructure", analysts: 12 },
    { name: "Healthcare", description: "Biotech, medtech, payers, and providers", analysts: 8 },
    { name: "Consumer", description: "Retail, food & beverage, discretionary brands", analysts: 6 },
    { name: "Energy", description: "Oil & gas, renewables, utilities", analysts: 5 },
    { name: "Financials", description: "Banks, asset managers, fintech", analysts: 9 },
    { name: "Industrials", description: "Aerospace, logistics, manufacturing", analysts: 4 },
  ];

  return (
    <div className="page-shell-final" style={{ 
      backgroundColor: '#f8f7f4',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* PAGE TITLE */}
      <section 
        ref={(el) => sectionRefs.current['hero'] = el}
        data-section="hero"
        className="content-section-final" 
        style={{
          padding: '140px 20px',
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: visibleSections['hero'] ? 1 : 0,
          transform: visibleSections['hero'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div className="content-container-final page-shell-narrow-final" style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 className="section-title-final" style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#000',
            marginBottom: '1.5rem',
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>How Echelon Works</h1>
          <p className="positioning-paragraph-final" style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#5a5a5a',
            marginBottom: '0'
          }}>
            We built Echelon to function like a real investment research firm. Here's exactly what that means.
          </p>
        </div>
      </section>

      {/* COMPONENT 1 — VERTICAL Workflow Pipeline */}
      <section 
        ref={(el) => sectionRefs.current['pipeline'] = el}
        data-section="pipeline"
        className="content-section-final" 
        style={{
          padding: '100px 20px',
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: visibleSections['pipeline'] ? 1 : 0,
          transform: visibleSections['pipeline'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#000',
            marginBottom: '4rem',
            fontFamily: "'Playfair Display', Georgia, serif",
            textAlign: 'center'
          }}>From assignment to publication</h2>
          
          <div style={{
            position: 'relative',
            paddingLeft: '100px'
          }}>
            {/* Vertical connecting line - centered through circles */}
            <div style={{
              position: 'absolute',
              left: '35px',
              top: '30px',
              bottom: '30px',
              width: '3px',
              backgroundColor: '#000',
              zIndex: '0'
            }}></div>
            
            {stages.map((stage, index) => (
              <div
                key={stage.number}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: index < stages.length - 1 ? '4rem' : '0',
                  minHeight: '80px',
                  position: 'relative',
                  zIndex: '1'
                }}
              >
                {/* Node - centered on the vertical line */}
                <div style={{
                  position: 'absolute',
                  left: '-82.5px',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '4px solid #f8f7f4',
                  boxShadow: '0 0 0 3px #000',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  flexShrink: '0'
                }}>
                  {stage.number}
                </div>
                
                {/* Content */}
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3'
                  }}>{stage.title}</h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#5a5a5a',
                    lineHeight: '1.6',
                    margin: '0'
                  }}>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.5 — Real Capital */}
      <section 
        ref={(el) => sectionRefs.current['capital'] = el}
        data-section="capital"
        className="content-section-final" 
        style={{ 
          backgroundColor: '#000', 
          color: '#fff',
          padding: '140px 20px',
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: visibleSections['capital'] ? 1 : 0,
          transform: visibleSections['capital'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div className="content-container-final page-shell-narrow-final" style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 className="section-title-final" style={{ 
            color: '#fff',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>The research doesn't stop at publication.</h2>
          <p className="positioning-paragraph-final" style={{ 
            color: '#ccc',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '0'
          }}>
            Echelon's published research informs real capital allocation. The memos our analysts write aren't practice — they're the basis for actual investment decisions. That's the standard we hold the work to, and why editorial review isn't optional.
          </p>
        </div>
      </section>

      {/* COMPONENT 2 — What a Memo Looks Like (Document Mockup) */}
      <section 
        ref={(el) => sectionRefs.current['memo'] = el}
        data-section="memo"
        className="content-section-final" 
        style={{
          padding: '100px 20px',
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: visibleSections['memo'] ? 1 : 0,
          transform: visibleSections['memo'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#000',
            marginBottom: '3rem',
            fontFamily: "'Playfair Display', Georgia, serif",
            textAlign: 'center'
          }}>What a memo looks like</h2>
          
          {/* Document Mockup */}
          <div style={{
            backgroundColor: '#fff',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            borderRadius: '3px',
            overflow: 'hidden',
            maxWidth: '600px',
            margin: '0 auto',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
          }}
          >
            {/* Document Header */}
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '25px 40px',
              borderBottom: '3px solid #c9a050'
            }}>
              <p style={{
                color: '#c9a050',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                margin: '0 0 8px 0',
                fontWeight: '600'
              }}>Echelon Equity Research</p>
              <p style={{
                color: '#fff',
                fontSize: '1.3rem',
                margin: '0',
                fontWeight: '500'
              }}>INITIATING COVERAGE</p>
            </div>
            
            {/* Document Body */}
            <div style={{ padding: '40px' }}>
              <div style={{
                backgroundColor: '#f5f5f5',
                height: '12px',
                width: '70%',
                marginBottom: '20px',
                borderRadius: '1px'
              }}></div>
              <div style={{
                backgroundColor: '#e0e0e0',
                height: '8px',
                width: '40%',
                marginBottom: '35px',
                borderRadius: '1px'
              }}></div>
              
              {/* Sections */}
              <div style={{ marginBottom: '25px' }}>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#c9a050',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 10px 0',
                  fontWeight: '600'
                }}>Investment Thesis</p>
                <div style={{
                  backgroundColor: '#e8e8e8',
                  height: '6px',
                  width: '100%',
                  marginBottom: '8px',
                  borderRadius: '1px'
                }}></div>
                <div style={{
                  backgroundColor: '#e8e8e8',
                  height: '6px',
                  width: '85%',
                  borderRadius: '1px'
                }}></div>
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#c9a050',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 10px 0',
                  fontWeight: '600'
                }}>Valuation Summary</p>
                <div style={{
                  backgroundColor: '#e8e8e8',
                  height: '6px',
                  width: '90%',
                  marginBottom: '8px',
                  borderRadius: '1px'
                }}></div>
                <div style={{
                  backgroundColor: '#e8e8e8',
                  height: '6px',
                  width: '70%',
                  borderRadius: '1px'
                }}></div>
              </div>
              
              <div>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#c9a050',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 10px 0',
                  fontWeight: '600'
                }}>Risk Factors</p>
                <div style={{
                  backgroundColor: '#e8e8e8',
                  height: '6px',
                  width: '80%',
                  marginBottom: '8px',
                  borderRadius: '1px'
                }}></div>
                <div style={{
                  backgroundColor: '#e8e8e8',
                  height: '6px',
                  width: '60%',
                  borderRadius: '1px'
                }}></div>
              </div>
            </div>
            
            {/* Document Footer */}
            <div style={{
              backgroundColor: '#f9f9f9',
              padding: '20px 40px',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                backgroundColor: '#ddd',
                height: '8px',
                width: '120px',
                borderRadius: '1px'
              }}></div>
              <div style={{
                backgroundColor: '#c9a050',
                height: '8px',
                width: '80px',
                borderRadius: '1px'
              }}></div>
            </div>
          </div>
          
          <p style={{
            textAlign: 'center',
            color: '#5a5a5a',
            fontSize: '0.9rem',
            marginTop: '2rem',
            fontStyle: 'italic'
          }}>Goldman Sachs-style formatting standard</p>
        </div>
      </section>

      {/* COMPONENT 4 — Coverage Timeline */}
      <section 
        ref={(el) => sectionRefs.current['timeline'] = el}
        data-section="timeline"
        className="content-section-final" 
        style={{
          padding: '100px 20px',
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: visibleSections['timeline'] ? 1 : 0,
          transform: visibleSections['timeline'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#000',
            marginBottom: '3rem',
            fontFamily: "'Playfair Display', Georgia, serif",
            textAlign: 'center'
          }}>Coverage cycle</h2>
          
          {/* Timeline Strip - Responsive */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: '40px 20px',
            borderRadius: '2px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            gap: '0'
          }}>
            {[
              { label: "Coverage Opens", sublabel: "Week 1" },
              { label: "Modeling", sublabel: "Weeks 2-3" },
              { label: "Draft Due", sublabel: "Week 4" },
              { label: "Editorial Review", sublabel: "Week 5" },
              { label: "Publish", sublabel: "Week 6" }
            ].map((item, index, arr) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center',
                flexShrink: '0'
              }}>
                <div style={{ 
                  textAlign: 'center',
                  padding: '10px 15px',
                  minWidth: '120px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: index === 0 || index === arr.length - 1 ? '#000' : '#fff',
                    border: '3px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    color: index === 0 || index === arr.length - 1 ? '#fff' : '#000',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#000',
                    margin: '0 0 4px 0',
                    whiteSpace: 'nowrap'
                  }}>{item.label}</p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#888',
                    margin: '0'
                  }}>{item.sublabel}</p>
                </div>
                {index < arr.length - 1 && (
                  <div style={{
                    width: '40px',
                    height: '2px',
                    backgroundColor: '#000',
                    flexShrink: '0',
                    marginBottom: '20px'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — The Editorial Standard */}
      <section className="content-section-final" style={{
        padding: '100px 20px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        <div className="content-container-final page-shell-narrow-final" style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          
          <div className="principles-grid" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '2rem',
            maxWidth: '600px',
            margin: '2rem auto 0'
          }}>
            {principles.map((principle, index) => (
              <article key={index} className="principle-card" style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                border: '1px solid #EAEAEA',
                borderRadius: '1px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }}
              >
                <h3 className="principle-title" style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '0.75rem',
                  lineHeight: '1.3'
                }}>{principle.title}</h3>
                <p className="principle-description" style={{
                  fontSize: '0.9rem',
                  color: '#5a5a5a',
                  lineHeight: '1.5',
                  margin: '0'
                }}>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Open Roles */}
      <section 
        ref={(el) => sectionRefs.current['roles'] = el}
        data-section="roles"
        className="content-section-final" 
        style={{
          padding: '100px 20px',
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: visibleSections['roles'] ? 1 : 0,
          transform: visibleSections['roles'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#000',
            marginBottom: '1rem',
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>Open roles at Echelon</h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#5a5a5a',
            marginBottom: '2rem'
          }}>
            We care less about polished credentials than about judgment, communication, and reliable execution.
          </p>
          
          <div className="roles-list" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => toggleRole(role.id)}
                style={{
                  backgroundColor: '#fff',
                  padding: '1.5rem',
                  border: '1px solid #EAEAEA',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#000',
                      margin: '0 0 0.25rem 0'
                    }}>{role.title}</h3>
                    {role.team && <span style={{
                      fontSize: '0.8rem',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>{role.team}</span>}
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    color: '#000',
                    fontWeight: '300'
                  }}>
                    {expandedRole === role.id ? '−' : '+'}
                  </div>
                </div>
                <div style={{
                  maxHeight: expandedRole === role.id ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#5a5a5a',
                    lineHeight: '1.6',
                    margin: '1rem 0 0 0',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f0f0f0'
                  }}>{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* COMPONENT 5 — Sector Cards with Analyst Counts */}
      <section 
        ref={(el) => sectionRefs.current['sectors'] = el}
        data-section="sectors"
        className="content-section-final" 
        style={{
          padding: '100px 20px',
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: visibleSections['sectors'] ? 1 : 0,
          transform: visibleSections['sectors'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#000',
            marginBottom: '0.5rem',
            fontFamily: "'Playfair Display', Georgia, serif",
            textAlign: 'center'
          }}>Six sectors. Real coverage.</h2>
          <p style={{
            fontSize: '1rem',
            color: '#5a5a5a',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>Active analyst coverage by sector</p>
          
          <div className="sectors-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {sectors.map((sector, index) => (
              <article key={index} className="sector-card" style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                border: '1px solid #EAEAEA',
                borderRadius: '2px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* Analyst count badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {sector.analysts} analysts
                </div>
                
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '0.5rem',
                  marginTop: '0.5rem'
                }}>{sector.name}</h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#5a5a5a',
                  lineHeight: '1.4',
                  margin: '0'
                }}>{sector.description}</p>
                
                {/* Visual indicator */}
                <div style={{
                  marginTop: '1rem',
                  height: '3px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(sector.analysts / 12) * 100}%`,
                    backgroundColor: '#000'
                  }}></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Bottom CTA */}
      <section 
        ref={(el) => sectionRefs.current['cta'] = el}
        data-section="cta"
        className="content-section-final" 
        style={{
          padding: '100px 20px',
          maxWidth: '1100px',
          margin: '0 auto',
          opacity: visibleSections['cta'] ? 1 : 0,
          transform: visibleSections['cta'] ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#000',
            marginBottom: '1.5rem',
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>If you want the line, there are easier places to get it.</h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#5a5a5a',
            marginBottom: '0'
          }}>
            Echelon is for students who want to do real work — research that gets challenged, refined, and published under their name. Applications are rolling and selective.
          </p>
        </div>
      </section>

      {/* CTA Panel */}
      <div style={{
        backgroundColor: '#000',
        padding: '80px 20px',
        marginTop: '60px'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '1rem',
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>Apply to Echelon</h2>
          <p style={{
            fontSize: '1rem',
            color: '#888',
            marginBottom: '2rem'
          }}>
            Applications are rolling and selective.
          </p>
          <Link
            to="/apply"
            style={{
              display: 'inline-block',
              backgroundColor: '#fff',
              color: '#000',
              padding: '16px 40px',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Apply now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Program;
