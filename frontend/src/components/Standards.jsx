import React from 'react';
import { standardsData } from '../mockData';
import { Card, CardContent } from './ui/card';

const Standards = () => {
  return (
    <section className="standards-section">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-title-center">{standardsData.title}</h2>
          <p className="section-description">
            {standardsData.description}
          </p>
        </div>
        <div className="standards-grid">
          {standardsData.sops.map((sop, index) => (
            <Card key={index} className="standard-card">
              <CardContent className="standard-content">
                <h3 className="standard-rule">{sop.rule}</h3>
                <p className="standard-description">{sop.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Standards;
