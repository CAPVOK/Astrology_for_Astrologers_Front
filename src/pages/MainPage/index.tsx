import "./MainPage.css";
import { FC } from "react";
import { IMainPageProps } from "./typing";
import { Navbar, PlanetCard } from "../../components";
import { IPlanetCardProps } from "../../components/PlanetCard/typing";
import { useMainPage } from "./useMainPage";
import { Button, Container } from "react-bootstrap";

export const MainPage: FC<IMainPageProps> = () => {
  const {
    planets,
    handleSearchPlanetsClick,
    handleSearchNameChange,
    handleGetAllPlanetsClick,
  } = useMainPage();

  return (
    <Container className="div">
      <Navbar />
      <Container className="div intro">
        <h1>Астрономия для Астрологов</h1>
        <Container className="div text">
          <p>
            Интересуетесь астрономией и астрологией? Наше приложение
            предоставляет увлекательную информацию о различных планетах в
            Солнечной системе и их влиянии на зодиакальные знаки.
          </p>
          <p>
            У нас есть подробная информация о разных планетах, их
            характеристиках, истории открытий и важных фактах. От Меркурия,
            самой близкой к Солнцу планеты, до далекого Нептуна, вы узнаете
            много интересного.
          </p>
          <p>
            Узнайте, как движение планет влияет на характеристики зодиакальных
            знаков. Мы расскажем вам о том, как планеты могут влиять на ваш
            характер, судьбу и даже на вашу личную астрологическую карту.
          </p>
        </Container>
      </Container>

      <h2 className="choose_planet" id="choose_planet">
        Выберите <span className="colored">планету</span> ниже, чтобы узнать
        больше о ней:
      </h2>

      <Container
        fluid
        className="d-flex p-3 flex-sm-row flex-column align-items-center justify-content-center gap-3"
      >
        <Button
          onClick={handleGetAllPlanetsClick}
          className="bg-transparent button"
        >
          Все планеты
        </Button>
        <input
          type="text"
          className="input"
          onChange={handleSearchNameChange}
          placeholder="Введите название"
        />
        <Button
          onClick={handleSearchPlanetsClick}
          className="bg-transparent button"
        >
          Искать
        </Button>
      </Container>

      {planets && !!planets.length ? (
        <Container className="div planets" id="planets">
          {planets.map((planet, index) => {
            const props: IPlanetCardProps = {
              id: planet.Id,
              name: planet.Name,
              color1: planet.Color1,
              color2: planet.Color2,
              imageName: planet.ImageName,
            };
            return <PlanetCard key={index} {...props} />;
          })}
        </Container>
      ) : (
        <Container className="d-flex justify-content-center mt-4 mb-5">
          <h2>Ничего не найдено</h2>
        </Container>
      )}
    </Container>
  );
};
