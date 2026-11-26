// Production URL is configurable by site owner.
// Kept empty until configured. Never invent a domain.
export const SITE_CONFIG = {
  productionUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) || '',
};
