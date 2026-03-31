/**
 * Data Provider Configuration
 * Controls whether the admin uses local mock data or API calls
 * 
 * MODE OPTIONS:
 * - 'mock': Use local in-memory data (for development/export)
 * - 'api': Use real backend API (for production with Lovable/Supabase)
 */

export type DataProviderMode = 'mock' | 'api';

// Configure data provider mode
export const DATA_PROVIDER: DataProviderMode = 'mock';

// API base URL (used when mode is 'api')
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Helper to check current mode
export const isUsingMockData = () => DATA_PROVIDER === 'mock';
export const isUsingAPIData = () => DATA_PROVIDER === 'api';
