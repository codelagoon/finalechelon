import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import ApplicationDialog from './ApplicationDialog';

const FinalCTA = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  return (
    <section className="final-cta-section">
      <div className="final-cta-container">
        <h2 className="final-cta-title">
          Ready to Prove Yourself?
        </h2>
        <p className="final-cta-description">
          The work is the credential. Join Echelon and build a portfolio that speaks for itself.
        </p>
        <Button 
          size="lg" 
          className="final-cta-button"
          onClick={() => setIsApplicationOpen(true)}
        >
          Apply to Echelon
          <ArrowRight className="ml-2 h-5 w-5" />
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
