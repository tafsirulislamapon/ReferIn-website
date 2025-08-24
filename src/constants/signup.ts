export const CURRENT_SITUATION_OPTIONS = [
  "Actively job seeking",
  "Employed - Casually Browsing Opportunities",
  "I want to refer others to my company and earn",
  "Recent Graduate",
  "University Student (Final Year)"
] as const;

export type CurrentSituation = typeof CURRENT_SITUATION_OPTIONS[number];
