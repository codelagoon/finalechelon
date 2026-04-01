import React from 'react';
import { portfolioCompaniesData } from '../mockData';

const Portfolio = () => {
  const getStatusClass = (status) => {
    if (status === 'Active') return 'status-active-final';
    if (status === 'Monitoring') return 'status-monitoring-final';
    return 'status-complete-final';
  };

  const getConvictionClass = (conviction) => {
    if (conviction === 'Long') return 'conviction-long-final';
    if (conviction === 'Hold') return 'conviction-hold-final';
    if (conviction === 'Neutral') return 'conviction-neutral-final';
    return 'conviction-validated-final';
  };

  return (
    <section id="coverage" className="portfolio-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">Active Coverage</h2>
        <p className="section-subtitle-final">
          Real analysis on public companies across six sectors. Every position supported by structured, defensible research.
        </p>
        <div className="portfolio-table-wrapper-final">
          <table className="portfolio-table-final">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company</th>
                <th>Sector</th>
                <th>Status</th>
                <th>Conviction</th>
                <th className="text-right">Fair Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolioCompaniesData.map((company, index) => (
                <tr key={index}>
                  <td className="ticker-cell-final">{company.ticker}</td>
                  <td className="company-cell-final">{company.company}</td>
                  <td className="sector-cell-final">{company.sector}</td>
                  <td>
                    <span className={`status-badge-final ${getStatusClass(company.status)}`}>
                      {company.status}
                    </span>
                  </td>
                  <td>
                    <span className={`conviction-badge-final ${getConvictionClass(company.conviction)}`}>
                      {company.conviction}
                    </span>
                  </td>
                  <td className="fairvalue-cell-final text-right">{company.fairValue}</td>
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
