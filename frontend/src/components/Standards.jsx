import React from 'react';
import { standardsData } from '../mockData';

const Standards = () => {
  return (
    <section className="standards-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{standardsData.title}</h2>
        <p className="standards-intro-final">{standardsData.intro}</p>
        <div className="standard-example-final">
          <p className="standard-example-title-final">{standardsData.exampleStandard.title}</p>
          <ul className="standard-rules-final">
            {standardsData.exampleStandard.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Standards;
