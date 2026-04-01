import React from 'react';
import { positioningData } from '../mockData';
import { Check } from 'lucide-react';

const Positioning = () => {
  return (
    <section className="positioning-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{positioningData.title}</h2>
        <div className="positioning-content-final">
          {positioningData.paragraphs.map((paragraph, index) => (
            <p key={index} className="positioning-paragraph-final">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="principles-grid-final">
          {positioningData.principles.map((principle, index) => (
            <div key={index} className="principle-item-final">
              <Check className="principle-icon-final" />
              <span>{principle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Positioning;
