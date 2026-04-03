/**
 * Member Data Service - Google Sheets Integration
 * 
 * Fetches member data from a published Google Sheets CSV feed,
 * normalizes the data, handles missing fields gracefully,
 * and caches the result in localStorage.
 */

import { membersData as fallbackData } from '../data/membersData';

// Configuration
const CACHE_KEY = 'echelon_members_cache';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Google Sheets CSV URL - Replace with actual published sheet URL
// Format: https://docs.google.com/spreadsheets/d/e/{SHEET_ID}/pub?output=csv
const GOOGLE_SHEET_CSV_URL = process.env.REACT_APP_MEMBERS_SHEET_URL || '';

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
 */
const parseCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return []; // Need at least header + 1 data row
  
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] ? values[index].trim() : '';
    });
    
    rows.push(row);
  }
  
  return rows;
};

/**
 * Transform CSV row into normalized member object
 */
const transformMember = (row, index) => {
  // Required fields
  const name = normalizeField(row.name);
  const role = normalizeField(row.role);
  
  // Skip if missing required fields
  if (!name || !role) {
    console.warn(`Skipping member at row ${index + 2}: missing required field (name or role)`);
    return null;
  }
  
  // Optional fields with normalization
  const track = normalizeField(row.track) || 'General';
  const preview = normalizeField(row.preview) || normalizeField(row.bio)?.substring(0, 100) || '';
  const bio = normalizeField(row.bio) || preview;
  const email = normalizeField(row.email);
  const linkedin = normalizeUrl(row.linkedin);
  const image = normalizeUrl(row.image);
  const institution = normalizeField(row.institution);
  
  // Parse skills (comma-separated)
  const skillsRaw = normalizeField(row.skills);
  const skills = skillsRaw 
    ? skillsRaw.split(',').map(s => s.trim()).filter(s => s.length > 0)
    : [];
  
  return {
    id: index + 1,
    name,
    role,
    track,
    preview,
    bio,
    email,
    linkedin,
    image,
    skills,
    institution,
    // Keep for backward compatibility
    academicLevel: normalizeField(row.academicLevel) || 'Undergraduate',
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
 * Priority:
 * 1. Cached data (if valid)
 * 2. Fresh data from Google Sheets
 * 3. Fallback to local membersData.js
 */
export const getMembers = async () => {
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
  
  // Fallback to local data
  console.log('📋 Using fallback local member data');
  return fallbackData;
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
