import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import axios from "axios";

const AseguradosForm = () => {
  const [formData, setFormData] = useState({});
  const [showDlgFound, setShowDlgFound] = useState(false);
  const [showDlgNotFound, setShowDlgNotFound] = useState(false);
  const [asegurado, setAsegurado] = useState({});

  const formik = useFormik({
    initialValues: {
      nombreCompleto: "",
      dui: "",
      codigoAsegurado: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.nombreCompleto) {
        errors.nombreCompleto = "Nombre completo es requerido.";
      }

      if (!data.dui) {
        errors.dui = "DUI es requerido.";
      }

      if (!data.codigoAsegurado) {
        errors.codigoAsegurado = "Código de asegurado es requerido.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      axios
        .get("http://localhost:8181/api-asegurados/v1/maestro", {
          params: {
            nombre: data.nombreCompleto.trim().toUpperCase(),
            dui: data.dui,
            codigo: data.codigoAsegurado,
          },
        })
        .then((res) => {
          if (res.data) {
            setAsegurado(res.data);
            setShowDlgFound(true);
          } else {
            setShowDlgNotFound(true);
          }
        })
        .catch((err) => {});
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const renderFooterFound = () => {
    return (
      <div>
        <Button
          label="SI"
          icon="pi pi-check"
          onClick={() => setShowDlgFound(false)}
          autoFocus
        />
        <Button
          label="NO"
          icon="pi pi-times"
          onClick={() => setShowDlgFound(false)}
          className="p-button-text"
        />
      </div>
    );
  };

  const renderFooterNotFound = () => {
    return (
      <div>
        <Button
          label="Cerrar"
          icon="pi pi-check"
          onClick={() => setShowDlgNotFound(false)}
          autoFocus
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <Card
        title="Información del asegurado"
        style={{ width: "30rem", marginBottom: "2em", marginTop: "10px" }}
      >
        <div className="p-fluid">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <label
                htmlFor="nombreCompleto"
                className={classNames({
                  "p-error": isFormFieldValid("nombreCompleto"),
                })}
              >
                Nombre completo del asegurado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-user" />
                <InputText
                  id="nombreCompleto"
                  name="nombreCompleto"
                  type="text"
                  value={formik.values.nombreCompleto}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("nombreCompleto"),
                  })}
                />
              </span>
              {getFormErrorMessage("nombreCompleto")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="dui"
                className={classNames({
                  "p-error": isFormFieldValid("dui"),
                })}
              >
                Documento Único de Identidad (DUI):
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-id-card" />
                <InputMask
                  id="dui"
                  name="dui"
                  mask="999999999"
                  value={formik.values.dui}
                  onChange={formik.handleChange}
                  placeholder="999999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("dui"),
                  })}
                ></InputMask>
              </span>
              {getFormErrorMessage("dui")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="codigoAsegurado"
                className={classNames({
                  "p-error": isFormFieldValid("codigoAsegurado"),
                })}
              >
                Código asegurado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="codigoAsegurado"
                  name="codigoAsegurado"
                  value={formik.values.codigoAsegurado}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("codigoAsegurado"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("codigoAsegurado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <Button label="Buscar" icon="pi pi-check" type="submit" />
            </div>
          </form>
        </div>
      </Card>

      <Dialog
        header="Detalle de búsqueda"
        visible={showDlgFound}
        onHide={() => setShowDlgFound(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={renderFooterFound}
      >
        <div className="flex align-items-center flex-column">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "4rem", color: "var(--green-500)" }}
          ></i>
        </div>
        <p style={{ textAlign: "justify" }}>
          Gracias por consultar nuestro servicio de consulta de asegurados en
          línea. Se ha encontrado información válida del asegurado, por tanto
          puede proseguir con su tramite de reclamo de seguros. Haga clic en el
          botón <strong>SI</strong> para continuar.
        </p>
        <p>
          Nombre completo: <strong>{asegurado.nombreCompleto}</strong>
        </p>
        <p>
          Lugar de trabajo: <strong>{asegurado.lugarTrabajo}</strong>
        </p>
        <p>
          Condición:{" "}
          <strong>{asegurado.condicion?.descripcionCondicion}</strong>
        </p>
      </Dialog>
      <Dialog
        header="Detalle de búsqueda"
        visible={showDlgNotFound}
        onHide={() => setShowDlgNotFound(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={renderFooterNotFound}
      >
        <div className="flex align-items-center flex-column">
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "4rem", color: "red" }}
          ></i>
        </div>
        <p style={{ textAlign: "justify" }}>
          Lo sentimos, no existe registro que coincida con los datos
          proporcionados, favor verificar la información proporcionada en el
          formulario e intentar de nuevo. Haga clic en el botón{" "}
          <strong>SI</strong> para continuar.
        </p>
      </Dialog>
    </React.Fragment>
  );
};

export default AseguradosForm;
