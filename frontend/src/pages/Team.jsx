import React from 'react';
import { Link } from 'react-router-dom';
import TeamMembers from '../components/TeamMembers';

const Team = () => {
  return (
    <div className="page-shell-final">
      {/* 32 analysts across six sector tracks */}
      <section className="content-section-final">
        <div className="content-container-final page-shell-narrow-final">
          <h1 className="page-title-final">32 analysts across six sector tracks</h1>
          <p className="positioning-paragraph-final">
            Echelon's research team is organized by sector to ensure deep coverage and specialized expertise.
          </p>
        </div>
      </section>

      {/* Reference to About page for founder bios */}
      <section className="content-section-final">
        <div className="content-container-final">
          <div className="content-card-final" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="content-card-title-final">Founders</h2>
            <p className="content-card-copy-final">
              Echelon was founded by George (Head of Operations) and Jonathan Silva (Head of Research). 
              <Link to="/about" className="inline-link-final" style={{ marginLeft: '0.5rem' }}>
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
