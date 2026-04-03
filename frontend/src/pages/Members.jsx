import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MemberCard from '../components/MemberCard';
import MemberDetailModal from '../components/MemberDetailModal';
import { trackFilters } from '../data/membersData';
import { getMembers } from '../services/memberDataService';

const Members = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch members on component mount
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        const data = await getMembers();
        setMembers(data);
        setError(null);
      } catch (err) {
        console.error('Error loading members:', err);
        setError('Failed to load member data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  // Filter and search logic with defensive handling
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      // Ensure member has required fields
      if (!member?.name || !member?.role) return false;

      // Safe field access with fallbacks
      const name = (member.name || '').toLowerCase();
      const role = (member.role || '').toLowerCase();
      const preview = (member.preview || '').toLowerCase();
      const bio = (member.bio || '').toLowerCase();
      const skills = Array.isArray(member.skills) ? member.skills : [];
      const track = member.track || 'General';

      // Search matching
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query || 
        name.includes(query) ||
        role.includes(query) ||
        preview.includes(query) ||
        bio.includes(query) ||
        skills.some(skill => (skill || '').toLowerCase().includes(query));

      // Track filter matching
      const matchesTrack = selectedTrack === 'All Tracks' || track === selectedTrack;

      return matchesSearch && matchesTrack;
    });
  }, [members, searchQuery, selectedTrack]);

  // Schema.org JSON-LD structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Echelon Equity",
    "description": "Student-run investment research platform delivering institutional-grade equity analysis and financial research",
    "url": "https://echelonequity.co",
    "sameAs": [
      "https://www.linkedin.com/company/echelon-equity",
      "https://www.instagram.com/echelonequity",
      "https://www.tiktok.com/@echelonequity"
    ],
    "member": filteredMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "worksFor": {
        "@type": "Organization",
        "name": "Echelon Equity"
      },
      ...(member.institution && { "alumniOf": member.institution }),
      ...(member.email && { "email": member.email }),
      ...(member.linkedin && { "sameAs": member.linkedin })
    }))
  };

  return (
    <>
      <Helmet>
        <title>Our Team - Echelon Equity | Student Investment Research Analysts</title>
        <meta 
          name="description" 
          content="Meet the Echelon Equity research team: exceptional undergraduate analysts from top universities delivering institutional-grade equity research, financial analysis, and investment insights across technology, healthcare, consumer, and macro sectors." 
        />
        <link rel="canonical" href="https://echelonequity.co/members" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://echelonequity.co/members" />
        <meta property="og:title" content="Our Team - Echelon Equity | Student Investment Research Analysts" />
        <meta property="og:description" content="Meet the Echelon Equity research team: exceptional undergraduate analysts from top universities delivering institutional-grade equity research and financial analysis." />
        <meta property="og:image" content="https://echelonequity.co/og-members.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://echelonequity.co/members" />
        <meta property="twitter:title" content="Our Team - Echelon Equity | Student Investment Research Analysts" />
        <meta property="twitter:description" content="Meet the Echelon Equity research team: exceptional undergraduate analysts from top universities delivering institutional-grade equity research." />
        <meta property="twitter:image" content="https://echelonequity.co/og-members.jpg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="members-page">
        {/* Hero Section */}
        <section className="members-hero">
          <div className="members-hero-container">
            <h1 className="members-hero-title">Our Team</h1>
            <p className="members-hero-subtitle">
              Echelon Equity brings together exceptional undergraduate analysts from the world's leading universities. 
              Our team produces institutional-grade investment research across equity analysis, technical trading, 
              macroeconomic policy, and strategic marketing. Each member has been rigorously selected for analytical 
              excellence, intellectual curiosity, and commitment to professional standards.
            </p>
            <p className="members-hero-text">
              Our analysts specialize in diverse sectors including technology, healthcare, financial services, 
              consumer goods, energy, and industrials. They apply sophisticated valuation frameworks, quantitative 
              methods, and fundamental research techniques typically found in top-tier investment banks and hedge funds.
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="members-controls">
          <div className="members-controls-container">
            <div className="members-search-wrapper">
              <input
                type="text"
                placeholder="Search by name, role, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="members-search-input"
                aria-label="Search members"
              />
            </div>

            <div className="members-filter-wrapper">
              <label htmlFor="track-filter" className="members-filter-label">
                Track:
              </label>
              <select
                id="track-filter"
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="members-filter-select"
                aria-label="Filter by track"
              >
                {trackFilters.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Members Grid */}
        <section className="members-grid-section">
          <div className="members-grid-container">
            {loading ? (
              <div className="members-empty-state">
                <p className="members-empty-text">Loading member data...</p>
              </div>
            ) : error ? (
              <div className="members-empty-state">
                <p className="members-empty-text">{error}</p>
              </div>
            ) : filteredMembers.length > 0 ? (
              <div className="members-grid">
                {filteredMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onClick={setSelectedMember}
                  />
                ))}
              </div>
            ) : (
              <div className="members-empty-state">
                <p className="members-empty-text">
                  No members found matching your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTrack('All Tracks');
                  }}
                  className="members-empty-button"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Additional SEO Content */}
        <section className="members-about-section">
          <div className="members-about-container">
            <h2 className="members-about-title">World-Class Research Standards</h2>
            <p className="members-about-text">
              Echelon Equity maintains the highest standards of investment research quality. Our analysts undergo 
              rigorous training in financial modeling, valuation techniques, industry analysis, and professional 
              communication. We emphasize analytical rigor, intellectual honesty, and attention to detail in all 
              research output.
            </p>
            <p className="members-about-text">
              The team works collaboratively across disciplines, bringing diverse perspectives from economics, 
              computer science, engineering, mathematics, and business. This interdisciplinary approach enables 
              comprehensive analysis that considers technical, fundamental, and macroeconomic factors.
            </p>
            <p className="members-about-text">
              Our members gain hands-on experience with professional-grade research tools, industry databases, 
              and analytical frameworks. They develop skills directly applicable to careers in investment banking, 
              hedge funds, private equity, asset management, and corporate finance.
            </p>
          </div>
        </section>

        {/* Member Detail Modal */}
        {selectedMember && (
          <MemberDetailModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </div>
    </>
  );
};

export default Members;
