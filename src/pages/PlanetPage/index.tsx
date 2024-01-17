import "./PlanetPage.css";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import {
  addPlanetPhotoById,
  getPlanetById,
  updatePlanetById,
} from "../../core/api/planets";
import { IPlanet } from "../../core/api/planets/typing";
import { BreadCrumbs } from "../../components";
import unknownIage from "/images/unknown.png";
import { useDispatch, useSelector } from "../../core/store";
import { selectApp } from "../../core/store/slices/selectors";
import { Planet } from "../../components/Planet";
import { SliderPicker } from "react-color";
import { Button } from "../../components/Button";
import { addNotification } from "../../core/store/slices/appSlice";
import { COLOR_PALETE, ROUTES } from "../../App.constants";

export const PlanetPage: FC = () => {
  const { id } = useParams();

  const [planetData, setPlanetData] = useState<IPlanet | null>(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isPhotoButtonLoading, setIsPhotoButtonLoading] = useState(false);
  const [img, setImg] = useState<File | null>();
  const [formData, setFormData] = useState<IPlanet>({
    planetId: 0,
    name: "",
    discovered: "",
    mass: "",
    distance: "",
    info: "",
    color1: COLOR_PALETE.default1,
    color2: COLOR_PALETE.default2,
    status: "",
    imageName: "",
  });

  const TIMER = 250;

  const { isAdmin } = useSelector(selectApp);
  const location = useLocation();
  const dispatch = useDispatch();

  const updatePlanet = () => {
    const loadingTimer = setTimeout(() => {
      setIsButtonLoading(true);
    }, TIMER);
    updatePlanetById(formData.planetId, formData)
      .then((data) => {
        if (data) {
          setPlanetData(data.planet);
          setFormData(data.planet);
        }
        dispatch(addNotification({ message: "Планета обновлена" }));
        setIsButtonLoading(false);
        clearTimeout(loadingTimer);
      })
      .catch(() => {
        setIsButtonLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  const addPlanetPhoto = () => {
    const loadingTimer = setTimeout(() => {
      setIsPhotoButtonLoading(true);
    }, TIMER);
    if (!img) return;
    const formDataImg = new FormData();
    formDataImg.append("image", img);
    addPlanetPhotoById(formData.planetId, formDataImg)
      .then((data) => {
        if (data) {
          setPlanetData(data.planet);
          setFormData(data.planet);
        }
        setImg(null);
        setIsPhotoButtonLoading(false);
        clearTimeout(loadingTimer);
        dispatch(addNotification({ message: "Фото обновлено" }));
      })
      .catch(() => {
        setImg(null);
        setIsPhotoButtonLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  useEffect(() => {
    if (id) {
      getPlanetById(id).then((data) => {
        if (data?.planet) {
          setPlanetData(data.planet);
          setFormData(data.planet);
        }
      });
    }
  }, [id]);

  const hadleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const isButtonDisable = () => {
    if (!planetData) return false;
    const element = Object.keys(formData).find(
      (key) =>
        formData[key as keyof IPlanet] !== planetData[key as keyof IPlanet]
    );
    if (element) return false;
    return true;
  };

  const isCrumbs =
    location.state?.fromPage &&
    location.state?.fromPage.includes(ROUTES.CONSTELLATIONS);

  if (!planetData || !planetData.name) {
    return (
      <>
        <BreadCrumbs location={location} isCrumbs={false} crumbs={[]} />
        <Container className="planet_page-loader">
          <h1>Загрузка</h1>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className="div planet_page">
        <BreadCrumbs
          location={location}
          crumbs={[{ label: planetData?.name || "", path: "" }]}
          isAbsolute={true}
          isCrumbs={!isCrumbs}
        />
        {isAdmin ? (
          <>
            <div className="content">
              <div className="blog admin">
                <div className="planet_page_nav">
                  <h1>{formData.name}</h1>
                  <Button
                    label="Сохранить"
                    handler={updatePlanet}
                    isLoading={isButtonDisable() || isButtonLoading}
                  />
                </div>
                <div className="info admin">
                  <textarea
                    onChange={hadleChangeText}
                    name="info"
                    value={formData.info}
                  />
                </div>
                <div className="info admin">
                  <p>Открытие:</p>
                  <textarea
                    onChange={hadleChangeText}
                    name="discovered"
                    value={formData.discovered}
                  />
                </div>
                <div className="info admin">
                  <p>Масса:</p>
                  <textarea
                    onChange={hadleChangeText}
                    name="mass"
                    value={formData.mass}
                  />
                </div>
                <div className="info admin">
                  <p>Расстояние до земли:</p>
                  <textarea
                    onChange={hadleChangeText}
                    name="distance"
                    value={formData.distance}
                  />
                </div>
                <div className="info admin">
                  <p>Цвет 1:</p>
                  <SliderPicker
                    onChange={(color) =>
                      setFormData({ ...formData, color1: color.hex })
                    }
                    color={formData.color1}
                  />
                </div>
                <div className="info admin">
                  <p>Цвет 2:</p>
                  <SliderPicker
                    onChange={(color) =>
                      setFormData({ ...formData, color2: color.hex })
                    }
                    color={formData.color2}
                  />
                </div>
              </div>
              <div className="image">
                <div className="one_planet small">
                  <Planet color1={formData.color1} color2={formData.color2} />
                </div>
                <div className="one_planet">
                  {!formData.imageName ||
                  formData.imageName.includes("unknown.png") ? (
                    <img src={unknownIage} alt="" />
                  ) : (
                    <img src={formData.imageName} alt={formData.name} />
                  )}
                </div>
                <div className="image_buttons">
                  <Form.Control
                    style={{}}
                    type="file"
                    name="img"
                    onChange={(e) =>
                      setImg((e.target as HTMLInputElement).files?.[0] || null)
                    }
                  />
                  <Button
                    label="Сохранить"
                    isFullWidth={true}
                    handler={addPlanetPhoto}
                    isLoading={!img || isPhotoButtonLoading}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="content">
            <div className="blog">
              <div className="decoration_block"></div>
              <div className="about">
                <h1>{planetData?.name}</h1>
                <p>{planetData?.info}</p>
                <div className="info">
                  <h3>Открытие:</h3>
                  <p>{planetData?.discovered}</p>
                </div>
                <div className="info">
                  <h3>Масса:</h3>
                  <p>{planetData?.mass}</p>
                </div>
                <div className="info">
                  <h3>Расстояние до земли:</h3>
                  <p>{planetData?.distance}</p>
                </div>
              </div>
            </div>
            <div className="image">
              {!planetData.imageName ||
              planetData.imageName.includes("unknown.png") ? (
                <img src={unknownIage} alt="" />
              ) : (
                <img src={planetData.imageName} alt={planetData.name} />
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
