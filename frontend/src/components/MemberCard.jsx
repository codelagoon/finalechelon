import React from 'react';

const MemberCard = ({ member, onClick }) => {
  // Defensive checks for required fields
  if (!member?.name || !member?.role) {
    return null; // Don't render if missing critical data
  }

  // Handle optional fields safely
  const displayPreview = member.preview || member.bio?.substring(0, 100) || '';
  const displayTrack = member.track || 'General';
  const hasImage = member.image && member.image.trim() !== '';
  
  return (
    <div
      onClick={() => onClick(member)}
      className={`member-card-container ${!hasImage ? 'member-card-no-image' : ''}`}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(member);
        }
      }}
      aria-label={`View ${member.name}'s profile`}
    >
      {hasImage && (
        <div className="member-card-image-wrapper">
          <img
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            className="member-card-image"
            loading="lazy"
            onError={(e) => {
              // If image fails to load, hide the image section entirely
              const wrapper = e.target.closest('.member-card-image-wrapper');
              if (wrapper) {
                wrapper.style.display = 'none';
                e.target.closest('.member-card-container')?.classList.add('member-card-no-image');
              }
            }}
          />
        </div>
      )}
      
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
