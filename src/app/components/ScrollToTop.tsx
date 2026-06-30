import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Resets the window scroll to the top whenever the route changes. React
 * Router preserves scroll position across client-side navigation by default,
 * which otherwise drops you partway down a freshly-opened page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
