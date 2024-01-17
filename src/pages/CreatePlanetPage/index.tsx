import "./CreatePlanetPage.css";
import { ChangeEvent, FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { createPlanet } from "../../core/api/planets";
import { IPlanet } from "../../core/api/planets/typing";
import { BreadCrumbs } from "../../components";
import unknownIage from "/images/unknown.png";
import { useDispatch } from "../../core/store";
import { Planet } from "../../components/Planet";
import { SliderPicker } from "react-color";
import { Button } from "../../components/Button";
import { addNotification } from "../../core/store/slices/appSlice";
import { ChangeEvent as MyChangeEvent } from "../../App.typing";
import { COLOR_PALETE, ROUTES } from "../../App.constants";

export const CreatePlanetPage: FC = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
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

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createPlanetHandler = () => {
    const loadingTimer = setTimeout(() => {
      setIsButtonLoading(true);
    }, TIMER);
    createPlanet({
      name: formData.name,
      discovered: formData.discovered || "Неизвестно",
      mass: formData.mass || "Неизвестно",
      distance: formData.distance || "Неизвестно",
      info: formData.info || "Неизвестно",
      color1: formData.color1 || COLOR_PALETE.default1,
      color2: formData.color2 || COLOR_PALETE.default2,
    })
      .then(() => {
        dispatch(addNotification({ message: "Планета создана" }));
        setIsButtonLoading(false);
        clearTimeout(loadingTimer);
        navigate(ROUTES.HOME);
      })
      .catch(() => {
        setIsButtonLoading(false);
        clearTimeout(loadingTimer);
      });
  };

  const hadleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Container className="div planet_page">
        <BreadCrumbs
          location={location}
          crumbs={[{ label: "Создать планету", path: "" }]}
          isAbsolute={true}
        />

        <>
          <div className="content">
            <div className="blog admin">
              <div className="planet_page_nav">
                <input
                  style={{ backgroundColor: COLOR_PALETE.gray }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e: MyChangeEvent) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Button
                  label="Создать"
                  handler={createPlanetHandler}
                  isLoading={isButtonLoading || !formData.name}
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
            </div>
          </div>
        </>
      </Container>
    </>
  );
};
