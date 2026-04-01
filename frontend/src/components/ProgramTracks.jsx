import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { programTracksData } from '../mockData';

const ProgramTracks = () => {
  return (
    <section className="program-tracks-section">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-title-center">Analyst Tracks</h2>
          <p className="section-description">
            Four rigorous tracks designed to build institutional-level capabilities.
          </p>
        </div>
        <div className="tracks-grid">
          {programTracksData.map((track) => (
            <Card key={track.id} className="track-card">
              <CardHeader>
                <div className="track-number">Track {track.track}</div>
                <CardTitle className="track-title">{track.name}</CardTitle>
                <CardDescription className="track-description">
                  {track.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="track-deliverable">
                  <p className="deliverable-label">Deliverable:</p>
                  <p className="deliverable-text">{track.deliverable}</p>
                </div>
                <div className="track-skills">
                  <p className="skills-label">Key Skills:</p>
                  <div className="skills-list">
                    {track.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramTracks;
