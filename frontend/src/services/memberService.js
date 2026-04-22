/**
 * Echelon Equity - Member Service
 * Fetches approved team members from the backend API
 */

import { API_BASE_URL } from "./apiBaseUrl";

const API_URL = API_BASE_URL;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Log debug information about member data in production
 * This helps verify that only real sheet data is being rendered
 */
function logMemberDebug(member, originalHeadshot) {
  if (IS_PRODUCTION) {
    console.log('[Team Debug]', {
      name: member.full_name,
      mode: 'production',
      originalHeadshot: originalHeadshot || 'none',
      normalizedImage: member.headshot_url || 'none',
      imageRenders: !!member.headshot_url
    });
  }
}

/**
 * Fetch all approved team members from the backend
 * @returns {Promise<{success: boolean, members: Array, error: string|null}>}
 */
export async function fetchTeamMembers() {
  try {
    const response = await fetch(`${API_URL}/api/members/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorDetail = errorText;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorDetail = errorJson.detail || errorText;
      } catch {
        // Use text as-is
      }
      
      return {
        success: false,
        members: [],
        error: errorDetail || 'Failed to load team members'
      };
    }

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        members: [],
        error: 'Failed to load team members'
      };
    }

    // In production, verify no sample/demo data exists
    if (IS_PRODUCTION) {
      const hasSampleData = result.members.some(m => 
        m.id?.includes('sample') || 
        m.id?.includes('demo') ||
        m.headshot_url?.includes('unsplash') ||
        m.headshot_url?.includes('placeholder')
      );
      
      if (hasSampleData) {
        console.error('[Team Warning] Potential sample data detected in production');
      }
      
      // Log each member for verification
      result.members.forEach(member => {
        logMemberDebug(member, member._originalHeadshot);
      });
    }

    return {
      success: true,
      members: result.members || [],
      source: result.source,
      error: null
    };

  } catch (error) {
    console.error('Error fetching team members:', error);
    return {
      success: false,
      members: [],
      error: 'Network error. Please try again later.'
    };
  }
}

/**
 * Debug function to check sheet connectivity (development only)
 */
export async function debugSheetConnection() {
  if (IS_PRODUCTION) return null;
  
  try {
    const response = await fetch(`${API_URL}/api/members/debug`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Filter members by search query
 * Safely handles missing values
 */
export function filterMembers(members, query) {
  if (!query || query.trim() === '') {
    return members;
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  return members.filter(member => {
    const searchableText = [
      member.full_name,
      member.role,
      member.school,
      member.short_bio,
      ...(member.skills || [])
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    
    return searchableText.includes(lowerQuery);
  });
}

/**
 * Filter members by skill/tag
 */
export function filterMembersBySkill(members, skill) {
  if (!skill || skill === 'all') {
    return members;
  }
  
  return members.filter(member => {
    if (!member.skills || !Array.isArray(member.skills)) {
      return false;
    }
    return member.skills.some(s => 
      s.toLowerCase() === skill.toLowerCase()
    );
  });
}

/**
 * Get unique skills from all members for filter dropdown
 */
export function getUniqueSkills(members) {
  const skillsSet = new Set();
  
  members.forEach(member => {
    if (member.skills && Array.isArray(member.skills)) {
      member.skills.forEach(skill => {
        if (skill && skill.trim()) {
          skillsSet.add(skill.trim());
        }
      });
    }
  });
  
  return Array.from(skillsSet).sort();
}
