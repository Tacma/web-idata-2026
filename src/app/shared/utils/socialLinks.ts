export interface ManagedSocialMediaLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export type ManagedSocialPlatform = 'facebook' | 'linkedin' | 'instagram' | 'youtube';

export interface ManagedSocialLinkItem {
  key: ManagedSocialPlatform;
  label: string;
  href: string;
}

const fallbackSocialMedia: Required<ManagedSocialMediaLinks> = {
  facebook: 'https://www.facebook.com/iData.Global.IA/',
  instagram: 'https://www.instagram.com/idata.global/',
  linkedin: 'https://www.linkedin.com/company/idata-global-latam/posts/?feedView=all',
  youtube: 'https://www.youtube.com/@idata.global',
};

export function getManagedSocialMedia(raw?: ManagedSocialMediaLinks | null) {
  return {
    facebook: raw?.facebook || fallbackSocialMedia.facebook,
    instagram: raw?.instagram || fallbackSocialMedia.instagram,
    linkedin: raw?.linkedin || fallbackSocialMedia.linkedin,
    youtube: raw?.youtube || fallbackSocialMedia.youtube,
  };
}

export function getManagedSocialLinks(raw?: ManagedSocialMediaLinks | null): ManagedSocialLinkItem[] {
  const socialMedia = getManagedSocialMedia(raw);

  return [
    { key: 'facebook', label: 'Facebook', href: socialMedia.facebook },
    { key: 'linkedin', label: 'LinkedIn', href: socialMedia.linkedin },
    { key: 'instagram', label: 'Instagram', href: socialMedia.instagram },
    { key: 'youtube', label: 'YouTube', href: socialMedia.youtube },
  ].filter((item) => Boolean(item.href));
}
