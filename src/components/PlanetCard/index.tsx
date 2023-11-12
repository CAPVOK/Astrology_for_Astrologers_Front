import "./PlanetCatd.css";
import { FC } from "react";
import { IPlanetCardProps } from "./typing";
import { Link } from "react-router-dom";
import { Planet } from "../Planet";

export const PlanetCard: FC<IPlanetCardProps> = (props) => {
  const { id, color1, color2, name } = props;

  return (
    <Link
      to={"/planet/" + id}
      id={name}
      className="card"
      state={{ from: name }}
    >
      <Planet color1={color1} color2={color2} />
      <div className="content">
        <h3>{name}</h3>
      </div>
    </Link>
  );
};
