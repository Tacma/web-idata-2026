interface WhatsAppBrandIconProps {
  iconUrl?: string;
  label: string;
  className?: string;
}

export function WhatsAppBrandIcon({ iconUrl, label, className = '' }: WhatsAppBrandIconProps) {
  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={label}
        className={className}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={256}
        height={256}
      />
    );
  }

  return null;
}
