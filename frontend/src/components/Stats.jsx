import React from 'react';

const Stats = () => {
  const stats = [
    { value: '32', label: 'Analysts' },
    { value: '6', label: 'Sectors' },
    { value: '200+', label: 'Applications' }
  ];

  return (
    <section className="stats-section-final">
      <div className="stats-container-final">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item-final">
            <div className="stat-value-final">{stat.value}</div>
            <div className="stat-label-final">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
