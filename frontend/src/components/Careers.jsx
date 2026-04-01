import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { careersData } from '../mockData';
import { ArrowRight } from 'lucide-react';
import CareerApplicationDialog from './CareerApplicationDialog';

const Careers = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleApply = (roleTitle) => {
    setSelectedRole(roleTitle);
    setIsApplicationOpen(true);
  };

  return (
    <section className="careers-section">
      <div className="careers-hero">
        <img 
          src="https://images.unsplash.com/photo-1512296014055-b49bbcd707d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc3NTA0NTg2NHww&ixlib=rb-4.1.0&q=85"
          alt="Echelon Team"
          className="careers-hero-image"
        />
        <div className="careers-hero-overlay">
          <h2 className="careers-hero-title">{careersData.intro.title}</h2>
          <p className="careers-hero-description">{careersData.intro.description}</p>
        </div>
      </div>

      <div className="content-container">
        <div className="section-header">
          <h3 className="section-title-center">Open Positions</h3>
        </div>
        <div className="careers-grid">
          {careersData.roles.map((role) => (
            <Card key={role.id} className="career-card">
              <CardHeader>
                <CardTitle className="career-title">{role.title}</CardTitle>
                <CardDescription className="career-description">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="career-requirements">
                  <p className="requirements-label">What we're looking for:</p>
                  <ul className="requirements-list">
                    {role.requirements.map((req, index) => (
                      <li key={index} className="requirement-item">{req}</li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="career-apply-btn"
                  onClick={() => handleApply(role.title)}
                >
                  Apply for this role
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CareerApplicationDialog 
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        selectedRole={selectedRole}
      />
    </section>
  );
};

export default Careers;
