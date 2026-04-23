import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "./SEOHead";
import { trackAmplitudeEvent } from "../services/amplitudeClient";

const RouteManager = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    trackAmplitudeEvent("page_view", {
      path: location.pathname,
    });
  }, [location.pathname]);

  return <SEOHead />;
};

export default RouteManager;
