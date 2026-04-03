import React from 'react';

const MemberCard = ({ member, onClick }) => {
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
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          className="member-card-image"
          loading="lazy"
        />
      </div>
      
      <div className="member-card-content">
        <h3 className="member-card-name">{member.name}</h3>
        <p className="member-card-role">{member.role}</p>
        <p className="member-card-track">{member.track}</p>
        <p className="member-card-preview">{member.preview}</p>
      </div>
      
      <div className="member-card-footer">
        <span className="member-card-link">View Profile →</span>
      </div>
    </div>
  );
};

export default MemberCard;
