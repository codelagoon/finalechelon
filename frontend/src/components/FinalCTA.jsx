import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { finalCTAData } from '../mockData';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="final-cta-section-final">
      <div className="final-cta-container-final">
        <h2 className="final-cta-title-final">{finalCTAData.title}</h2>
        <p className="final-cta-subtitle-final">{finalCTAData.subtitle}</p>
        <p className="final-cta-selectivity-final">{finalCTAData.selectivityNote}</p>
        <Button 
          size="lg" 
          className="final-cta-button-final"
          onClick={() => navigate('/apply')}
        >
          {finalCTAData.cta}
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
