// Finnhub API service for real-time stock data

const FINNHUB_API_KEY = 'd6meb3pr01qi0ajltsp0d6meb3pr01qi0ajltspg';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

export const fetchStockQuote = async (symbol) => {
  try {
    const response = await fetch(
      `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch stock data');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
};

export const fetchCompanyProfile = async (symbol) => {
  try {
    const response = await fetch(
      `${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch company profile');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching profile for ${symbol}:`, error);
    return null;
  }
};

export const portfolioCompaniesConfig = [
  {
    ticker: 'PLTR',
    company: 'Palantir Technologies',
    sector: 'Technology · SaaS',
    status: 'Active',
    conviction: 'Hold',
    targetPrice: 31.20
  },
  {
    ticker: 'DG',
    company: 'Dollar General',
    sector: 'Consumer · Retail',
    status: 'Active',
    conviction: 'Long',
    targetPrice: 147.50
  },
  {
    ticker: 'ISRG',
    company: 'Intuitive Surgical',
    sector: 'Healthcare · MedTech',
    status: 'Monitoring',
    conviction: 'Neutral',
    targetPrice: 415.00
  },
  {
    ticker: 'EPD',
    company: 'Enterprise Products',
    sector: 'Energy · Midstream',
    status: 'Complete',
    conviction: 'Validated',
    targetPrice: 32.80
  },
  {
    ticker: 'V',
    company: 'Visa Inc.',
    sector: 'Financial Services',
    status: 'Active',
    conviction: 'Long',
    targetPrice: 298.00
  },
  {
    ticker: 'TDG',
    company: 'TransDigm Group',
    sector: 'Industrials · Aerospace',
    status: 'Monitoring',
    conviction: 'Neutral',
    targetPrice: 1240.00
  }
];

export const fetchPortfolioData = async () => {
  const portfolioData = await Promise.all(
    portfolioCompaniesConfig.map(async (company) => {
      const quote = await fetchStockQuote(company.ticker);
      return {
        ...company,
        currentPrice: quote?.c || null,
        change: quote?.d || null,
        changePercent: quote?.dp || null
      };
    })
  );
  return portfolioData;
};
