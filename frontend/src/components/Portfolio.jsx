import React, { useState, useEffect } from 'react';
import { portfolioCompaniesConfig, fetchPortfolioData } from '../services/finnhubService';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(portfolioCompaniesConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPortfolioData = async () => {
      setIsLoading(true);
      const data = await fetchPortfolioData();
      setPortfolioData(data);
      setIsLoading(false);
    };
    
    loadPortfolioData();
    
    // Refresh every 60 seconds
    const interval = setInterval(loadPortfolioData, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const formatPrice = (price) => {
    if (!price) return '—';
    return `$${price.toFixed(2)}`;
  };

  return (
    <section id="coverage" className="portfolio-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">Active Coverage</h2>
        <p className="section-subtitle-final">
          Real analysis on public companies across six sectors. Every position supported by structured, defensible research.
        </p>
        {isLoading && (
          <p className="loading-text-final">Loading live market data...</p>
        )}
        <div className="portfolio-table-wrapper-final">
          <table className="portfolio-table-final">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company</th>
                <th>Sector</th>
                <th>Status</th>
                <th>Conviction</th>
                <th className="text-right">Current Price</th>
                <th className="text-right">Target Price</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((company, index) => (
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
                  <td className="price-cell-final text-right">
                    {formatPrice(company.currentPrice)}
                  </td>
                  <td className="fairvalue-cell-final text-right">
                    {formatPrice(company.targetPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="market-data-note-final">
          Market data provided by Finnhub. Prices updated in real-time.
        </p>
      </div>
    </section>
  );
};

export default Portfolio;
