import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPlanet } from "../../core/api/planets/typing";
import { getPlanets } from "../../core/api/planets";
import { ChangeEvent } from "../../App.typing";
import { planets as PLANETS } from "../../core/moc/planets";

export const useMainPage = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [searchName, setSearchName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchPlanetsClick = () => {
    getPlanets(searchName)
      .then((data) => {
        setPlanets(data.planets);
        console.log(data.planets);
      })
      .catch(() => {
        const filteredPlanets = PLANETS.planets.filter((planet) =>
          planet.Name.toLowerCase().startsWith(searchName.toLowerCase())
        );
        setPlanets(filteredPlanets);
      }); // moc данные
  };

  const handleGetAllPlanetsClick = () => {
    getPlanets()
      .then((data) => {
        setPlanets(data.planets);
        console.log(data.planets);
      })
      .catch(() => setPlanets(PLANETS.planets)); // мок
  };

  function scrollToPlanet() {
    if (location.state?.planetId) {
      const planetElement = document.getElementById(location.state?.planetId);
      const planetsElement = document.getElementById("planets");

      if (planetElement) {
        planetElement.scrollIntoView({ behavior: "smooth" });
        navigate(".", { replace: true }); // удаляем state
      } else {
        planetsElement?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  const handleSearchNameChange = (e: ChangeEvent) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    getPlanets()
      .then((data) => {
        setPlanets(data.planets);
        console.log(data.planets);
      })
      .catch(() => setPlanets(PLANETS.planets)); // мок
  }, []);

  useEffect(() => {
    if (planets && planets.length) {
      scrollToPlanet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets]);

  return {
    planets,
    handleSearchPlanetsClick,
    handleSearchNameChange,
    handleGetAllPlanetsClick,
  };
};
