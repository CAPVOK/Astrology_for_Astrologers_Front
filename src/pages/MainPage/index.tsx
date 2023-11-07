import { FC, useEffect, useState } from "react";
import { IMainPageProps } from "./typing";
import { PlanetCard } from "../../components";
import { getPlanets } from "../../core/api/planets";
import { IPlanetCardProps } from "../../components/PlanetCard/typing";
import { IPlanet } from "../../core/api/planets/typing";

export const MainPage: FC<IMainPageProps> = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);

  useEffect(() => {
    getPlanets().then((data) => {
      setPlanets(data.planets);
    });
  }, []);

  return (
    <div>
      {planets.length &&
        planets.map((planet, index) => {
          const props: IPlanetCardProps = {
            planetId: planet.Id,
            name: planet.Name,
          };
          return <PlanetCard key={index} {...props} />;
        })}
    </div>
  );
};
