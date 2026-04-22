import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { partnershipsData } from '../mockData';

const Partnerships = () => {
  const LOGO_DEV_TOKEN = 'pk_TKIoYM7RSfqUBLbrBZ3yKw';

  return (
    <section className="partnerships-section-final" aria-labelledby="partnerships-title">
      <div className="content-container-final">
        <div className="partnerships-header-final">
          <p className="section-eyebrow-final">{partnershipsData.eyebrow}</p>
          <h2 id="partnerships-title" className="section-title-final">{partnershipsData.title}</h2>
          <p className="section-subtitle-final">{partnershipsData.subtitle}</p>
          <p className="partnerships-intro-final">{partnershipsData.intro}</p>
        </div>

        <div className="partnerships-grid-final">
          {partnershipsData.partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="partnership-card-final"
              aria-label={`Visit ${partner.name}`}
            >
              <span className="partnership-label-final">{partner.label}</span>
              <div className="partnership-logo-frame-final">
                <img
                  src={`https://img.logo.dev/${partner.domain}?token=${LOGO_DEV_TOKEN}&format=png&size=240`}
                  alt={partner.name}
                  loading="eager"
                  decoding="async"
                  width="240"
                  height="72"
                />
              </div>
              <div className="partnership-meta-final">
                <h3 className="partnership-name-final">{partner.name}</h3>
                <span className="partnership-domain-final">{partner.domain}</span>
              </div>
              <span className="partnership-cta-final">
                Explore partner
                <ArrowUpRight size={16} />
              </span>
            </a>
          ))}
        </div>

        <p className="partnerships-note-final">
          A compact network of platforms, partners, and communities that help support research quality and analyst development.
        </p>
      </div>
    </section>
  );
};

export default Partnerships;
