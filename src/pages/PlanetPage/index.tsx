import { FC, useEffect, useState } from "react";
import { IPlanetPageProps } from "./typing";
import { useParams } from "react-router-dom";
import { getPlanetById } from "../../core/api/planets";
import { IPlanet } from "../../core/api/planets/typing";

export const PlanetPage: FC<IPlanetPageProps> = () => {
  const { id } = useParams();

  const [planetData, setPlanetData] = useState<IPlanet | null>(null);

  useEffect(() => {
    if (id) {
      getPlanetById(id).then((data) => {
        setPlanetData(data.planet)
      });
    }
  }, []);

  return <div>{planetData?.Info}</div>;
};
