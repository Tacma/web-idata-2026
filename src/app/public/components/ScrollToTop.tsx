import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

const PRESERVED_SCROLL_KEY = 'idata-preserve-scroll-y';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const preservedScroll = window.sessionStorage.getItem(PRESERVED_SCROLL_KEY);
    if (preservedScroll !== null) {
      window.sessionStorage.removeItem(PRESERVED_SCROLL_KEY);
      const scrollY = Number(preservedScroll);

      requestAnimationFrame(() => {
        window.scrollTo(0, Number.isFinite(scrollY) ? scrollY : 0);
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
