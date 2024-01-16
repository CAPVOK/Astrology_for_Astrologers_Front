import { useEffect, useRef, useState } from "react";
import {
  getConstellations,
  statusConstellationById,
} from "../../core/api/constellations";
import {
  CONST_STATUS,
  IConstellation,
  IGetConstellationsParams,
} from "../../core/api/constellations/typing";
import { IConstellationTableProps } from "../../components/ConstellationTable";
import { useLocation } from "react-router-dom";
import { IBreadcrumpsProps } from "../../components/BreadCrumbs/typing";
import { IFiltersProps } from "../../components/Filters";
import { ChangeEvent } from "../../App.typing";
import { useDispatch } from "../../core/store";
import { useSelector } from "react-redux";
import { selectApp } from "../../core/store/slices/selectors";
import {
  addNotification,
  saveEndFormationDate,
  saveSearchConstName,
  saveSearchStatus,
  saveStartFormationDate,
} from "../../core/store/slices/appSlice";

export const useHistoryPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [constellations, setConstellations] = useState<IConstellation[]>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [buttonLoadingId, setButtonLoadingId] = useState(0);
  const [buttonLoadingStatus, setButtonLoadingStatus] = useState<CONST_STATUS>(
    CONST_STATUS.CREATED
  );

  const prevConstellations = useRef<IConstellation[]>();

  const {
    startFormationDate: selectedStartDate,
    endFromationDate: selectedEndDate,
    searchStatus: selectedStatus,
    searchConstName,
    isAdmin,
  } = useSelector(selectApp);

  const TIMER_POOL = 1000;

  useEffect(() => {
    if (constellations) {
      if (searchConstName) {
        filterConstellations(searchConstName, constellations);
      } else {
        setConstellations(prevConstellations.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchConstName]);

  //первый запрос
  useEffect(() => {
    loadHistoryHandler({
      startFormationDate: selectedStartDate,
      endFormationDate: selectedEndDate,
      constellationStatus: selectedStatus,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEndDate, selectedStartDate, selectedStatus]);

  useEffect(() => {
    const longPooling = setInterval(
      () =>
        loadHistoryHandler({
          startFormationDate: selectedStartDate,
          endFormationDate: selectedEndDate,
          constellationStatus: selectedStatus,
        }),
      TIMER_POOL
    );
    return () => clearInterval(longPooling);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEndDate, selectedStartDate, selectedStatus, searchConstName]);

  const loadHistoryHandler = (params: IGetConstellationsParams) => {
    getConstellations(params)
      .then((data) => {
        if (data?.constellations) {
          filterConstellations(searchConstName, data.constellations);
        }
        setIsPageLoading(false);
      })
      .catch(() => {
        setIsPageLoading(false);
      });
  };

  const updateConstellationStatus = (id: number, status: CONST_STATUS) => {
    setButtonLoadingId(id);
    setButtonLoadingStatus(status);
    statusConstellationById(id, status)
      .then(() => {
        dispatch(addNotification({ message: "Статус обновлен" }));
        setButtonLoadingId(0);
        setButtonLoadingStatus(CONST_STATUS.CREATED);
      })
      .catch(() => {
        setButtonLoadingId(0);
        setButtonLoadingStatus(CONST_STATUS.CREATED);
      });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(saveSearchStatus(value));
  };

  const handleDateChange = (e: ChangeEvent) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "constName") {
      dispatch(saveSearchConstName(value));
      return;
    }
    if (name === "startDate") {
      dispatch(saveStartFormationDate(value));
    } else {
      dispatch(saveEndFormationDate(value));
    }
  };

  function filterConstellations(
    filterName: string,
    constellations: IConstellation[]
  ) {
    if (constellations && constellations.length) {
      prevConstellations.current = constellations;
    }
    const newConstellations = constellations.filter((stella) =>
      stella.name.includes(filterName)
    );
    setConstellations(newConstellations);
  }

  const tableProps: IConstellationTableProps = {
    dataRows: constellations,
    isAdmin: isAdmin,
    completeHandler: updateConstellationStatus,
    buttonLoadingId: buttonLoadingId,
    buttonLoadingStatus: buttonLoadingStatus,
  };

  const crumbsProps: IBreadcrumpsProps = {
    location: location,
    crumbs: [{ label: "Созвездия", path: "/constellations" }],
    isFixed: false,
    isCloseButton: false,
  };

  const filtersProps: IFiltersProps = {
    handleStatusChange: handleStatusChange,
    handleDateChange: handleDateChange,
    selectedStatus: selectedStatus,
    selectedStartDate: selectedStartDate,
    selectedEndDate: selectedEndDate,
    selectedName: searchConstName,
    isAdmin: isAdmin,
  };

  return { tableProps, isPageLoading, crumbsProps, filtersProps };
};
