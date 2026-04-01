import React from 'react';

const Partnerships = () => {
  const LOGO_DEV_TOKEN = 'pk_TKIoYM7RSfqUBLbrBZ3yKw';

  return (
    <section className="partnerships-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">Platform & Industry Partnerships</h2>
        <p className="section-subtitle-final">
          Built with tools and resources used in professional investment workflows.
        </p>
        <div 
          className="partners" 
          style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '56px',
            flexWrap: 'wrap'
          }}
        >
          <a href="https://tikr.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
            <img 
              src={`https://img.logo.dev/tikr.com?token=${LOGO_DEV_TOKEN}&format=png&size=200&greyscale=true`}
              alt="TIKR"
              style={{ height: '28px', width: 'auto', opacity: 0.65 }}
            />
          </a>

          <a href="https://adventiscg.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
            <img 
              src={`https://img.logo.dev/adventiscg.com?token=${LOGO_DEV_TOKEN}&format=png&size=200&greyscale=true`}
              alt="Adventis CG"
              style={{ height: '28px', width: 'auto', opacity: 0.65 }}
            />
          </a>

          <a href="https://excelexercises.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
            <img 
              src={`https://img.logo.dev/excelexercises.com?token=${LOGO_DEV_TOKEN}&format=png&size=200&greyscale=true`}
              alt="Excel Exercises"
              style={{ height: '28px', width: 'auto', opacity: 0.65 }}
            />
          </a>

          <a href="https://yis.org" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
            <img 
              src={`https://img.logo.dev/yis.org?token=${LOGO_DEV_TOKEN}&format=png&size=200&greyscale=true`}
              alt="YIS"
              style={{ height: '28px', width: 'auto', opacity: 0.65 }}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
