import React from "react";

const defaultBenefits = [
  {
    title: "Equity Research",
    description:
      "Company workups built from filings, earnings calls, and repeatable valuation frameworks.",
  },
  {
    title: "Market Notes",
    description:
      "Concise weekly observations on sectors, rates, and catalysts that matter for decision quality.",
  },
  {
    title: "Memo Highlights",
    description:
      "Distilled excerpts from internal investment memos with key risks, variants, and follow-ups.",
  },
];

const NewsletterBenefits = ({ benefits = defaultBenefits }) => {
  return (
    <section className="newsletter-benefits-section-final">
      <div className="content-container-final">
        <div className="newsletter-section-heading-final">
          <p className="page-intro-eyebrow-final">What Subscribers Get</p>
          <h2 className="section-title-final">What subscribers get</h2>
        </div>
        <div className="newsletter-benefits-grid-final">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="newsletter-benefit-card-final">
              <h3 className="newsletter-card-title-final">{benefit.title}</h3>
              <p className="newsletter-card-copy-final">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsletterBenefits;
