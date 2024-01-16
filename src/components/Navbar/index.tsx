import { FC } from "react";
/* import { useNavigate } from "react-router-dom"; */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarComp from "react-bootstrap/Navbar";
import { PlanetIcon } from "../icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../core/store";
import { selectApp, selectUser } from "../../core/store/slices/selectors";
import { logout } from "../../core/api/auth";
import { Button, Form } from "react-bootstrap";
import { saveisAdmin } from "../../core/store/slices/appSlice";

export const Navbar: FC = () => {
  const { constellationId, isAuth, userName, role } = useSelector(selectUser);
  const { isAdmin } = useSelector(selectApp);

  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      <NavbarComp
        expand="md"
        data-bs-theme="dark"
        className="position-absolute w-100"
      >
        <Container>
          <NavbarComp.Brand>
            <Link to={"/"}>
              <PlanetIcon fill="white" height="32" width="40" />
            </Link>
          </NavbarComp.Brand>
          {isAuth ? (
            <div style={{ display: "flex", gap: "10xp" }}>
              <NavbarComp.Brand style={{ color: "#FB2576" }}>
                {userName}
              </NavbarComp.Brand>
              <Button
                variant="danger"
                onClick={logout}
                style={{ marginRight: "10px" }}
              >
                Выйти
              </Button>
              {role === "модератор" && (
                <Form.Check
                  style={{
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                    gap: "5px"
                  }}
                  type="switch"
                  id="custom-switch"
                  label="Модератор"
                  checked={isAdmin}
                  onChange={() => dispatch(saveisAdmin(!isAdmin))}
                />
              )}
            </div>
          ) : (
            <Link to="/auth" style={{ color: "#FB2576", marginRight: "10px" }}>
              Войти
            </Link>
          )}
          <NavbarComp.Toggle
            aria-controls="basic-navbar-nav"
            className="outline-none"
          />
          <NavbarComp.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-4 gap-sm-3">
              {/*  <NavLink
                to="/"
                className="text-white"
                style={{ display: "flex", alignItems: "center" }}
              >
                Главная
              </NavLink> */}
              {isAuth && (
                <NavLink
                  to="/constellations"
                  className="text-white"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  История
                </NavLink>
              )}
              {isAuth &&
                location.pathname === "/" &&
                (constellationId !== 0 ? (
                  <NavLink
                    to={`/constellations/${constellationId}`}
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
                ))}
            </Nav>
          </NavbarComp.Collapse>
        </Container>
      </NavbarComp>
    </>
  );
};
