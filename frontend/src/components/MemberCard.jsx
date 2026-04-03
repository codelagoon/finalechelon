import React from 'react';
import { getFallbackImage } from '../services/memberDataService';

const MemberCard = ({ member, onClick }) => {
  // Defensive checks for required fields
  if (!member?.name || !member?.role) {
    return null; // Don't render if missing critical data
  }

  // Handle optional fields safely
  const displayPreview = member.preview || member.bio?.substring(0, 100) || '';
  const displayTrack = member.track || 'General';
  const displayImage = member.image || getFallbackImage();
  
  return (
    <div
      onClick={() => onClick(member)}
      className="member-card-container"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(member);
        }
      }}
      aria-label={`View ${member.name}'s profile`}
    >
      <div className="member-card-image-wrapper">
        <img
          src={displayImage}
          alt={`${member.name} - ${member.role}`}
          className="member-card-image"
          loading="lazy"
          onError={(e) => {
            // Fallback if image fails to load
            if (e.target.src !== getFallbackImage()) {
              e.target.src = getFallbackImage();
            }
          }}
        />
      </div>
      
      <div className="member-card-content">
        <h3 className="member-card-name">{member.name}</h3>
        <p className="member-card-role">{member.role}</p>
        {displayTrack && <p className="member-card-track">{displayTrack}</p>}
        {displayPreview && <p className="member-card-preview">{displayPreview}</p>}
      </div>
      
      <div className="member-card-footer">
        <span className="member-card-link">View Profile →</span>
      </div>
    </div>
  );
};

export default MemberCard;
