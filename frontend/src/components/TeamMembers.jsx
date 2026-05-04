import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Linkedin, Mail, GraduationCap, ChevronRight } from 'lucide-react';
import MemberDetail from './MemberDetail';
import { 
  fetchTeamMembers, 
  filterMembers, 
  getUniqueSkills,
  filterMembersBySkill 
} from '../services/memberService';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);

  // Fetch members on mount
  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      setError(null);
      
      const result = await fetchTeamMembers();
      
      if (result.success) {
        setMembers(result.members);
        setFilteredMembers(result.members);
        setAvailableSkills(getUniqueSkills(result.members));
        
        // Log verification info in production
        if (IS_PRODUCTION && result.members.length > 0) {
          console.log('[Team] Loaded', result.members.length, 'members from', result.source);
          
          // Verify no sample data
          const sampleCheck = result.members.filter(m => 
            m.id?.includes('sample') || 
            m.headshot_url?.includes('unsplash') ||
            m.headshot_url?.includes('placeholder')
          );
          
          if (sampleCheck.length > 0) {
            console.error('[Team Warning] Sample data detected:', sampleCheck.map(m => m.full_name));
          }
          
          // Log image status
          const withImages = result.members.filter(m => m.headshot_url).length;
          const withoutImages = result.members.length - withImages;
          console.log(`[Team] Images: ${withImages} with, ${withoutImages} without`);
        }
      } else {
        setError(result.error || 'Failed to load team members');
      }
      
      setLoading(false);
    };

    loadMembers();
  }, []);

  // Apply filters when search or skill changes
  useEffect(() => {
    let filtered = members;
    
    // Apply skill filter first
    if (selectedSkill !== 'all') {
      filtered = filterMembersBySkill(filtered, selectedSkill);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filterMembers(filtered, searchQuery);
    }
    
    setFilteredMembers(filtered);
  }, [searchQuery, selectedSkill, members]);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  // Loading state
  if (loading) {
    return (
      <div className="team-members-section">
        <div className="content-container-final">
          <div className="team-loading-state">
            <p>Loading team members...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="team-members-section">
        <div className="content-container-final">
          <div className="team-error-state">
            <h3>Unable to Load Team Data</h3>
            <p>{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="cta-primary-final"
              style={{ marginTop: '1rem' }}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="team-members-section">
      <div className="content-container-final">
        {/* Filters */}
        <div className="team-filters">
          <div className="team-search-wrapper">
            <Search className="team-search-icon" size={18} />
            <Input
              type="text"
              placeholder="Search by name, role, school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="team-search-input"
            />
          </div>
          
          {availableSkills.length > 0 && (
            <div className="team-skill-filter">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="team-skill-select"
              >
                <option value="all">All Focus Areas</option>
                {availableSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="team-results-count">
          <p>
            {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedSkill !== 'all' && ` in ${selectedSkill}`}
          </p>
        </div>

        {/* Members Grid */}
        {filteredMembers.length > 0 ? (
          <div className="team-grid">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="team-card"
                onClick={() => handleMemberClick(member)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMemberClick(member);
                  }
                }}
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Card Header with Image */}
                {member.headshot_url ? (
                  <div className="team-card-image-wrapper">
                    <img
                      src={member.headshot_url}
                      alt={`${member.full_name} headshot`}
                      className="team-card-image"
                      loading="eager"
                      decoding="async"
                      width="600"
                      height="400"
                      onError={(e) => {
                        // Hide image on error - don't show placeholder
                        e.target.style.display = 'none';
                        e.target.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                ) : null}

                {/* Card Content */}
                <div className={`team-card-content ${!member.headshot_url ? 'team-card-content-full' : ''}`}>
                  <h3 className="team-card-name">{member.full_name}</h3>
                  <p className="team-card-role">{member.role}</p>
                  
                  {member.school && (
                    <div className="team-card-school">
                      <GraduationCap size={14} />
                      <span>{member.school}</span>
                    </div>
                  )}
                  
                  {member.short_bio && (
                    <p className="team-card-bio">{member.short_bio}</p>
                  )}
                  
                  {/* Skills */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="team-card-skills">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="team-skill-badge">
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 3 && (
                        <Badge variant="outline" className="team-skill-badge team-skill-more">
                          +{member.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* Social Links Preview */}
                  <div className="team-card-links">
                    {member.linkedin_url && (
                      <Linkedin size={16} className="team-card-link-icon" />
                    )}
                    {member.email && (
                      <Mail size={16} className="team-card-link-icon" />
                    )}
                    <ChevronRight size={16} className="team-card-chevron" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="team-empty-state">
            <p>No members found{searchQuery && ' matching your search'}.</p>
            {searchQuery && (
              <Button 
                onClick={() => { setSearchQuery(''); setSelectedSkill('all'); }}
                variant="outline"
                className="cta-secondary-final"
                style={{ marginTop: '1rem' }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      <MemberDetail
        member={selectedMember}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default TeamMembers;
