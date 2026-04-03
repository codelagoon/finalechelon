import React, { useEffect } from 'react';

const MemberDetailModal = ({ member, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!member) return null;

  // Defensive field handling
  const displayBio = member.bio || member.preview || 'No additional information available.';
  const hasSkills = member.skills && Array.isArray(member.skills) && member.skills.length > 0;
  const hasLinkedIn = member.linkedin && member.linkedin.trim() !== '';
  const hasEmail = member.email && member.email.trim() !== '';
  const hasInstitution = member.institution && member.institution.trim() !== '';
  const hasTrack = member.track && member.track.trim() !== '';
  const hasImage = member.image && member.image.trim() !== '';

  return (
    <div className="member-modal-overlay" onClick={onClose}>
      <div 
        className={`member-modal-container ${!hasImage ? 'member-modal-no-image' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-modal-title"
      >
        <button
          onClick={onClose}
          className="member-modal-close"
          aria-label="Close member profile"
        >
          ×
        </button>

        <div className="member-modal-content">
          <div className={`member-modal-header ${!hasImage ? 'member-modal-header-no-image' : ''}`}>
            {hasImage && (
              <div className="member-modal-image-wrapper">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="member-modal-image"
                  onError={(e) => {
                    // If image fails to load, hide the image section entirely
                    const wrapper = e.target.closest('.member-modal-image-wrapper');
                    if (wrapper) {
                      wrapper.style.display = 'none';
                      e.target.closest('.member-modal-header')?.classList.add('member-modal-header-no-image');
                      e.target.closest('.member-modal-container')?.classList.add('member-modal-no-image');
                    }
                  }}
                />
              </div>
            )}
            
            <div className="member-modal-header-info">
              <h2 id="member-modal-title" className="member-modal-name">
                {member.name}
              </h2>
              <p className="member-modal-role">{member.role}</p>
              {hasTrack && <p className="member-modal-track">{member.track}</p>}
              {hasInstitution && (
                <p className="member-modal-institution">{member.institution}</p>
              )}
            </div>
          </div>

          <div className="member-modal-body">
            <section className="member-modal-section">
              <h3 className="member-modal-section-title">About</h3>
              <p className="member-modal-bio">{displayBio}</p>
            </section>

            {hasSkills && (
              <section className="member-modal-section">
                <h3 className="member-modal-section-title">Areas of Expertise</h3>
                <div className="member-modal-skills">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="member-modal-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {(hasLinkedIn || hasEmail) && (
              <section className="member-modal-section">
                <h3 className="member-modal-section-title">Connect</h3>
                <div className="member-modal-contact">
                  {hasLinkedIn && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="member-modal-contact-link"
                      aria-label={`View ${member.name}'s LinkedIn profile`}
                    >
                      <svg
                        className="member-modal-contact-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  )}
                  
                  {hasEmail && (
                    <a
                      href={`mailto:${member.email}`}
                      className="member-modal-contact-link"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg
                        className="member-modal-contact-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailModal;
