import "./PlanetPage.css";
import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getPlanetById } from "../../core/api/planets";
import { IPlanet } from "../../core/api/planets/typing";
import { Breadcrumps } from "../../components";
import unknownIage from "/images/unknown.png";

export const PlanetPage: FC = () => {
  const { id } = useParams();

  const [planetData, setPlanetData] = useState<IPlanet | null>(null);

  const location = useLocation();
  const isCrumbs =
    location.state?.fromPage &&
    location.state?.fromPage.includes("/constellations");
  console.log(location, !isCrumbs);

  useEffect(() => {
    if (id) {
      getPlanetById(id).then((data) => {
        if (data?.planet) {
          setPlanetData(data.planet);
        }
      });
    }
  }, [id]);

  if (!planetData || !planetData.name) {
    return (
      <>
        <Breadcrumps location={location} isCrumbs={false} crumbs={[]} />
        <Container className="planet_page-loader">
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
          crumbs={[{ label: planetData?.name || "", path: "" }]}
          isAbsolute={true}
          isCrumbs={!isCrumbs}
        />
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
      </Container>
    </>
  );
};
