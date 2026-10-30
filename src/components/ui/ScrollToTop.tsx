import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const isSamePageHashChange = prevPathnameRef.current === pathname && Boolean(hash);
    prevPathnameRef.current = pathname;

    if (isSamePageHashChange && hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};
