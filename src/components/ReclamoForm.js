import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import axios from "axios";

const ReclamoForm = () => {
  const [formData, setFormData] = useState({});
  const [showDlgFound, setShowDlgFound] = useState(false);
  const [showDlgNotFound, setShowDlgNotFound] = useState(false);
  const [reclamo, setReclamo] = useState({});

  const formik = useFormik({
    initialValues: {
      //SOLICITANTE
      nombreCompletoSolicitante: "",
      duiSolicitante: "",
      fechaExpDuiSolicitante: "",
      nitSolicitante: "",
      tipoSolicitante: "",
      direccionSolicitante: "",
      telefonoSolicitante: "",
      celularSolicitante: "",
      emailSolicitante: "",
      observacion: "",
      //REPRESENTADO
      nombreCompletoRepresentado: "",
      duiRepresentado: "",
      fechaExpDuiRepresentado: "",
      nitRepresentado: "",
      direccionRepresentado: "",
      telefonoRepresentado: "",
      celularRepresentado: "",
      emailRepresentado: "",
      tipoSeguro: "",
    },
    validate: (data) => {
      let errors = {};

      //SOLICITANTE
      if (!data.nombreCompletoSolicitante) {
        errors.nombreCompletoSolicitante =
          "Nombre completo del solicitante es requerido.";
      }

      if (!data.duiSolicitante) {
        errors.duiSolicitante = "DUI del solicitante es requerido.";
      }

      if (!data.fechaExpDuiSolicitante) {
        errors.fechaExpDuiSolicitante =
          "Fecha expiración DUI del solicitante es requerido.";
      }

      if (!data.nitSolicitante) {
        errors.nitSolicitante = "NIT del solicitante es requerido.";
      }

      if (!data.tipoSolicitante) {
        errors.tipoSolicitante = "Tipo de solicitante es requerido.";
      }

      if (!data.direccionSolicitante) {
        errors.direccionSolicitante = "Direción del solicitante es requerido.";
      }

      if (!data.telefonoSolicitante) {
        errors.telefonoSolicitante = "Teléfono del solicitante es requerido.";
      }

      if (!data.celularSolicitante) {
        errors.celularSolicitante = "Celular del solicitante es requerido.";
      }

      if (!data.emailSolicitante) {
        errors.emailSolicitante =
          "Correo electrónico del solicitante es requerido.";
      }

      //REPRESENTADO
      if (!data.nombreCompletoRepresentado) {
        errors.nombreCompletoRepresentado =
          "Nombre completo de representado es requerido.";
      }

      if (!data.duiRepresentado) {
        errors.duiRepresentado = "DUI del representado es requerido.";
      }

      if (!data.fechaExpDuiRepresentado) {
        errors.fechaExpDuiRepresentado =
          "Fecha expiración DUI del representado es requerido.";
      }

      if (!data.nitRepresentado) {
        errors.nitRepresentado = "NIT del representado es requerido.";
      }

      if (!data.direccionRepresentado) {
        errors.direccionRepresentado =
          "Direción del representado es requerido.";
      }

      if (!data.telefonoRepresentado) {
        errors.telefonoRepresentado = "Teléfono del representado es requerido.";
      }

      if (!data.celularRepresentado) {
        errors.celularRepresentado = "Celular del representado es requerido.";
      }

      if (!data.emailRepresentado) {
        errors.emailRepresentado =
          "Correo electrónico del representado es requerido.";
      }

      if (!data.tipoSeguro) {
        errors.tipoSeguro = "Tipo de seguro es requerido.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      axios
        .get("http://localhost:8181/maestro", {
          params: {
            nombre: data.nombreCompleto.trim().toUpperCase(),
            dui: data.dui,
            codigo: data.codigoAsegurado,
          },
        })
        .then((res) => {
          if (res.data) {
            setReclamo(res.data);
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
          label="SI"
          icon="pi pi-check"
          onClick={() => setShowDlgNotFound(false)}
          autoFocus
        />
        <Button
          label="NO"
          icon="pi pi-times"
          onClick={() => setShowDlgNotFound(false)}
          className="p-button-text"
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <Card
        title="Información del reclamo"
        style={{ width: "auto", marginBottom: "2em", marginTop: "10px" }}
      >
        <div className="p-fluid">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <label
                htmlFor="nombreCompletoSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("nombreCompletoSolicitante"),
                })}
              >
                Nombre completo del solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-user" />
                <InputText
                  id="nombreCompletoSolicitante"
                  name="nombreCompletoSolicitante"
                  type="text"
                  value={formik.values.nombreCompletoSolicitante}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("nombreCompletoSolicitante"),
                  })}
                />
              </span>
              {getFormErrorMessage("nombreCompletoSolicitante")}
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
                htmlFor="fechaExpDuiSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("fechaExpDuiSolicitante"),
                })}
              >
                Fecha expiración DUI del solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="fechaExpDuiSolicitante"
                  name="fechaExpDuiSolicitante"
                  value={formik.values.fechaExpDuiSolicitante}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("fechaExpDuiSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("fechaExpDuiSolicitante")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="nitSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("nitSolicitante"),
                })}
              >
                NIT del solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="nitSolicitante"
                  name="nitSolicitante"
                  value={formik.values.nitSolicitante}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("nitSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("nitSolicitante")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="tipoSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("tipoSolicitante"),
                })}
              >
                Tipo de solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="tipoSolicitante"
                  name="tipoSolicitante"
                  value={formik.values.tipoSolicitante}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("tipoSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("tipoSolicitante")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="direccionSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("direccionSolicitante"),
                })}
              >
                Dirección de solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="direccionSolicitante"
                  name="direccionSolicitante"
                  value={formik.values.direccionSolicitante}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("direccionSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("direccionSolicitante")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="telefonoSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("telefonoSolicitante"),
                })}
              >
                Teléfono de solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="telefonoSolicitante"
                  name="telefonoSolicitante"
                  value={formik.values.telefonoSolicitante}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("telefonoSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("telefonoSolicitante")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="celularSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("celularSolicitante"),
                })}
              >
                Celular de solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="celularSolicitante"
                  name="celularSolicitante"
                  value={formik.values.celularSolicitante}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("celularSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("celularSolicitante")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="emailSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("emailSolicitante"),
                })}
              >
                Correo electrónico de solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="emailSolicitante"
                  name="emailSolicitante"
                  value={formik.values.emailSolicitante}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("emailSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("emailSolicitante")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="observacion"
                className={classNames({
                  "p-error": isFormFieldValid("observacion"),
                })}
              >
                Observación:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="observacion"
                  name="observacion"
                  value={formik.values.observacion}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("observacion"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("observacion")}
            </div>
            <div className="p-field">
              <label
                htmlFor="nombreCompletoRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid("nombreCompletoRepresentado"),
                })}
              >
                Nombre completo del representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-user" />
                <InputText
                  id="nombreCompletoRepresentado"
                  name="nombreCompletoRepresentado"
                  type="text"
                  value={formik.values.nombreCompletoRepresentado}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("nombreCompletoRepresentado"),
                  })}
                />
              </span>
              {getFormErrorMessage("nombreCompletoRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="duiRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid("duiRepresentado"),
                })}
              >
                DUI del representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-id-card" />
                <InputMask
                  id="duiRepresentado"
                  name="duiRepresentado"
                  mask="999999999"
                  value={formik.values.duiRepresentado}
                  onChange={formik.handleChange}
                  placeholder="999999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("duiRepresentado"),
                  })}
                ></InputMask>
              </span>
              {getFormErrorMessage("duiRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="fechaExpDuiRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid("fechaExpDuiRepresentado"),
                })}
              >
                Fecha expiración DUI del representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="fechaExpDuiRepresentado"
                  name="fechaExpDuiRepresentado"
                  value={formik.values.fechaExpDuiRepresentado}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("fechaExpDuiRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("fechaExpDuiRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="nitRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid("nitRepresentado"),
                })}
              >
                NIT del representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="nitRepresentado"
                  name="nitRepresentado"
                  value={formik.values.nitRepresentado}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("nitRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("nitRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="direccionRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid("direccionRepresentado"),
                })}
              >
                Dirección de representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="direccionRepresentado"
                  name="direccionRepresentado"
                  value={formik.values.direccionRepresentado}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("direccionRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("direccionRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="telefonoRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid("telefonoRepresentado"),
                })}
              >
                Teléfono de representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="telefonoRepresentado"
                  name="telefonoRepresentado"
                  value={formik.values.telefonoRepresentado}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("telefonoRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("telefonoRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="celularRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid("celularRepresentado"),
                })}
              >
                Celular de representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="celularRepresentado"
                  name="celularRepresentado"
                  value={formik.values.celularRepresentado}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("celularRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("celularRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="emailRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid("emailRepresentado"),
                })}
              >
                Correo electrónico de representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="emailRepresentado"
                  name="emailRepresentado"
                  value={formik.values.emailRepresentado}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("emailRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("emailRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <label
                htmlFor="tipoSeguro"
                className={classNames({
                  "p-error": isFormFieldValid("tipoSeguro"),
                })}
              >
                Tipo de seguro:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <InputText
                  id="tipoSeguro"
                  name="tipoSeguro"
                  value={formik.values.tipoSeguro}
                  onChange={formik.handleChange}
                  placeholder="99999999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("tipoSeguro"),
                  })}
                  keyfilter="pint"
                ></InputText>
              </span>
              {getFormErrorMessage("tipoSeguro")}
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
          Nombre completo: <strong>{""}</strong>
        </p>
        <p>
          Lugar de trabajo: <strong>{""}</strong>
        </p>
        <p>
          Condición: <strong>{""}</strong>
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

export default ReclamoForm;
