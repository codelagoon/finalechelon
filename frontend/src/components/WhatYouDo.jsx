import React from 'react';
import { whatYouDoData } from '../mockData';
import { FileSpreadsheet, Calculator, FileText, TrendingUp } from 'lucide-react';

const iconMap = {
  FileSpreadsheet: FileSpreadsheet,
  Calculator: Calculator,
  FileText: FileText,
  TrendingUp: TrendingUp
};

const WhatYouDo = () => {
  return (
    <section className="what-you-do-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{whatYouDoData.title}</h2>
        <p className="section-subtitle-final">{whatYouDoData.subtitle}</p>
        <div className="activities-grid-final">
          {whatYouDoData.activities.map((activity, index) => {
            const IconComponent = iconMap[activity.icon];
            return (
              <div key={index} className="activity-card-final">
                <div className="activity-icon-wrapper-final">
                  <IconComponent className="activity-icon-final" />
                </div>
                <h3 className="activity-title-final">{activity.title}</h3>
                <p className="activity-description-final">{activity.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouDo;
