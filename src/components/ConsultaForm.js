import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import axios from "axios";

const ConsultaForm = () => {
  const [formData, setFormData] = useState({});
  const [showDlgFound, setShowDlgFound] = useState(false);
  const [showDlgNotFound, setShowDlgNotFound] = useState(false);
  const [solicitudes, setSolicitudes] = useState({});

  const formik = useFormik({
    initialValues: {
      noSolicitud: "",
      duiSolicitante: "",
      fechaExpiracionDUI: null,
    },
    validate: (data) => {
      let errors = {};

      if (!data.noSolicitud) {
        errors.noSolicitud = "El número de solicitud es requerido.";
      }

      if (!data.duiSolicitante) {
        errors.duiSolicitante = "DUI del solicitante es requerido.";
      }

      if (!data.fechaExpiracionDUI) {
        errors.fechaExpiracionDUI =
          "Fecha expiración DUI del solicitante es requerido.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      axios
        .get("http://localhost:8181/api-asegurados/v1/solicitud", {
          params: {
            noSolicitud: data.noSolicitud,
            duiSolicitante: data.duiSolicitante,
            fechaExpiracionDUI: data.fechaExpiracionDUI,
          },
        })
        .then((res) => {
          if (res.data) {
            setSolicitudes(res.data);
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
          label="Aceptar"
          icon="pi pi-check"
          onClick={() => setShowDlgFound(false)}
          autoFocus
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
          onClick={() => {
            setShowDlgNotFound(false);
          }}
          autoFocus
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <Card
        title="Información de la solicitud"
        style={{ width: "30rem", marginBottom: "2em", marginTop: "10px" }}
      >
        <div className="p-fluid">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <label
                htmlFor="noSolicitud"
                className={classNames({
                  "p-error": isFormFieldValid("noSolicitud"),
                })}
              >
                Número de solicitud:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-folder" />
                <InputText
                  id="noSolicitud"
                  name="noSolicitud"
                  type="text"
                  value={formik.values.noSolicitud}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("noSolicitud"),
                  })}
                />
              </span>
              {getFormErrorMessage("noSolicitud")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="duiSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("duiSolicitante"),
                })}
              >
                DUI del solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-id-card" />
                <InputMask
                  id="duiSolicitante"
                  name="duiSolicitante"
                  mask="999999999"
                  value={formik.values.duiSolicitante}
                  onChange={formik.handleChange}
                  placeholder="999999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("duiSolicitante"),
                  })}
                ></InputMask>
              </span>
              {getFormErrorMessage("duiSolicitante")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="fechaExpiracionDUI"
                className={classNames({
                  "p-error": isFormFieldValid("fechaExpiracionDUI"),
                })}
              >
                Fecha expiración DUI del solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-calendar" />
                <Calendar
                  id="fechaExpiracionDUI"
                  name="fechaExpiracionDUI"
                  value={formik.values.fechaExpiracionDUI}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("fechaExpiracionDUI"),
                  })}
                />
              </span>
              {getFormErrorMessage("fechaExpiracionDUI")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <Button label="Consultar" icon="pi pi-check" type="submit" />
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
          Gracias por usar nuestro servicio de consulta de trámites en línea. Se
          ha encontrado información válida de la solicitud, a continuación se
          muestra el detalle de reclamo de seguros.
        </p>

        {
          <div>
            <div className="card">
              <DataTable value={solicitudes} responsiveLayout="scroll">
                <Column
                  field="idSolicitudReclamoPK.noSolicitud"
                  header="Número solicitud"
                ></Column>
                <Column
                  field="idSolicitudReclamoPK.tipoSeguro"
                  header="Tipo seguro"
                ></Column>
                <Column
                  field="calidadSolicitante"
                  header="Tipo solicitante"
                ></Column>
                <Column
                  field="estadoSolicitud"
                  header="Estado solicitud"
                ></Column>
              </DataTable>
            </div>
          </div>
        }
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
          formulario e intentar de nuevo.
        </p>
      </Dialog>
    </React.Fragment>
  );
};

export default ConsultaForm;
