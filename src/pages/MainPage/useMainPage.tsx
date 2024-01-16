import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPlanet } from "../../core/api/planets/typing";
import {
  addPlanetByIdToConstellation,
  getPlanets,
} from "../../core/api/planets";
import { ChangeEvent } from "../../App.typing";
import { useDispatch } from "../../core/store";
import { useSelector } from "react-redux";
import { selectApp, selectUser } from "../../core/store/slices/selectors";
import {
  addNotification,
  saveSearchName,
} from "../../core/store/slices/appSlice";

export const useMainPage = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [planetLoading, setPlanetLoading] = useState(-1);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchName } = useSelector(selectApp);
  const { isAuth } = useSelector(selectUser);

  const TIMER = 250;

  const handleSearchPlanetsClick = () => {
    const loadingTimer = setTimeout(() => {
      setIsPageLoading(true);
    }, TIMER);
    getPlanets(searchName)
      .then((data) => {
        if (data) {
          setPlanets(data.planets);
          setIsPageLoading(false);
          clearTimeout(loadingTimer);
        }
      })
      .catch(() => {
        setIsPageLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  const getPlanetsHandler = () => {
    const loadingTimer = setTimeout(() => {
      setIsPageLoading(true);
    }, TIMER);
    getPlanets()
      .then((data) => {
        if (data) {
          setPlanets(data.planets);
        }
        clearTimeout(loadingTimer);
        setIsPageLoading(false);
      })
      .catch(() => {
        setIsPageLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  const handleGetAllPlanetsClick = () => {
    dispatch(saveSearchName(""));
    getPlanetsHandler();
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

  const handleAddPlanetCLick = (id: number, name: string) => {
    const loadingTimer = setTimeout(() => {
      setPlanetLoading(id);
    }, TIMER);
    addPlanetByIdToConstellation(id)
      .then(() => {
        clearTimeout(loadingTimer);
        setPlanetLoading(-1);
        dispatch(
          addNotification({
            message: `Планета ${name} добавлена успешно`,
          })
        );
      })
      .catch(() => {
        clearTimeout(loadingTimer);
        setPlanetLoading(-1);
      });
  };

  const handleSearchNameChange = (e: ChangeEvent) => {
    dispatch(saveSearchName(e.target.value));
  };

  useEffect(() => {
    getPlanetsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (planets && planets.length) {
      scrollToPlanet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets]);

  const isPageActive = !isPageLoading;

  return {
    isAuth,
    planets,
    searchName,
    isPageActive,
    planetLoading,
    handleSearchPlanetsClick,
    handleGetAllPlanetsClick,
    handleSearchNameChange,
    handleAddPlanetCLick,
  };
};
