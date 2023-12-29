import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPlanet } from "../../core/api/planets/typing";
import { getPlanets } from "../../core/api/planets";
import { ChangeEvent } from "../../App.typing";
import { useDispatch } from "../../core/store";
import { useSelector } from "react-redux";
import { selectApp, selectUser } from "../../core/store/slices/selectors";
import { saveSearchName } from "../../core/store/slices/appSlice";

export const useMainPage = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [isButtonsActive, setButtonsActive] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchName } = useSelector(selectApp);
  const { isAuth } = useSelector(selectUser);

  const handleSearchPlanetsClick = () => {
    setButtonsActive(false);
    getPlanets(searchName)
      .then((data) => {
        setPlanets(data.planets);
        setButtonsActive(true);
      })
      .catch(() => setButtonsActive(true));
  };

  const handleGetAllPlanetsClick = () => {
    setButtonsActive(false);
    dispatch(saveSearchName(""));
    getPlanets()
      .then((data) => {
        setPlanets(data.planets);
        setButtonsActive(true);
      })
      .catch(() => setButtonsActive(true));
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
    dispatch(saveSearchName(e.target.value));
  };

  useEffect(() => {
    setButtonsActive(false);
    getPlanets(searchName)
      .then((data) => {
        setPlanets(data.planets);
        setButtonsActive(true);
      })
      .catch(() => setButtonsActive(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (planets && planets.length) {
      scrollToPlanet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets]);

  return {
    isAuth,
    searchName,
    isButtonsActive,
    planets,
    handleSearchPlanetsClick,
    handleSearchNameChange,
    handleGetAllPlanetsClick,
  };
};
