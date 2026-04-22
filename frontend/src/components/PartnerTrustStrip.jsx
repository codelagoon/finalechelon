import React from 'react';
import { partnershipsData } from '../mockData';

const LOGO_DEV_TOKEN = 'pk_TKIoYM7RSfqUBLbrBZ3yKw';

const PartnerTrustStrip = () => {
  return (
    <section className="partner-trust-strip-final" aria-labelledby="partner-trust-title">
      <div className="content-container-final partner-trust-container-final">
        <div className="partner-trust-copy-final">
          <p className="partner-trust-eyebrow-final">Partnerships</p>
          <h2 id="partner-trust-title" className="partner-trust-title-final">
            {partnershipsData.trustStripTitle}
          </h2>
        </div>

        <div className="partner-trust-logos-final">
          {partnershipsData.partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-trust-link-final"
              aria-label={`Visit ${partner.name}`}
            >
              <img
                src={`https://img.logo.dev/${partner.domain}?token=${LOGO_DEV_TOKEN}&format=png&size=200`}
                alt={partner.name}
                className="partner-trust-logo-final"
                loading="eager"
                decoding="async"
                width="200"
                height="56"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerTrustStrip;
