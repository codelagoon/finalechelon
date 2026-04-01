import React from 'react';
import { Card, CardContent } from './ui/card';
import { reviewersData } from '../mockData';

const Reviewers = () => {
  return (
    <section className="reviewers-section">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-title-center">Reviewed by Industry Professionals</h2>
          <p className="section-description">
            Every deliverable reviewed by experienced analysts from top firms. Real feedback. Institutional standards.
          </p>
        </div>
        <div className="reviewers-grid">
          {reviewersData.map((reviewer) => (
            <Card key={reviewer.id} className="reviewer-card">
              <CardContent className="reviewer-content">
                <h3 className="reviewer-firm">{reviewer.firm}</h3>
                <p className="reviewer-role">{reviewer.role}</p>
                <p className="reviewer-experience">{reviewer.experience} experience</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviewers;
