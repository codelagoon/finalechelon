import React from 'react';
import { tracksData } from '../mockData';

const Tracks = () => {
  return (
    <section id="tracks" className="tracks-section-final">
      <div className="content-container-final">
        <h2 className="section-title-final">{tracksData.title}</h2>
        <p className="section-subtitle-final">{tracksData.subtitle}</p>
        <div className="tracks-grid-final">
          {tracksData.tracks.map((track) => (
            <div key={track.id} className="track-card-final">
              <div className="track-number-final">Track {track.number}</div>
              <h3 className="track-name-final">{track.name}</h3>
              <p className="track-description-final">{track.description}</p>
              <div className="track-deliverable-final">
                <span className="deliverable-label-final">Deliverable:</span>
                <span className="deliverable-text-final">{track.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
