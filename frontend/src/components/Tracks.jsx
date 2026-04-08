import React from 'react';
import { tracksData } from '../mockData';

const Tracks = () => {
  return (
    <section id="tracks" className="tracks-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{tracksData.title}</h2>
        <p className="section-subtitle-final">{tracksData.subtitle}</p>
        <p className="tracks-positioning-final">{tracksData.positioning}</p>
        <div className="tracks-grid-final">
          {tracksData.tracks.map((track) => (
            <div key={track.id} className="track-card-final">
              <div className="track-number-final">Role {track.number}</div>
              <h3 className="track-name-final">{track.name}</h3>
              <ul className="track-highlights-final">
                {track.highlights.map((highlight, index) => (
                  <li key={`${track.id}-${index}`}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
