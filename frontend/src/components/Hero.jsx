import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="hero-section-final"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}
    >
      <div className="hero-container-final">
        <div className="hero-content-final">
          <h1 
            className="hero-headline-final"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
            }}
          >
            The firm that treats student analysts like professionals.
          </h1>
          <p 
            className="hero-subheadline-final"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
            }}
          >
            Echelon Equity is a student-run investment research program built by two high schoolers who wanted the real thing — not a simulation. 32 analysts. Six sectors. Research reviewed by Wall Street professionals.
          </p>
          <div 
            className="hero-cta-group-final"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s'
            }}
          >
            <Button 
              size="lg" 
              className="cta-primary-final"
              onClick={() => navigate('/apply')}
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Apply
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="cta-secondary-final"
              onClick={() => navigate('/program')}
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              See how it works
            </Button>
          </div>
        </div>
        <div 
          className="hero-image-container-final"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s'
          }}
        >
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
