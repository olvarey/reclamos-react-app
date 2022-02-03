import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <React.Fragment>
      <Nav variant="pills" defaultActiveKey="/" style={{ marginTop: "10px" }}>
        <Nav.Item>
          <NavLink to="/" className="nav-link">Iniciar Trámites</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/consulta" className="nav-link">Consulta de trámites</NavLink>
        </Nav.Item>
      </Nav>
    </React.Fragment>
  );
};

export default NavBar;
