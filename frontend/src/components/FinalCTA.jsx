import React, { useState } from 'react';
import { Button } from './ui/button';
import { finalCTAData } from '../mockData';
import ApplicationDialog from './ApplicationDialog';

const FinalCTA = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  return (
    <section className="final-cta-section-final">
      <div className="final-cta-container-final">
        <h2 className="final-cta-title-final">{finalCTAData.title}</h2>
        <p className="final-cta-subtitle-final">{finalCTAData.subtitle}</p>
        <p className="final-cta-selectivity-final">{finalCTAData.selectivityNote}</p>
        <Button 
          size="lg" 
          className="final-cta-button-final"
          onClick={() => setIsApplicationOpen(true)}
        >
          {finalCTAData.cta}
        </Button>
      </div>
      <ApplicationDialog 
        isOpen={isApplicationOpen} 
        onClose={() => setIsApplicationOpen(false)} 
      />
    </section>
  );
};

export default FinalCTA;
