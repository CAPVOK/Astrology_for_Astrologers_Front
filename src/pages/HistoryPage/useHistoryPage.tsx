import { useEffect } from "react";
import { getConstellations } from "../../core/api/constellations";

export const useHistoryPage = () => {
  useEffect(() => {
    getConstellations();
  }, []);

  return {};
};
