import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CONST_STATUS,
  IConstWithPlanets,
  IUpdateConstellationFormProps,
} from "../../core/api/constellations/typing";
import {
  deleteConstellationById,
  getConstellationById,
  statusConstellationById,
  updateConstellationById,
} from "../../core/api/constellations";
import { useDispatch } from "../../core/store";
import { deletePlanetByIdFromConstellation } from "../../core/api/planets";
import { addNotification } from "../../core/store/slices/appSlice";
import { ChangeEvent } from "../../App.typing";
import { IBreadcrumpsProps } from "../../components/BreadCrumbs/typing";

export const useConstellationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const TIMER = 250;

  const [constellationData, setConstellationDate] =
    useState<IConstWithPlanets>();
  const [planetLoading, setPlanetLoading] = useState(-1);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [formButtonLoading, setFormButtonLoading] = useState(false);
  const [editButtonLoading, setEditButtonLoading] = useState(false);
  const [isChangeMode, setChangeMode] = useState(false);
  const [formData, setFormData] = useState<IUpdateConstellationFormProps>({
    name: "",
    startDate: "",
    endDate: "",
  });
  const defaultConstData = useRef<IConstWithPlanets>();

  useEffect(() => {
    if (id) {
      getConstellationById(id).then((data) => {
        if (data) {
          setConstellationDate(data.constellation);
          setFormData(data.constellation);
          defaultConstData.current = data.constellation;
        }
      });
    }
  }, [id]);

  const handlePlanetDelete = (id: number, name: string) => {
    const loadingTimer = setTimeout(() => {
      setPlanetLoading(id);
    }, TIMER);
    deletePlanetByIdFromConstellation(id)
      .then((data) => {
        if (data) {
          setConstellationDate(data.constellation);
          setFormData(data.constellation);
          defaultConstData.current = data.constellation;
        }
        setPlanetLoading(-1);
        clearTimeout(loadingTimer);
        dispatch(
          addNotification({
            message: `Планета ${name} удалена успешно`,
          })
        );
      })
      .catch(() => {
        setPlanetLoading(-1);
        clearTimeout(loadingTimer);
      });
  };

  const handleConstellationChangeStatus = (status: CONST_STATUS) => {
    if (!id) return;
    const loadingTimer = setTimeout(() => {
      setFormButtonLoading(true);
    }, TIMER);
    statusConstellationById(id, status)
      .then((data) => {
        if (data) {
          setConstellationDate(data.constellation);
          setFormData(data.constellation);
          defaultConstData.current = data.constellation;
        }
        setFormButtonLoading(false);
        clearTimeout(loadingTimer);
        dispatch(
          addNotification({
            message: `Статус созвездия изменен`,
          })
        );
      })
      .catch(() => {
        setFormButtonLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  const handleDeleteConstellation = () => {
    const loadingTimer = setTimeout(() => {
      setDeleteButtonLoading(true);
    }, TIMER);
    if (id) {
      deleteConstellationById(id)
        .then(() => {
          setDeleteButtonLoading(false);
          clearTimeout(loadingTimer);
          navigate("/", { replace: true });
          dispatch(
            addNotification({
              message: `Созвездие удалено`,
            })
          );
        })
        .catch(() => {
          setDeleteButtonLoading(false);
          clearTimeout(loadingTimer);
        });
    }
  };

  const handleUpdateConstellation = () => {
    if (
      !id ||
      !formData ||
      !formData?.name ||
      !formData?.startDate ||
      !formData?.endDate
    )
      return;
    const loadingTimer = setTimeout(() => {
      setEditButtonLoading(true);
    }, TIMER);
    updateConstellationById(id, formData)
      .then((data) => {
        if (data) {
          setConstellationDate(data.constellation);
          setFormData(data.constellation);
          defaultConstData.current = data.constellation;
        }
        setEditButtonLoading(false);
        clearTimeout(loadingTimer);
        setChangeMode(false);
        dispatch(
          addNotification({
            message: `Созвездие обновлено`,
          })
        );
      })
      .catch(() => {
        setChangeMode(false);
        setEditButtonLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  const handleChangeMode = () => {
    setChangeMode(true);
  };

  function convertToCalendarDate(dateString: string) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function convertToISODate(calendarDate: string) {
    const dateParts = calendarDate.split("-");
    if (dateParts.length !== 3) {
      return calendarDate; // Возвращаем исходную строку, если формат некорректен
    }
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return calendarDate; // Возвращаем исходную строку, если значения некорректны
    }
    const isoDate = new Date(year, month - 1, day).toISOString();
    return isoDate;
  }

  const handleReset = () => {
    if (defaultConstData.current) {
      setFormData(defaultConstData.current);
      setChangeMode(false);
    }
  };

  useEffect(() => {
    if (
      !formData ||
      !formData.name ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setEditButtonLoading(true);
      return;
    }
    setEditButtonLoading(false);
  }, [formData]);

  const hadleChangeFormData = (e: ChangeEvent) => {
    const name = e.target.name;
    const value = e.target.value;
    let newValue = value;
    if (name.includes("Date")) {
      newValue = convertToISODate(value);
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const getDate = (dateString: string) => {
    const date = new Date(dateString);
    return date;
  };

  const statusColors = {
    created: "#858585",
    canceled: "#e80909",
    inprogress: "white",
    deleted: "#e80909",
    completed: "#4eff26",
  };
  const statusLabel = {
    created: "черновик",
    canceled: "отменено",
    inprogress: "в прогрессе",
    deleted: "удалено",
    completed: "подтверждено",
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors];
  };

  const crumbs = !constellationData?.formationDate
    ? [{ label: "Мое созвездие", path: "" }]
    : [
        { label: "Созвездия", path: "/constellations" },
        { label: constellationData.name, path: "" },
      ];

  const breadCrumbsProps: IBreadcrumpsProps = {
    location: location,
    crumbs: crumbs,
    isCloseButton: false,
    isAbsolute: false,
    isFixed: false,
  };

  return {
    getDate,
    handleReset,
    getStatusColor,
    handleChangeMode,
    handlePlanetDelete,
    hadleChangeFormData,
    convertToCalendarDate,
    handleUpdateConstellation,
    handleDeleteConstellation,
    handleConstellationChangeStatus,
    deleteButtonLoading,
    breadCrumbsProps,
    formButtonLoading,
    editButtonLoading,
    constellationData,
    planetLoading,
    isChangeMode,
    statusLabel,
    formData,
    id,
  };
};
