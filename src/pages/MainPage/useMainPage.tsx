import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPlanet } from "../../core/api/planets/typing";
import {
  addPlanetByIdToConstellation,
  deletePlanetById,
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
import { IPlanetsTableProps } from "../../components/PlanetsTable";
import { ROUTES } from "../../App.constants";

export const useMainPage = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [planetLoading, setPlanetLoading] = useState(-1);
  const [buttonLoadingId, setButtonLoadingId] = useState(-1);
  const [isButtonTypeDelete, setIsButtonTypeDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchName } = useSelector(selectApp);
  const { isAuth, isAdmin } = useSelector(selectUser);

  const TIMER = 250;

  const handleSearchPlanetsClick = () => {
    const loadingTimer = setTimeout(() => {
      setIsPageLoading(true);
    }, TIMER);
    getPlanets(currentPage, searchName)
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
    getPlanets(currentPage)
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

  const handleAddPlanetCLick = (id: number, name: string) => {
    setIsButtonTypeDelete(true);
    const loadingTimer = setTimeout(() => {
      setPlanetLoading(id);
    }, TIMER);
    addPlanetByIdToConstellation(id)
      .then(() => {
        getPlanetsHandler();
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

  const handleCreateClick = () => {
    navigate(ROUTES.CREATE_PLANET);
  };

  const handleGetAllPlanetsClick = () => {
    dispatch(saveSearchName(""));
    getPlanetsHandler();
  };

  useEffect(() => {
    getPlanetsHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
    setCurrentPage(1);
  };

  const handlePlanetDeleted = (id: number) => {
    const loadingTimer = setTimeout(() => {
      setButtonLoadingId(id);
    }, TIMER);
    deletePlanetById(id)
      .then(() => {
        getPlanetsHandler();
        dispatch(addNotification({ message: "Планета удалена" }));
        clearTimeout(loadingTimer);
        setButtonLoadingId(-1);
      })
      .catch(() => {
        setButtonLoadingId(-1);
        clearTimeout(loadingTimer);
      });
  };

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  }
  const handlePrevPageClick = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  }

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

  const planetsTableProps: IPlanetsTableProps = {
    dataRows: planets,
    deleteHandler: handlePlanetDeleted,
    buttonLoadingId: buttonLoadingId,
    addHandler: handleAddPlanetCLick,
    isButtonTypeDelete: isButtonTypeDelete,
  };

  const isPageActive = !isPageLoading;

  return {
    isAuth,
    planets,
    isAdmin,
    searchName,
    currentPage,
    isPageActive,
    planetLoading,
    planetsTableProps,
    handleSearchPlanetsClick,
    handleGetAllPlanetsClick,
    handleSearchNameChange,
    handleAddPlanetCLick,
    handleNextPageClick,
    handlePrevPageClick,
    handleCreateClick,
  };
};
