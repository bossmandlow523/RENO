import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    const isNewPage = prevPathnameRef.current !== location.pathname;
    prevPathnameRef.current = location.pathname;

    if (location.hash) {
      const delay = isNewPage ? 650 : 100;
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, delay);
    }
  }, [location]);

  return null;
}
