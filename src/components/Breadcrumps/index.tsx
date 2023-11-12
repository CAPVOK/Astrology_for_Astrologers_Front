import "./Breadcrumps.css";
import { FC } from "react";
import { IBreadcrumps } from "./typing.tsx";
import { Link } from "react-router-dom";
import { Breadcrumb, CloseButton } from "react-bootstrap";

export const Breadcrumps: FC<IBreadcrumps> = (props) => {
  const { location, name, isCloseButton = true, isFixed = true } = props;

  return (
    <div className={isFixed ? "nav_planet nav_planet_fixed" : "nav_planet"}>
      {isCloseButton && (
        <Link to={"/"} state={{ planetId: location.state?.from }}>
          <CloseButton variant="white" />
        </Link>
      )}
      <Breadcrumb
        listProps={{
          className: "m-0 d-flex align-items-center breadcrump_ol",
        }}
      >
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: "/" }}
          className="breadcrump"
        >
          Главная
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="breadcrump active">
          {name}
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};
