import React from 'react';
import { selectionData } from '../mockData';

const Selection = () => {
  return (
    <section className="selection-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{selectionData.title}</h2>
        <p className="selection-subtitle-final">{selectionData.subtitle}</p>
        <div className="selection-process-final">
          <p className="process-label-final">Process:</p>
          <ol className="process-steps-final">
            {selectionData.steps.map((step, index) => (
              <li key={index} className="process-step-final">{step}</li>
            ))}
          </ol>
        </div>
        <p className="selectivity-note-final">{selectionData.selectivityNote}</p>
      </div>
    </section>
  );
};

export default Selection;
