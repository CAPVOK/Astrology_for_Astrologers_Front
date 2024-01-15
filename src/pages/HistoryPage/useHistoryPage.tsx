import { useEffect, useState } from "react";
import { getConstellations } from "../../core/api/constellations";
import { IConstellation } from "../../core/api/constellations/typing";

export const useHistoryPage = () => {
  const [constellations, setConstellations] = useState<IConstellation[]>();

  useEffect(() => {
    getConstellations().then((data) => {
      if (data?.constellations) {
        setConstellations(data.constellations);
      }
    });
  }, []);

  return { constellations };
};
