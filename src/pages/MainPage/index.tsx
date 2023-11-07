import { FC } from "react";
import { IMainPageProps } from "./typing";
import { PlanetCard } from "../../components";
import { IPlanetCardProps } from "../../components/PlanetCard/typing";

export const MainPage: FC<IMainPageProps> = () => {
  const planets: IPlanetCardProps[] = [
    {
      planetId: "1",
      name: "Mars",
    },
    {
      planetId: "2",
      name: "Earth",
    },
    {
      planetId: "3",
      name: "Uranus",
    },
  ];

  return (
    <div>
      MainPage
      {planets.length &&
        planets.map((planet, index) => <PlanetCard key={index} {...planet} />)}
    </div>
  );
};
