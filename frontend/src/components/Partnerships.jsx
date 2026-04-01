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
        <div className="partners">
          <a href="https://tikr.com" target="_blank" rel="noopener noreferrer">
            <img 
              src={`https://img.logo.dev/tikr.com?token=${LOGO_DEV_TOKEN}&format=png&size=200&greyscale=true`}
              alt="TIKR" 
            />
          </a>

          <a href="https://adventiscg.com" target="_blank" rel="noopener noreferrer">
            <img 
              src={`https://img.logo.dev/adventiscg.com?token=${LOGO_DEV_TOKEN}&format=png&size=200&greyscale=true`}
              alt="Adventis CG" 
            />
          </a>

          <a href="https://excelexercises.com" target="_blank" rel="noopener noreferrer">
            <img 
              src={`https://img.logo.dev/excelexercises.com?token=${LOGO_DEV_TOKEN}&format=png&size=200&greyscale=true`}
              alt="Excel Exercises" 
            />
          </a>

          <a href="https://yis.org" target="_blank" rel="noopener noreferrer">
            <img 
              src={`https://img.logo.dev/yis.org?token=${LOGO_DEV_TOKEN}&format=png&size=200&greyscale=true`}
              alt="YIS" 
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
