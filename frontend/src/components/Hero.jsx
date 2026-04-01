import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { heroData } from '../mockData';
import ApplicationDialog from './ApplicationDialog';

const Hero = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section-final">
      <div className="hero-container-final">
        <div className="hero-content-final">
          <p className="hero-tagline-final">{heroData.tagline}</p>
          <h1 className="hero-headline-final">
            {heroData.headline}
          </h1>
          <p className="hero-subheadline-final">
            {heroData.subheadline}
          </p>
          <div className="hero-cta-group-final">
            <Button 
              size="lg" 
              className="cta-primary-final"
              onClick={() => setIsApplicationOpen(true)}
            >
              {heroData.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="cta-secondary-final"
              onClick={() => scrollToSection('coverage')}
            >
              {heroData.ctaSecondary}
            </Button>
          </div>
        </div>
        <div className="hero-image-container-final">
          <img 
            src="https://images.unsplash.com/photo-1705931819853-cce7c8d69f10" 
            alt="Strategic Analysis" 
            className="hero-image-final"
          />
        </div>
      </div>
      <ApplicationDialog 
        isOpen={isApplicationOpen} 
        onClose={() => setIsApplicationOpen(false)} 
      />
    </section>
  );
};

export default Hero;
