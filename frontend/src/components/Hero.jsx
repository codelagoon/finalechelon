import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { heroData } from '../mockData';

const Hero = () => {
  const navigate = useNavigate();

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
              onClick={() => navigate('/apply')}
            >
              {heroData.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="cta-secondary-final"
              onClick={() => navigate('/portfolio')}
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
    </section>
  );
};

export default Hero;
