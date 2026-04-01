import React from 'react';
import { missionData } from '../mockData';
import { Check } from 'lucide-react';

const Mission = () => {
  return (
    <section className="mission-section">
      <div className="content-container">
        <div className="mission-content">
          <h2 className="section-title">{missionData.title}</h2>
          <p className="mission-description">
            {missionData.description}
          </p>
          <div className="principles-grid">
            {missionData.principles.map((principle, index) => (
              <div key={index} className="principle-item">
                <Check className="principle-icon" />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
