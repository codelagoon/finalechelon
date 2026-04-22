import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

const HalDealCTA = () => {
  return (
    <section className="hal-deal-cta-section-final" aria-labelledby="hal-deal-cta-title">
      <div className="content-container-final">
        <div className="hal-deal-cta-panel-final">
          <div className="hal-deal-cta-copy-final">
            <p className="hal-deal-cta-eyebrow-final">HAL Deal Access</p>
            <h2 id="hal-deal-cta-title" className="hal-deal-cta-title-final">
              HAL Deal Download Coming Soon
            </h2>
            <p className="hal-deal-cta-description-final">
              We are preparing the first HAL deal packet for public download, including deal context,
              thesis framing, and analyst notes.
            </p>
            <p className="hal-deal-cta-footnote-final">
              Join the list to be first in line when the file goes live.
            </p>
          </div>
          <div className="hal-deal-cta-actions-final">
            <Button
              size="lg"
              className="hal-deal-cta-button-final"
              disabled
              aria-disabled="true"
            >
              Download Soon
              <Download className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HalDealCTA;
