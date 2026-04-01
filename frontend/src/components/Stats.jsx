import React from 'react';
import { statsData } from '../mockData';

const Stats = () => {
  return (
    <section className="stats-section-final">
      <div className="stats-container-final">
        {statsData.map((stat, index) => (
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
