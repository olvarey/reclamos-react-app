import React from "react";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <React.Fragment>
      <Nav variant="tabs" defaultActiveKey="/" style={{ marginTop: "10px" }}>
        <Nav.Item>
          <Nav.Link href="/">Iniciar Trámites</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/consulta">Consulta de procesos</Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" href="/">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </React.Fragment>
  );
};

export default NavBar;
