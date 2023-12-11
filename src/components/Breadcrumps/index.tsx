import "./Breadcrumps.css";
import { FC } from "react";
import { IBreadcrumps } from "./typing.tsx";
import { Link } from "react-router-dom";
import { CloseButton } from "react-bootstrap";

export const Breadcrumps: FC<IBreadcrumps> = (props) => {
  const {
    location,
    name,
    isCloseButton = true,
    isFixed = true,
    isAbsolute = false,
    isBlur = false,
  } = props;

  const displayStyle = isAbsolute
    ? "nav_planet_absolute"
    : isFixed
    ? "nav_planet_fixed"
    : "";

  const blurStyle = isBlur ? "nav_planet_blur" : "";

  const navStyle = "nav_planet " + displayStyle + " " + blurStyle;

  return (
    <div className={navStyle}>
      {isCloseButton && (
        <Link to={"/"} state={{ planetId: location.state?.from }}>
          <CloseButton variant="white" />
        </Link>
      )}
      <div className="breadcrumbs">
        <ul>
          <li><Link to={"/"}>Главная</Link></li>
          <div>/</div>
          <li>{name}</li>
        </ul>
      </div>
    </div>
  );
};
