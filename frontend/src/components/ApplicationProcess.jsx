import React from 'react';
import { applicationProcessData } from '../mockData';

const ApplicationProcess = () => {
  return (
    <section id="application" className="application-process-section">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-title-center">{applicationProcessData.title}</h2>
          <p className="section-description">
            {applicationProcessData.description}
          </p>
        </div>
        <div className="process-steps-container">
          {applicationProcessData.steps.map((step, index) => (
            <div key={step.step} className="process-step-item">
              <div className="process-step-number">{step.step}</div>
              <div className="process-step-content">
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
              </div>
              {index < applicationProcessData.steps.length - 1 && (
                <div className="process-step-connector" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
