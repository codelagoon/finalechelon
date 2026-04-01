import React from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { testimonialsData } from '../mockData';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-title-center">From Our Analysts</h2>
        </div>
        <div className="testimonials-grid">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="testimonial-card">
              <CardContent className="testimonial-content">
                <p className="testimonial-text">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <Avatar className="testimonial-avatar">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
