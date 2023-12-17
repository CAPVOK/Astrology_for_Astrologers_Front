import { FC } from "react";
/* import { useNavigate } from "react-router-dom"; */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarComp from "react-bootstrap/Navbar";
import { PlanetIcon } from "../icons";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "../../core/store";
import { selectUser } from "../../core/store/slices/selectors";

export const Navbar: FC = () => {
  const { constellation } = useSelector(selectUser);

  return (
    <>
      <NavbarComp
        expand="lg"
        data-bs-theme="dark"
        className="position-absolute w-100"
      >
        <Container>
          <NavbarComp.Brand>
            <Link to={"/"}>
              <PlanetIcon fill="white" height="32" width="40" />
            </Link>
          </NavbarComp.Brand>
          <NavbarComp.Toggle
            aria-controls="basic-navbar-nav"
            className="outline-none"
          />
          <NavbarComp.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-4 gap-sm-3">
              <NavLink
                to="/"
                className="text-white"
                style={{ display: "flex", alignItems: "center" }}
              >
                Главная
              </NavLink>
              <NavLink
                to="/about"
                className="text-white"
                style={{ display: "flex", alignItems: "center" }}
              >
                О нас
              </NavLink>
              {constellation ? (
                <NavLink
                  to="/constellation"
                  className="text-white"
                  state={{ from: location.pathname }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Созвездие
                </NavLink>
              ) : (
                <p
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    margin: "0",
                  }}
                  className="text-secondary"
                >
                  Созвездие
                </p>
              )}
            </Nav>
          </NavbarComp.Collapse>
        </Container>
      </NavbarComp>
    </>
  );
};
