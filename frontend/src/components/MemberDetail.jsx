import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Linkedin, Mail, GraduationCap, X } from 'lucide-react';

const MemberDetail = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="member-detail-dialog">
        <DialogHeader>
          <button
            onClick={onClose}
            className="member-detail-close"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </DialogHeader>

        <div className="member-detail-content">
          {/* Image Section */}
          {member.headshot_url ? (
            <div className="member-detail-image-wrapper">
              <img
                src={member.headshot_url}
                alt={`${member.full_name} headshot`}
                className="member-detail-image"
                loading="eager"
                decoding="async"
                width="800"
                height="600"
                onError={(e) => {
                  // Hide image on error
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : null}

          {/* Info Section */}
          <div className={`member-detail-info ${!member.headshot_url ? 'member-detail-info-full' : ''}`}>
            <DialogTitle className="member-detail-name">
              {member.full_name}
            </DialogTitle>
            
            <DialogDescription className="member-detail-role">
              {member.role}
            </DialogDescription>

            {member.school && (
              <div className="member-detail-school">
                <GraduationCap size={16} />
                <span>{member.school}</span>
              </div>
            )}

            {/* Full Bio */}
            {member.full_bio ? (
              <div className="member-detail-bio">
                <p>{member.full_bio}</p>
              </div>
            ) : member.short_bio ? (
              <div className="member-detail-bio">
                <p>{member.short_bio}</p>
              </div>
            ) : null}

            {/* Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="member-detail-skills">
                <h4 className="member-detail-section-label">Focus Areas</h4>
                <div className="member-detail-skills-list">
                  {member.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="member-detail-skill-badge">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Links */}
            <div className="member-detail-contact">
              {(member.linkedin_url || member.email) && (
                <h4 className="member-detail-section-label">Connect</h4>
              )}
              
              <div className="member-detail-links">
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-detail-link member-detail-linkedin"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                )}
                
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="member-detail-link member-detail-email"
                  >
                    <Mail size={18} />
                    <span>Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDetail;
