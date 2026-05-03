import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section-final">
      <div className="hero-container-final">
        <div className="hero-content-final">
          <h1 className="hero-headline-final">
            The firm that treats student analysts like professionals.
          </h1>
          <p className="hero-subheadline-final">
            Echelon Equity is a student-run investment research program built by two high schoolers who wanted the real thing — not a simulation. 32 analysts. Six sectors. Research reviewed by Wall Street professionals.
          </p>
          <div className="hero-cta-group-final">
            <Button 
              size="lg" 
              className="cta-primary-final"
              onClick={() => navigate('/apply')}
            >
              Apply — we're selective
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="cta-secondary-final"
              onClick={() => navigate('/program')}
            >
              See how it works
            </Button>
          </div>
        </div>
        <div className="hero-image-container-final">
          <img 
            src="https://images.unsplash.com/photo-1705931819853-cce7c8d69f10?auto=format&fit=crop&w=1400&q=80"
            alt="Echelon Equity student-led investment research analysts reviewing financial models"
            className="hero-image-final"
            width="1400"
            height="1100"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            sizes="(max-width: 968px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
