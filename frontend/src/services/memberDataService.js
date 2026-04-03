/**
 * Member Data Service - Google Sheets Integration
 * 
 * Fetches member data from a published Google Sheets CSV feed,
 * normalizes the data, handles missing fields gracefully,
 * and caches the result in localStorage.
 * 
 * PRODUCTION MODE: When REACT_APP_MEMBERS_SHEET_URL is configured,
 * this service treats the Google Sheet as the live source of truth
 * and does NOT mix with sample/fallback data.
 */

import { membersData as fallbackData } from '../data/membersData';

// Configuration
const CACHE_KEY = 'echelon_members_cache';
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours (for live form updates)

// Google Sheets CSV URL - Replace with actual published sheet URL
// Format: https://docs.google.com/spreadsheets/d/e/{SHEET_ID}/pub?output=csv
const GOOGLE_SHEET_CSV_URL = process.env.REACT_APP_MEMBERS_SHEET_URL || '';

// Production mode: If sheet URL is configured, we're in production
const IS_PRODUCTION = Boolean(GOOGLE_SHEET_CSV_URL && GOOGLE_SHEET_CSV_URL.trim() !== '');

/**
 * Normalize a field value - trim whitespace and convert empty strings to null
 */
const normalizeField = (value) => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
};

/**
 * Validate and normalize URL
 */
const normalizeUrl = (url) => {
  const normalized = normalizeField(url);
  if (!normalized) return null;
  
  // Basic URL validation
  try {
    new URL(normalized);
    return normalized;
  } catch {
    // If it's not a valid URL, return null
    return null;
  }
};

/**
 * Parse CSV text into array of objects
 * Handles quoted fields and commas within fields (real-world form data)
 */
const parseCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return []; // Need at least header + 1 data row
  
  // Parse CSV line handling quotes and commas
  const parseLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };
  
  const headers = parseLine(lines[0]).map(h => h.replace(/^"|"$/g, '').trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const row = {};
    
    headers.forEach((header, index) => {
      // Remove surrounding quotes and trim
      const value = values[index] ? values[index].replace(/^"|"$/g, '').trim() : '';
      row[header] = value;
    });
    
    rows.push(row);
  }
  
  return rows;
};

/**
 * Transform CSV row into normalized member object
 * Maps exact Google Form column names to member data structure
 * 
 * Required fields: Full Name, Role
 * Visibility control: Show my profile on the website?
 */
const transformMember = (row, index) => {
  // Required fields from live form
  const name = normalizeField(row['Full Name'] || row['full name'] || row['name']);
  const role = normalizeField(row['Role'] || row['role']);
  
  // Visibility control - only show approved members
  const showOnWebsite = normalizeField(
    row['Show my profile on the website?'] || 
    row['show my profile on the website?'] ||
    row['Show Profile'] ||
    row['show profile']
  );
  
  // Check if member opted in to be displayed
  const isApprovedForDisplay = showOnWebsite && 
    (showOnWebsite.toLowerCase() === 'yes' || 
     showOnWebsite.toLowerCase() === 'true' || 
     showOnWebsite.toLowerCase() === 'y' ||
     showOnWebsite === '1');
  
  // Skip if missing required fields OR not approved for display
  if (!name || !role) {
    console.warn(`Skipping member at row ${index + 2}: missing required fields (Full Name: "${name}", Role: "${role}")`);
    return null;
  }
  
  if (!isApprovedForDisplay) {
    console.log(`Skipping member at row ${index + 2}: profile not approved for public display (Full Name: "${name}")`);
    return null;
  }
  
  // Optional fields from live form
  const shortBio = normalizeField(row['Short Bio'] || row['short bio'] || row['preview']);
  const fullBio = normalizeField(row['Full Bio'] || row['full bio'] || row['bio']);
  
  // Use Short Bio for preview, Full Bio for expanded view
  // If only one exists, use it for both
  const preview = shortBio || (fullBio ? fullBio.substring(0, 150) + '...' : '');
  const bio = fullBio || shortBio || '';
  
  const email = normalizeField(row['Email'] || row['email']);
  const linkedin = normalizeUrl(row['LinkedIn URL'] || row['linkedin url'] || row['linkedin']);
  
  // Headshot - if missing, will be null (no fallback image)
  const headshot = normalizeUrl(row['Headshot'] || row['headshot'] || row['image'] || row['photo']);
  
  const school = normalizeField(row['school'] || row['School'] || row['institution']);
  
  // Skills / Sectors of Interest - parse comma or semicolon separated
  const skillsRaw = normalizeField(
    row['Skills / Sectors of Interest'] || 
    row['skills / sectors of interest'] ||
    row['Skills'] ||
    row['skills']
  );
  const skills = skillsRaw 
    ? skillsRaw.split(/[,;]/).map(s => s.trim()).filter(s => s.length > 0)
    : [];
  
  // Track is not in the form, default to General
  const track = normalizeField(row['Track'] || row['track']) || 'General';
  
  return {
    id: `member-${index + 1}-${Date.now()}`, // Unique ID
    name,
    role,
    track,
    preview,
    bio,
    email,
    linkedin,
    image: headshot, // null if not provided (no fallback)
    skills,
    institution: school,
    academicLevel: 'Student', // Default for all members
  };
};

/**
 * Fetch members from Google Sheets CSV
 */
const fetchMembersFromSheet = async () => {
  if (!GOOGLE_SHEET_CSV_URL) {
    console.warn('Google Sheet URL not configured, using fallback data');
    return null;
  }
  
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Transform and filter out invalid rows
    const members = rows
      .map(transformMember)
      .filter(member => member !== null);
    
    if (members.length === 0) {
      throw new Error('No valid members found in spreadsheet');
    }
    
    console.log(`✅ Loaded ${members.length} members from Google Sheets`);
    return members;
    
  } catch (error) {
    console.error('Failed to fetch members from Google Sheets:', error);
    return null;
  }
};

/**
 * Get cached members data
 */
const getCachedMembers = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      console.log('📦 Using cached member data');
      return data;
    }
    
    // Cache expired
    console.log('⏰ Cache expired, will fetch fresh data');
    return null;
    
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

/**
 * Save members data to cache
 */
const setCachedMembers = (data) => {
  try {
    const cacheObject = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
    console.log('💾 Members data cached');
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

/**
 * Main function to get members data
 * 
 * PRODUCTION MODE (when REACT_APP_MEMBERS_SHEET_URL is configured):
 * - Only returns Google Sheets data (live source of truth)
 * - Does NOT fallback to sample data
 * - Returns empty array if sheet fails (shows proper error state)
 * 
 * DEVELOPMENT MODE (when REACT_APP_MEMBERS_SHEET_URL is not configured):
 * - Uses local fallback data
 * 
 * Priority in Production:
 * 1. Cached data (if valid and fresh)
 * 2. Fresh data from Google Sheets
 * 3. Empty array (triggers error state, not sample data)
 */
export const getMembers = async () => {
  // Development mode - use fallback data
  if (!IS_PRODUCTION) {
    console.log('📋 Development mode: Using local fallback member data');
    console.log('💡 To enable production mode, set REACT_APP_MEMBERS_SHEET_URL in .env');
    return fallbackData;
  }
  
  // Production mode - Google Sheets only
  console.log('🚀 Production mode: Fetching from Google Sheets');
  
  // Try cache first
  const cached = getCachedMembers();
  if (cached) {
    return cached;
  }
  
  // Try fetching from Google Sheets
  const sheetMembers = await fetchMembersFromSheet();
  if (sheetMembers) {
    setCachedMembers(sheetMembers);
    return sheetMembers;
  }
  
  // In production, return empty array instead of fallback data
  // This will trigger the error state in the UI
  console.error('❌ Production mode: Failed to load Google Sheets data. Showing error state.');
  console.error('💡 Members page will show error message. Check sheet URL and publication settings.');
  return [];
};

/**
 * Force refresh - clears cache and fetches fresh data
 */
export const refreshMembers = async () => {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log('🔄 Cache cleared, fetching fresh data...');
    return await getMembers();
  } catch (error) {
    console.error('Error refreshing members:', error);
    return fallbackData;
  }
};

/**
 * Clear cache manually
 */
export const clearMembersCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log('🗑️ Members cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Get production mode status
 */
export const isProductionMode = () => IS_PRODUCTION;
