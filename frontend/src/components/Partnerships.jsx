import React from 'react';
import { partnershipsData } from '../mockData';

const Partnerships = () => {
  const partnerLogos = [
    { domain: 'tikr.com', name: 'TIKR', url: 'https://tikr.com' },
    { domain: 'adventiscg.com', name: 'Adventis CG', url: 'https://adventiscg.com' },
    { domain: 'excelexercises.com', name: 'Excel Exercises', url: 'https://excelexercises.com' },
    { domain: 'yis.org', name: 'YIS', url: 'https://yis.org' }
  ];

  const LOGO_DEV_TOKEN = 'pk_TKIoYM7RSfqUBLbrBZ3yKw';

  return (
    <section className="partnerships-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{partnershipsData.title}</h2>
        <p className="section-subtitle-final">{partnershipsData.subtitle}</p>
        <div className="partnerships-logos-grid-final">
          {partnerLogos.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-logo-link-final"
              aria-label={partner.name}
            >
              <img
                src={`https://img.logo.dev/${partner.domain}?token=${LOGO_DEV_TOKEN}`}
                alt={partner.name}
                className="partner-logo-image-final"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
