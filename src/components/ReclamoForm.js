import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
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

  const solicitantes = [
    { id: 1, name: "Beneficiario" },
    { id: 2, name: "Heredero" },
    { id: 3, name: "Apoderado Legal" },
    { id: 4, name: "Tutor" },
  ];

  const seguros = [
    { id: 1, name: "Seguro de Vida Básico" },
    { id: 2, name: "Seguro de Vida Opcional" },
    { id: 3, name: "Seguro de Vida Dotal" },
    { id: 4, name: "Seguro por Sepelio" },
    { id: 5, name: "Seguro por Gasto Funerarios" },
  ];

  const formik = useFormik({
    initialValues: {
      //SOLICITANTE
      nombreCompletoSolicitante: "",
      duiSolicitante: "",
      fechaExpDuiSolicitante: null,
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
      fechaExpDuiRepresentado: null,
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

      if (!data.emailSolicitante) {
        errors.emailSolicitante =
          "Correo electrónico del solicitante es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.emailSolicitante)
      ) {
        errors.emailSolicitante =
          "Dirección de correo incorrecta. Ejem. nombre@email.com";
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
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.emailSolicitante)
      ) {
        errors.emailRepresentado =
          "Dirección de correo incorrecta. Ejem. nombre@email.com";
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
        style={{ width: "30rem", marginBottom: "2em", marginTop: "10px" }}
      >
        <div className="p-fluid">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
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
                <Dropdown
                  id="tipoSeguro"
                  name="tipoSeguro"
                  value={formik.values.tipoSeguro}
                  onChange={formik.handleChange}
                  options={seguros}
                  optionLabel="name"
                  className={classNames({
                    "p-invalid": isFormFieldValid("tipoSeguro"),
                  })}
                />
              </span>
              {getFormErrorMessage("tipoSeguro")}
            </div>
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
                <i className="pi pi-calendar" />
                <Calendar
                  id="fechaExpDuiSolicitante"
                  name="fechaExpDuiSolicitante"
                  value={formik.values.fechaExpDuiSolicitante}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("fechaExpDuiSolicitante"),
                  })}
                />
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
                <InputMask
                  id="nitSolicitante"
                  name="nitSolicitante"
                  value={formik.values.nitSolicitante}
                  onChange={formik.handleChange}
                  mask="9999-999999-999-9"
                  placeholder="9999-999999-999-9"
                  className={classNames({
                    "p-invalid": isFormFieldValid("nitSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputMask>
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
                <Dropdown
                  id="tipoSolicitante"
                  name="tipoSolicitante"
                  value={formik.values.tipoSolicitante}
                  onChange={formik.handleChange}
                  options={solicitantes}
                  optionLabel="name"
                  className={classNames({
                    "p-invalid": isFormFieldValid("tipoSolicitante"),
                  })}
                />
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
                <i className="pi pi-book" />
                <InputTextarea
                  id="direccionSolicitante"
                  name="direccionSolicitante"
                  value={formik.values.direccionSolicitante}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("direccionSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputTextarea>
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
                <i className="pi pi-phone" />
                <InputMask
                  id="telefonoSolicitante"
                  name="telefonoSolicitante"
                  value={formik.values.telefonoSolicitante}
                  onChange={formik.handleChange}
                  mask="9999-9999"
                  placeholder="9999-9999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("telefonoSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputMask>
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
                <i className="pi pi-phone" />
                <InputMask
                  id="celularSolicitante"
                  name="celularSolicitante"
                  value={formik.values.celularSolicitante}
                  onChange={formik.handleChange}
                  mask="9999-9999"
                  placeholder="9999-9999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("celularSolicitante"),
                  })}
                  keyfilter="pint"
                ></InputMask>
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
                <i className="pi pi-at" />
                <InputText
                  id="emailSolicitante"
                  name="emailSolicitante"
                  value={formik.values.emailSolicitante}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("emailSolicitante"),
                  })}
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
                <i className="pi pi-pencil" />
                <InputTextarea
                  id="observacion"
                  name="observacion"
                  value={formik.values.observacion}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("observacion"),
                  })}
                  keyfilter="pint"
                ></InputTextarea>
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
                <Calendar
                  id="fechaExpDuiRepresentado"
                  name="fechaExpDuiRepresentado"
                  value={formik.values.fechaExpDuiRepresentado}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("fechaExpDuiRepresentado"),
                  })}
                />
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
                <InputMask
                  id="nitRepresentado"
                  name="nitRepresentado"
                  value={formik.values.nitRepresentado}
                  onChange={formik.handleChange}
                  mask="9999-999999-999-9"
                  placeholder="9999-999999-999-9"
                  className={classNames({
                    "p-invalid": isFormFieldValid("nitRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputMask>
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
                <i className="pi pi-book" />
                <InputTextarea
                  id="direccionRepresentado"
                  name="direccionRepresentado"
                  value={formik.values.direccionRepresentado}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("direccionRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputTextarea>
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
                <i className="pi pi-phone" />
                <InputMask
                  id="telefonoRepresentado"
                  name="telefonoRepresentado"
                  value={formik.values.telefonoRepresentado}
                  onChange={formik.handleChange}
                  mask="9999-9999"
                  placeholder="9999-9999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("telefonoRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputMask>
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
                <i className="pi pi-phone" />
                <InputMask
                  id="celularRepresentado"
                  name="celularRepresentado"
                  value={formik.values.celularRepresentado}
                  onChange={formik.handleChange}
                  mask="9999-9999"
                  placeholder="9999-9999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("celularRepresentado"),
                  })}
                  keyfilter="pint"
                ></InputMask>
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
                <i className="pi pi-at" />
                <InputText
                  id="emailRepresentado"
                  name="emailRepresentado"
                  value={formik.values.emailRepresentado}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("emailRepresentado"),
                  })}
                ></InputText>
              </span>
              {getFormErrorMessage("emailRepresentado")}
            </div>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <Button label="Enviar" icon="pi pi-check" type="submit" />
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
