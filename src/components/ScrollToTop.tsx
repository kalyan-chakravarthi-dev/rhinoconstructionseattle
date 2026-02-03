import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures route navigations start at the top of the page.
 * React Router doesn't automatically reset scroll position.
 */
export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Use RAF so it runs after the new route content paints.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location.pathname]);

  return null;
}
