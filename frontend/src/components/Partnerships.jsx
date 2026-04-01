import React from 'react';
import { partnershipsData } from '../mockData';

const Partnerships = () => {
  return (
    <section className="partnerships-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{partnershipsData.title}</h2>
        <p className="section-subtitle-final">{partnershipsData.subtitle}</p>
        <div className="partnerships-logos-final">
          {partnershipsData.partners.map((partner, index) => (
            <div key={index} className="partner-logo-final">
              <span className="partner-name-final">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
