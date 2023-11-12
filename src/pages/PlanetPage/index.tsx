import "./PlanetPage.css";
import { FC, useEffect, useState } from "react";
import { IPlanetPageProps } from "./typing";
import { useLocation, useParams } from "react-router-dom";
import { getPlanetById } from "../../core/api/planets";
import { IPlanet } from "../../core/api/planets/typing";
import { Container } from "react-bootstrap";
import { planets as PLANETS } from "../../core/moc/planets";
import { Breadcrumps } from "../../components";

export const PlanetPage: FC<IPlanetPageProps> = () => {
  const { id } = useParams();

  const [planetData, setPlanetData] = useState<IPlanet | null>(null);

  const location = useLocation();

  useEffect(() => {
    if (id) {
      getPlanetById(id)
        .then((data) => {
          setPlanetData(data.planet);
        })
        .catch(() => {
          const planet = PLANETS.planets.find(
            (planet) => planet.Id === Number(id)
          );
          setPlanetData(planet || null);
        });
    }
  }, [id]);

  if (!planetData || !planetData.Name) {
    return (
      <>
        <Breadcrumps location={location} />
        <Container className="d-flex mt-5 h-100 justify-content-center">
          <h1>Загрузка</h1>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className="div planet_page">
        <Breadcrumps
          location={location}
          name={planetData?.Name}
          isAbsolute={true}
        />
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
            {planetData.ImageName && planetData.ImageName !== "unknown.png" ? (
              <img src={planetData.ImageName} alt={planetData.Name}></img>
            ) : (
              <img src={"/images/unknown.png"} alt={planetData.Name}></img>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
