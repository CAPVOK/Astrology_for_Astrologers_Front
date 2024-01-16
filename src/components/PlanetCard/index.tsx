import "./PlanetCatd.css";
import { FC } from "react";
import { IPlanetCardProps } from "./typing";
import { Link } from "react-router-dom";
import { Planet } from "../Planet";
import { LoaderSmall } from "../LoaderSmall";

export const PlanetCard: FC<IPlanetCardProps> = (props) => {
  const {
    id,
    color1,
    color2,
    name,
    isAuth,
    isDeleteMode,
    handler,
    fromPage,
    loadingId,
  } = props;

  if (isAuth) {
    return (
      <div id={name} className="card">
        <Planet color1={color1} color2={color2} />
        <div className="content">
          <h3>{name}</h3>
          <Link to={"/planet/" + id} state={{ from: name, fromPage: fromPage }}>
            Подробнее
          </Link>
          {/*  {loadingId ? (
            loadingId !== id ? (
              <button
                className={isDeleteMode ? "add_button" : "add_button delete"}
                onClick={handler}
              >
                {!isDeleteMode ? "Добавить" : "Удалить"}
              </button>
            ) : (
              <LoaderSmall />
            )
          ) : (
            <button
              className={isDeleteMode ? "add_button" : "add_button delete"}
              onClick={handler}
            >
              {!isDeleteMode ? "Добавить" : "Удалить"}
            </button>
          )} */}
          {loadingId && (
            <>
              {isDeleteMode &&
                (String(loadingId) !== id ? (
                  <button className="add_button delete" onClick={handler}>
                    Удалить
                  </button>
                ) : (
                  <LoaderSmall />
                ))}
              {!isDeleteMode &&
                (String(loadingId) !== id ? (
                  <button className="add_button" onClick={handler}>
                    Добавить
                  </button>
                ) : (
                  <LoaderSmall />
                ))}
            </>
          )}
          {!String(loadingId) && (
            <button
              className="add_button"
              onClick={handler}
            >
              {!isDeleteMode ? "Добавить" : "Удалить"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={"/planet/" + id}
      id={name}
      className="card"
      state={{ from: name, fromPage: fromPage }}
    >
      <Planet color1={color1} color2={color2} />
      <div className="content">
        <h3>{name}</h3>
      </div>
    </Link>
  );
};
