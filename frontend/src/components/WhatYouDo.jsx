import React from 'react';
import { whatYouWillDoData } from '../mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { FileSpreadsheet, FileText, Presentation, CheckCircle2 } from 'lucide-react';

const iconMap = {
  FileSpreadsheet: FileSpreadsheet,
  FileText: FileText,
  Presentation: Presentation,
  CheckCircle2: CheckCircle2
};

const WhatYouDo = () => {
  return (
    <section className="what-you-do-section">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-title-center">{whatYouWillDoData.title}</h2>
        </div>
        <div className="activities-grid">
          {whatYouWillDoData.activities.map((activity, index) => {
            const IconComponent = iconMap[activity.icon];
            return (
              <Card key={index} className="activity-card">
                <CardHeader>
                  <div className="activity-icon-wrapper">
                    <IconComponent className="activity-icon" />
                  </div>
                  <CardTitle className="activity-title">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="activity-description">
                    {activity.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouDo;
