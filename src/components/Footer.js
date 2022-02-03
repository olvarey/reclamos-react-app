import React from "react";
import { Divider } from "primereact/divider";

function Footer() {
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <Divider />
      <footer className="py-3 my-4">
        <p className="text-center text-muted">
          &copy; 2022 Caja Mutual de los Empleados del Ministerio de Educación
        </p>
      </footer>
    </div>
  );
}

export default Footer;
