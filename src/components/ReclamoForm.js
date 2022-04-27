import React, { useState, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import axios from "axios";

const ReclamoForm = () => {
  const [asegurado, setAsegurado] = useState({});
  const [formData, setFormData] = useState({});
  const [showDlgFound, setShowDlgFound] = useState(false);
  const [showDlgNotFound, setShowDlgNotFound] = useState(false);
  const [reclamo, setReclamo] = useState({});

  const [tiposSolicitante, setTiposSolicitantes] = useState([]);
  const [tiposSeguro, setTiposSeguro] = useState([]);

  const baseURLAsegurado = "http://localhost:8181/api-asegurados/v1/";
  const baseURLReclamos = "http://localhost:8080/api-reclamos/v1/";

  const fetchTiposSolicitante = () => {
    axios
      .get(baseURLAsegurado + "tipos-solicitante")
      .then((res) => {
        if (res.data) {
          setTiposSolicitantes(res.data);
        } else {
        }
      })
      .catch((err) => {});
  };

  const fetchTiposSeguro = () => {
    axios
      .get(baseURLAsegurado + "tipos-seguro")
      .then((res) => {
        if (res.data) {
          setTiposSeguro(res.data);
        } else {
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setAsegurado(JSON.parse(localStorage.getItem("asegurado")));
    fetchTiposSolicitante();
  }, []);

  const formik = useFormik({
    initialValues: {
      //SOLICITANTE
      nombreCompletoSolicitante: "",
      duiSolicitante: "",
      fechaExpiracionpDUISolicitante: null,
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
      fechaExpiracionpDUIRepresentado: null,
      nitRepresentado: "",
      direccionRepresentado: "",
      telefonoRepresentado: "",
      celularRepresentado: "",
      emailRepresentado: "",
      menorEdad: false,
      //ASEGURADO
      codigoAfiliado: "",
      nombreCompletoAsegurado: "",
      duiAsegurado: "",
      nitAsegurado: "",
      lugarTrabajoAsegurado: "",
      codigoCondicion: 0,
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

      if (!data.fechaExpiracionpDUISolicitante) {
        errors.fechaExpiracionpDUISolicitante =
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

      if (!data.fechaExpiracionpDUIRepresentado) {
        errors.fechaExpiracionpDUIRepresentado =
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
      return errors;
    },
    onSubmit: (data) => {
      //SETTING ASEGURADO DATA
      data.codigoAfiliado = asegurado.codigoAfiliado;
      data.nombreCompletoAsegurado = asegurado.nombreCompleto;
      data.duiAsegurado = asegurado.dui;
      data.nitAsegurado = asegurado.nit;
      data.lugarTrabajoAsegurado = asegurado.lugarTrabajo;
      data.codigoCondicion = asegurado.condicion.codigoCondicion;

      axios
        .post(baseURLReclamos + "solicitud", data)
        .then((res) => {
          if (res.status === 200) {
            setShowDlgFound(true);
            localStorage.clear();
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
                htmlFor="fechaExpiracionpDUISolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("fechaExpiracionpDUISolicitante"),
                })}
              >
                Fecha expiración DUI del solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-calendar" />
                <Calendar
                  id="fechaExpiracionpDUISolicitante"
                  name="fechaExpiracionpDUISolicitante"
                  value={formik.values.fechaExpiracionpDUISolicitante}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid(
                      "fechaExpiracionpDUISolicitante"
                    ),
                  })}
                />
              </span>
              {getFormErrorMessage("fechaExpiracionpDUISolicitante")}
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
                  options={tiposSolicitante}
                  optionLabel="descripcion"
                  optionValue="noCalidad"
                  placeholder="Selecccione una opción"
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
            <div className="p-field" style={{ marginTop: "10px" }}>
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
              <Checkbox
                inputId="menorEdad"
                name="menorEdad"
                checked={formik.values.menorEdad}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("menorEdad"),
                })}
              />
              <label
                htmlFor="menorEdad"
                className={classNames({
                  "p-error": isFormFieldValid("menorEdad"),
                })}
              >
                &nbsp;&nbsp;Beneficiario menor de edad?
              </label>
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
                htmlFor="fechaExpiracionpDUIRepresentado"
                className={classNames({
                  "p-error": isFormFieldValid(
                    "fechaExpiracionpDUIRepresentado"
                  ),
                })}
              >
                Fecha expiración DUI del representado:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-credit-card" />
                <Calendar
                  id="fechaExpiracionpDUIRepresentado"
                  name="fechaExpiracionpDUIRepresentado"
                  value={formik.values.fechaExpiracionpDUIRepresentado}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid(
                      "fechaExpiracionpDUIRepresentado"
                    ),
                  })}
                />
              </span>
              {getFormErrorMessage("fechaExpiracionpDUIRepresentado")}
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
