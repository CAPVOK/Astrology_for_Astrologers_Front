import "./PlanetCatd.css";
import { FC } from "react";
import { IPlanetCardProps } from "./typing";
import { Link } from "react-router-dom";
import { Planet } from "../Planet";

export const PlanetCard: FC<IPlanetCardProps> = (props) => {
  const { id, color1, color2, name, isAuth } = props;

  const isAddActive = true;

  const handleCardClick = () => {};

  if (isAuth) {
    return (
      <div id={name} className="card">
        <Planet color1={color1} color2={color2} />
        <div className="content">
          <h3>{name}</h3>
          <Link to={"/planet/" + id} state={{ from: name }}>
            Подробнее
          </Link>
          <button
            className={isAddActive ? "add_button active" : "add_button"}
            onClick={handleCardClick}
          >
            {isAddActive ? "Добавить" : "В созвездие"}
          </button>
        </div>
      </div>
    );
  }

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
