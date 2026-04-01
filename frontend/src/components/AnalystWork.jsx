import React from 'react';
import { analystWorkData } from '../mockData';

const AnalystWork = () => {
  return (
    <section className="analyst-work-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{analystWorkData.title}</h2>
        <p className="section-subtitle-final">{analystWorkData.subtitle}</p>
        <div className="analyst-work-grid-final">
          {analystWorkData.samples.map((sample) => (
            <div key={sample.id} className="work-sample-card-final">
              <h3 className="work-sample-title-final">{sample.title}</h3>
              <p className="work-sample-description-final">{sample.description}</p>
            </div>
          ))}
        </div>
        <p className="analyst-work-footer-final">{analystWorkData.footer}</p>
      </div>
    </section>
  );
};

export default AnalystWork;
