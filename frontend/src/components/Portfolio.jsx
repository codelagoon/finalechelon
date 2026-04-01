import React from 'react';
import { portfolioCompaniesData } from '../mockData';

const Portfolio = () => {
  const getConvictionClass = (conviction) => {
    if (conviction === 'Buy') return 'conviction-buy';
    if (conviction === 'Hold') return 'conviction-hold';
    if (conviction === 'Neutral') return 'conviction-neutral';
    return 'conviction-thesis';
  };

  const getStatusClass = (status) => {
    if (status === 'Active') return 'status-active';
    if (status === 'Watch') return 'status-watch';
    return 'status-closed';
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-title-center">Portfolio Companies</h2>
          <p className="section-description">
            Real analysis on public companies across six sectors. Every position backed by rigorous research.
          </p>
        </div>
        <div className="portfolio-table-wrapper">
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company</th>
                <th>Sector</th>
                <th>Status</th>
                <th>Conviction</th>
                <th>DCF Fair Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolioCompaniesData.map((company, index) => (
                <tr key={index}>
                  <td className="ticker-cell">{company.ticker}</td>
                  <td className="company-cell">{company.company}</td>
                  <td className="sector-cell">{company.sector}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(company.status)}`}>
                      {company.status}
                    </span>
                  </td>
                  <td>
                    <span className={`conviction-badge ${getConvictionClass(company.conviction)}`}>
                      {company.conviction}
                    </span>
                  </td>
                  <td className="value-cell">{company.dcfValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
