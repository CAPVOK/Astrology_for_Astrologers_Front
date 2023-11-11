import { FC } from "react";
/* import { useNavigate } from "react-router-dom"; */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarComp from "react-bootstrap/Navbar";
import { PlanetIcon } from "../icons";

export const Navbar: FC = () => {
  return (
    <>
      <NavbarComp
        expand="lg"
        data-bs-theme="dark"
        className="position-absolute w-100"
      >
        <Container>
          <NavbarComp.Brand href="/">
            <PlanetIcon fill="white" height="32" width="40" />
          </NavbarComp.Brand>
          <NavbarComp.Toggle aria-controls="basic-navbar-nav" className="outline-none"/>
          <NavbarComp.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="text-white">
                Главная
              </Nav.Link>
              <Nav.Link disabled className="text-secondary" href="/basket">
                Созвездие
              </Nav.Link>
            </Nav>
          </NavbarComp.Collapse>
        </Container>
      </NavbarComp>
    </>
  );
};
