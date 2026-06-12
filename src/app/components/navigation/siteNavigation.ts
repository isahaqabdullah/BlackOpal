import type { SiteSettingsContent } from '../../content/siteContent';

export type SiteNavigationModel = SiteSettingsContent['navigation'] & {
  logoSubtitle?: string;
};

const siteNavigationProfiles: Record<string, Partial<SiteNavigationModel>> = {
  'black-opal-india': {
    logoImage: '/images/BlackOpallogo.avif',
    logoAlt: 'Black Opal logo',
    logoSubtitle: 'A Black Opal Group Company',
  },
};

export function getActiveSiteId(siteSettings: SiteSettingsContent) {
  return process.env.NEXT_PUBLIC_SITE_ID || siteSettings.siteId || 'black-opal-india';
}

export function getSiteNavigation(siteSettings: SiteSettingsContent): SiteNavigationModel {
  const profile = siteNavigationProfiles[getActiveSiteId(siteSettings)] ?? {};

  return {
    ...siteSettings.navigation,
    ...profile,
  };
}
