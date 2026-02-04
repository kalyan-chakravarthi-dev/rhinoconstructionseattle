import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures route navigations start at the top of the page.
 * React Router doesn't automatically reset scroll position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll for faster response
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
