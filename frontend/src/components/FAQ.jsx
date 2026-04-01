import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { faqData } from '../mockData';

const FAQ = () => {
  return (
    <section className="faq-section">
      <div className="content-container-narrow">
        <div className="section-header">
          <h2 className="section-title-center">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="faq-accordion">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="faq-question">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="faq-answer">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
