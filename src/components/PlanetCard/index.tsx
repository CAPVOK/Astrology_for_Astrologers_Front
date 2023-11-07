import { FC } from "react";
import { IPlanetCardProps } from "./typing";
import { Link } from "react-router-dom";

export const PlanetCard: FC<IPlanetCardProps> = (props) => {
  const { planetId, name } = props;

  return (
    <div>
      <Link to={"/planet/" + planetId}>{name}</Link>
    </div>
  );
};
