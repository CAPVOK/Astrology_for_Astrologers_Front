import { useEffect, useState } from "react";
import { IPlanet } from "../../core/api/planets/typing";
import { getPlanets } from "../../core/api/planets";
import { ChangeEvent } from "../../App.typing";

export const useMainPage = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [searchName, setSearchName] = useState("");

  const handleSearchPlanetsClick = () => {
    getPlanets(searchName).then((data) => {
      setPlanets(data.planets);
      console.log(data.planets);
    });
  };

  const handleGetAllPlanetsClick = () => {
    getPlanets().then((data) => {
      setPlanets(data.planets);
      console.log(data.planets);
    });
  };

  useEffect(() => {
    getPlanets().then((data) => {
      setPlanets(data.planets);
      console.log(data.planets);
    });
  }, []);

  const handleSearchNameChange = (e: ChangeEvent) => {
    setSearchName(e.target.value);
  };

  return {
    planets,
    handleSearchPlanetsClick,
    handleSearchNameChange,
    handleGetAllPlanetsClick,
  };
};
