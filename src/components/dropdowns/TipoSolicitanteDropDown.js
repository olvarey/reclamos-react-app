import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";

function TipoSolicitanteDropDown() {
  const [tiposSolicitante, setTiposSolicitantes] = useState([]);
  const [selectedTipoSolicitante, setSelectedTipoSolicitante] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8181/api-asegurados/v1/tipos-solicitante")
      .then((res) => {
        if (res.data) {
          setTiposSolicitantes(res.data);
        } else {
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <Dropdown
      value={selectedTipoSolicitante}
      options={tiposSolicitante}
      optionLabel="name"
      placeholder="Select an option"
    />
  );
}

export default TipoSolicitanteDropDown;
