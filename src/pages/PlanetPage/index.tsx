import "./PlanetPage.css";
import { FC, useEffect, useState } from "react";
import { IPlanetPageProps } from "./typing";
import { Link, useLocation, useParams } from "react-router-dom";
import { getPlanetById } from "../../core/api/planets";
import { IPlanet } from "../../core/api/planets/typing";
import { Breadcrumb, CloseButton, Container } from "react-bootstrap";

export const PlanetPage: FC<IPlanetPageProps> = () => {
  const { id } = useParams();

  const [planetData, setPlanetData] = useState<IPlanet | null>(null);

  const location = useLocation();
  console.log(`${location.state?.from ? "#" + location.state?.from : ""}`);

  useEffect(() => {
    if (id) {
      getPlanetById(id).then((data) => {
        setPlanetData(data.planet);
      });
    }
  }, [id]);

  if (!planetData || !planetData.Name) {
    return (
      <>
        <div className="nav_planet">
          <Link
            to={`/${location.state?.from ? "#" + location.state?.from : ""}`}
          >
            <CloseButton variant="white" />
          </Link>
          <Breadcrumb>
            <Breadcrumb.Item
              href={`/${
                location.state?.from ? "#" + location.state?.from : ""
              }`}
              className="text-white"
            >
              Главная
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="text-white">
              {planetData?.Name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Container className="d-flex mt-5 h-100 justify-content-center">
          <h1>Загрузка</h1>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className="div planet_page">
        <div className="nav_planet">
          <Link
            to={`/${location.state?.from ? "#" + location.state?.from : ""}`}
          >
            <CloseButton variant="white" />
          </Link>
          <Breadcrumb>
            <Breadcrumb.Item
              href={`/${
                location.state?.from ? "#" + location.state?.from : ""
              }`}
              className="text-white"
            >
              Главная
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="text-white">
              {planetData?.Name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="content">
          <div className="blog">
            <div className="decoration_block"></div>
            <div className="about">
              <h1>{planetData?.Name}</h1>
              <p>{planetData?.Info}</p>
              <div className="info">
                <h3>Открытие:</h3>
                <p>{planetData?.Discovered}</p>
              </div>
              <div className="info">
                <h3>Масса:</h3>
                <p>{planetData?.Mass}</p>
              </div>
              <div className="info">
                <h3>Расстояние до земли:</h3>
                <p>{planetData?.Distance}</p>
              </div>
            </div>
          </div>
          <div className="image">
            <img src={planetData?.ImageName} alt={planetData?.Name} />
          </div>
        </div>
      </Container>
    </>
  );
};
