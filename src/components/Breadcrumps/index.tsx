import "./Breadcrumps.css";
import React, { FC } from "react";
import { IBreadcrumps } from "./typing.tsx";
import { Link } from "react-router-dom";
import { CloseButton } from "react-bootstrap";

export const Breadcrumps: FC<IBreadcrumps> = (props) => {
  const {
    location,
    crumbs,
    isCrumbs = true,
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

  const path = location.state?.fromPage ? location.state?.fromPage : "/";

  return (
    <div className={navStyle}>
      {isCloseButton && (
        <Link to={path} state={{ planetId: location.state?.from }}>
          <CloseButton variant="white" />
        </Link>
      )}
      {isCrumbs && (
        <div className="breadcrumbs">
          <ul>
            <li>
              <Link to={"/"}>Главная</Link>
            </li>
            {!!crumbs.length &&
              crumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <div>/</div>
                  {index === crumbs.length - 1 ? (
                    <li className="current">
                      <p>{crumb.label}</p>
                    </li>
                  ) : (
                    <li>
                      <Link to={crumb.path}>{crumb.label}</Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
