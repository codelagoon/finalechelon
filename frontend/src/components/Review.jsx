import React from 'react';
import { reviewData } from '../mockData';

const Review = () => {
  return (
    <section className="review-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{reviewData.title}</h2>
        <p className="section-subtitle-final">{reviewData.subtitle}</p>
        <div className="reviews-grid-final">
          {reviewData.reviews.map((review, index) => (
            <div key={index} className="review-card-final">
              <p className="review-quote-final">"{review.quote}"</p>
              <p className="review-attribution-final">— {review.attribution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
