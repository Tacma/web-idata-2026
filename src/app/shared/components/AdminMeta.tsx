import { useEffect } from 'react';

interface AdminMetaProps {
  title: string;
}

export function AdminMeta({ title }: AdminMetaProps) {
  useEffect(() => {
    document.title = title;

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex,nofollow';
  }, [title]);

  return null;
}
