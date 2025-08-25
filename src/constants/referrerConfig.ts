// Centralized referrer count configuration
// Change this value to automatically update all URL parameters throughout the app
export const REFERRER_COUNT = 10; 

// Helper function to determine if there are referrers
export const hasReferrers = () => REFERRER_COUNT > 0;

// Helper function to get referrer count
export const getReferrerCount = () => REFERRER_COUNT;
