import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
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
  const [selectedSolicitante, setSelectedSolicitante] = useState(null);
  const [showInfoRepresentado, setShowInfoRepresentado] = useState(false);
  const [showInfoPadres, setShowInfoPadres] = useState(false);

  const baseURLAsegurado = "http://localhost:8181/api-asegurados/v1/";
  const baseURLReclamos = "http://localhost:8080/api-reclamos/v1/";

  const toast = useRef(null);

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

  const navigate = useNavigate();

  const onProcedureEnd = () => {
    navigate("/");
  };

  const onTipoSolicitanteChange = (e) => {
    let selectedTipoSolicitante = e.target.value;
    setShowInfoRepresentado(
      selectedTipoSolicitante === "04" ||
        selectedTipoSolicitante === "05" ||
        selectedTipoSolicitante === "06"
    );
    setShowInfoPadres(selectedTipoSolicitante === "06");
    formik.handleChange(e);
  };

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
  };

  const clear = () => {
    toast.current.clear();
  };

  useEffect(() => {
    setAsegurado(JSON.parse(localStorage.getItem("asegurado")));
    fetchTiposSolicitante();
  }, []);

  const formik = useFormik({
    initialValues: {
      //SOLICITANTE
      nombresSolicitante: "",
      apellidosSolicitante: "",
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
      nombresRepresentado: "",
      apellidosRepresentado: "",
      duiRepresentado: "",
      fechaExpiracionpDUIRepresentado: null,
      nitRepresentado: "",
      direccionRepresentado: "",
      telefonoRepresentado: "",
      celularRepresentado: "",
      emailRepresentado: "",
      nombresMadreRepresentado: "",
      apellidosMadreRepresentado: "",
      duiMadreRepresentado: "",
      nitMadreRepresentado: "",
      fechaExpiracionpDUIMadreRepresentado: null,
      nombresPadreRepresentado: "",
      apellidosPadreRepresentado: "",
      duiPadreRepresentado: "",
      nitPadreRepresentado: "",
      fechaExpiracionpDUIPadreRepresentado: null,
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
      if (!data.nombresSolicitante) {
        errors.nombresSolicitante = "Nombres del solicitante es requerido.";
      }

      if (!data.apellidosSolicitante) {
        errors.apellidosSolicitante = "Apellidos del solicitante es requerido.";
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

      if (showInfoRepresentado) {
        //REPRESENTADO
        if (!data.nombresRepresentado) {
          errors.nombresRepresentado = "Nombres del representado es requerido.";
        }

        if (!data.apellidosRepresentado) {
          errors.apellidosRepresentado =
            "Apellidos del representado es requerido.";
        }

        if (!showInfoPadres) {
          if (!data.duiRepresentado) {
            errors.duiRepresentado = "DUI del representado es requerido.";
          }

          if (!data.fechaExpiracionpDUIRepresentado) {
            errors.fechaExpiracionpDUIRepresentado =
              "Fecha expiración DUI del representado es requerido.";
          }
        }

        if (!data.nitRepresentado) {
          errors.nitRepresentado = "NIT del representado es requerido.";
        }

        if (!data.direccionRepresentado) {
          errors.direccionRepresentado =
            "Direción del representado es requerido.";
        }

        if (!data.telefonoRepresentado) {
          errors.telefonoRepresentado =
            "Teléfono del representado es requerido.";
        }

        if (!data.celularRepresentado) {
          errors.celularRepresentado = "Celular del representado es requerido.";
        }

        if (!data.emailRepresentado) {
          errors.emailRepresentado =
            "Correo electrónico del representado es requerido.";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
            data.emailSolicitante
          )
        ) {
          errors.emailRepresentado =
            "Dirección de correo incorrecta. Ejem. nombre@email.com";
        }

        if (showInfoPadres) {
          //MADRE
          if (!data.nombresMadreRepresentado) {
            errors.nombresMadreRepresentado =
              "Nombre completo de la madre de representado es requerido.";
          }

          if (!data.apellidosMadreRepresentado) {
            errors.apellidosMadreRepresentado =
              "Nombre completo de la madre de representado es requerido.";
          }

          if (!data.duiMadreRepresentado) {
            errors.duiMadreRepresentado =
              "DUI de la madre del representado es requerido.";
          }

          if (!data.fechaExpiracionpDUIMadreRepresentado) {
            errors.fechaExpiracionpDUIMadreRepresentado =
              "Fecha expiración DUI de la madre del representado es requerido.";
          }

          if (!data.nitMadreRepresentado) {
            errors.nitMadreRepresentado =
              "NIT de la madre del representado es requerido.";
          }

          //PADRE
          if (!data.nombresPadreRepresentado) {
            errors.nombresPadreRepresentado =
              "Nombre completo de la madre de representado es requerido.";
          }

          if (!data.apellidosPadreRepresentado) {
            errors.apellidosPadreRepresentado =
              "Nombre completo de la madre de representado es requerido.";
          }

          if (!data.duiPadreRepresentado) {
            errors.duiPadreRepresentado =
              "DUI del padre del representado es requerido.";
          }

          if (!data.fechaExpiracionpDUIPadreRepresentado) {
            errors.fechaExpiracionpDUIPadreRepresentado =
              "Fecha expiración DUI del padre del representado es requerido.";
          }

          if (!data.nitPadreRepresentado) {
            errors.nitPadreRepresentado =
              "NIT del padre del representado es requerido.";
          }
        }
      }
      // if (errors) {
      //   clear();
      //   toast.current.show({
      //     severity: "success",
      //     summary: "Success Message",
      //     detail: "Message Content",
      //     life: 3000,
      //   });
      // }
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
            //TODO - Enviar los 5 documentos adjuntos aquí
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
          label="ACEPTAR"
          icon="pi pi-check"
          onClick={() => onProcedureEnd()}
          autoFocus
        />
      </div>
    );
  };

  const renderFooterNotFound = () => {
    return (
      <div>
        <Button
          label="ACEPTAR"
          icon="pi pi-check"
          onClick={() => onProcedureEnd()}
          autoFocus
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <Card
        title="Información del reclamo"
        style={{ width: "30rem", marginBottom: "2em", marginTop: "10px" }}
      >
        <div className="p-fluid">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
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
                  onChange={onTipoSolicitanteChange}
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
            <div className="p-field">
              <label
                htmlFor="nombresSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("nombresSolicitante"),
                })}
              >
                Nombres del solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-user" />
                <InputText
                  id="nombresSolicitante"
                  name="nombresSolicitante"
                  type="text"
                  value={formik.values.nombresSolicitante}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("nombresSolicitante"),
                  })}
                />
              </span>
              {getFormErrorMessage("nombresSolicitante")}
            </div>
            <div className="p-field">
              <label
                htmlFor="apellidosSolicitante"
                className={classNames({
                  "p-error": isFormFieldValid("apellidosSolicitante"),
                })}
              >
                Apellidos del solicitante:
              </label>
              <span className="p-input-icon-right">
                <i className="pi pi-user" />
                <InputText
                  id="apellidosSolicitante"
                  name="apellidosSolicitante"
                  type="text"
                  value={formik.values.apellidosSolicitante}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("apellidosSolicitante"),
                  })}
                />
              </span>
              {getFormErrorMessage("apellidosSolicitante")}
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
                  minDate={new Date()}
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
                <InputText
                  id="nitSolicitante"
                  name="nitSolicitante"
                  value={formik.values.nitSolicitante}
                  onChange={formik.handleChange}
                  placeholder="99999999999999"
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
            {showInfoRepresentado && (
              <React.Fragment>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="nombresRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("nombresRepresentado"),
                    })}
                  >
                    Nombres del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText
                      id="nombresRepresentado"
                      name="nombresRepresentado"
                      type="text"
                      value={formik.values.nombresRepresentado}
                      onChange={formik.handleChange}
                      className={classNames({
                        "p-invalid": isFormFieldValid("nombresRepresentado"),
                      })}
                    />
                  </span>
                  {getFormErrorMessage("nombresRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="apellidosRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("apellidosRepresentado"),
                    })}
                  >
                    Apellidos del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText
                      id="apellidosRepresentado"
                      name="apellidosRepresentado"
                      type="text"
                      value={formik.values.apellidosRepresentado}
                      onChange={formik.handleChange}
                      className={classNames({
                        "p-invalid": isFormFieldValid("apellidosRepresentado"),
                      })}
                    />
                  </span>
                  {getFormErrorMessage("apellidosRepresentado")}
                </div>
                {!showInfoPadres && (
                  <React.Fragment>
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
                          minDate={new Date()}
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
                  </React.Fragment>
                )}
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
                      placeholder="99999999999999"
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
              </React.Fragment>
            )}
            {showInfoPadres && (
              <React.Fragment>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="nombresMadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("nombresMadreRepresentado"),
                    })}
                  >
                    Nombres de la madre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText
                      id="nombresMadreRepresentado"
                      name="nombresMadreRepresentado"
                      type="text"
                      value={formik.values.nombresMadreRepresentado}
                      onChange={formik.handleChange}
                      className={classNames({
                        "p-invalid": isFormFieldValid(
                          "nombresMadreRepresentado"
                        ),
                      })}
                    />
                  </span>
                  {getFormErrorMessage("nombresMadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="apellidosMadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("apellidosMadreRepresentado"),
                    })}
                  >
                    Nombres de la madre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText
                      id="apellidosMadreRepresentado"
                      name="apellidosMadreRepresentado"
                      type="text"
                      value={formik.values.apellidosMadreRepresentado}
                      onChange={formik.handleChange}
                      className={classNames({
                        "p-invalid": isFormFieldValid(
                          "apellidosMadreRepresentado"
                        ),
                      })}
                    />
                  </span>
                  {getFormErrorMessage("apellidosMadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="duiMadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("duiMadreRepresentado"),
                    })}
                  >
                    DUI de la madre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-id-card" />
                    <InputMask
                      id="duiMadreRepresentado"
                      name="duiMadreRepresentado"
                      mask="999999999"
                      value={formik.values.duiMadreRepresentado}
                      onChange={formik.handleChange}
                      placeholder="999999999"
                      className={classNames({
                        "p-invalid": isFormFieldValid("duiMadreRepresentado"),
                      })}
                    ></InputMask>
                  </span>
                  {getFormErrorMessage("duiMadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="fechaExpiracionpDUIMadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid(
                        "fechaExpiracionpDUIMadreRepresentado"
                      ),
                    })}
                  >
                    Fecha expiración DUI de la madre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-credit-card" />
                    <Calendar
                      id="fechaExpiracionpDUIMadreRepresentado"
                      name="fechaExpiracionpDUIMadreRepresentado"
                      value={formik.values.fechaExpiracionpDUIMadreRepresentado}
                      onChange={formik.handleChange}
                      dateFormat="dd/mm/yy"
                      mask="99/99/9999"
                      minDate={new Date()}
                      showIcon
                      className={classNames({
                        "p-invalid": isFormFieldValid(
                          "fechaExpiracionpDUIMadreRepresentado"
                        ),
                      })}
                    />
                  </span>
                  {getFormErrorMessage("fechaExpiracionpDUIMadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="nitMadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("nitMadreRepresentado"),
                    })}
                  >
                    NIT de la madre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-credit-card" />
                    <InputText
                      id="nitMadreRepresentado"
                      name="nitMadreRepresentado"
                      value={formik.values.nitMadreRepresentado}
                      onChange={formik.handleChange}
                      placeholder="99999999999999"
                      className={classNames({
                        "p-invalid": isFormFieldValid("nitMadreRepresentado"),
                      })}
                      keyfilter="pint"
                    ></InputText>
                  </span>
                  {getFormErrorMessage("nitMadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="nombresPadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("nombresPadreRepresentado"),
                    })}
                  >
                    Nombres del padre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText
                      id="nombresPadreRepresentado"
                      name="nombresPadreRepresentado"
                      type="text"
                      value={formik.values.nombresPadreRepresentado}
                      onChange={formik.handleChange}
                      className={classNames({
                        "p-invalid": isFormFieldValid(
                          "nombresPadreRepresentado"
                        ),
                      })}
                    />
                  </span>
                  {getFormErrorMessage("nombreCompletoPadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="apellidosPadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("apellidosPadreRepresentado"),
                    })}
                  >
                    Apellidos del padre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-user" />
                    <InputText
                      id="apellidosPadreRepresentado"
                      name="apellidosPadreRepresentado"
                      type="text"
                      value={formik.values.apellidosPadreRepresentado}
                      onChange={formik.handleChange}
                      className={classNames({
                        "p-invalid": isFormFieldValid(
                          "apellidosPadreRepresentado"
                        ),
                      })}
                    />
                  </span>
                  {getFormErrorMessage("apellidosPadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="duiPadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("duiPadreRepresentado"),
                    })}
                  >
                    DUI del padre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-id-card" />
                    <InputMask
                      id="duiPadreRepresentado"
                      name="duiPadreRepresentado"
                      mask="999999999"
                      value={formik.values.duiPadreRepresentado}
                      onChange={formik.handleChange}
                      placeholder="999999999"
                      className={classNames({
                        "p-invalid": isFormFieldValid("duiPadreRepresentado"),
                      })}
                    ></InputMask>
                  </span>
                  {getFormErrorMessage("duiPadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="fechaExpiracionpDUIPadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid(
                        "fechaExpiracionpDUIPadreRepresentado"
                      ),
                    })}
                  >
                    Fecha expiración DUI del padre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-credit-card" />
                    <Calendar
                      id="fechaExpiracionpDUIPadreRepresentado"
                      name="fechaExpiracionpDUIPadreRepresentado"
                      value={formik.values.fechaExpiracionpDUIPadreRepresentado}
                      onChange={formik.handleChange}
                      dateFormat="dd/mm/yy"
                      mask="99/99/9999"
                      minDate={new Date()}
                      showIcon
                      className={classNames({
                        "p-invalid": isFormFieldValid(
                          "fechaExpiracionpDUIPadreRepresentado"
                        ),
                      })}
                    />
                  </span>
                  {getFormErrorMessage("fechaExpiracionpDUIPadreRepresentado")}
                </div>
                <div className="p-field" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="nitPadreRepresentado"
                    className={classNames({
                      "p-error": isFormFieldValid("nitPadreRepresentado"),
                    })}
                  >
                    NIT del padre del representado:
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-credit-card" />
                    <InputText
                      id="nitPadreRepresentado"
                      name="nitPadreRepresentado"
                      value={formik.values.nitPadreRepresentado}
                      onChange={formik.handleChange}
                      placeholder="99999999999999"
                      className={classNames({
                        "p-invalid": isFormFieldValid("nitPadreRepresentado"),
                      })}
                      keyfilter="pint"
                    ></InputText>
                  </span>
                  {getFormErrorMessage("nitPadreRepresentado")}
                </div>
              </React.Fragment>
            )}
            <Panel
              header="Documentos del asegurado"
              style={{ marginTop: "10px" }}
            >
              <div className="p-field" style={{ marginTop: "10px" }}>
                <label htmlFor="partidaDefuncionEscaneo">
                  Escaneo partida de defunción:
                </label>
                <input
                  id="partidaDefuncionEscaneo"
                  type="file"
                  name="partida-defuncion-asegurado"
                  onChange={onFileChange}
                />
              </div>
              <div className="p-field" style={{ marginTop: "10px" }}>
                <label htmlFor="partidaNacimientoEscaneo">
                  Escaneo partida de nacimiento:
                </label>
                <input
                  id="partidaNacimientoEscaneo"
                  type="file"
                  name="partida-nacimiento-asegurado"
                  onChange={onFileChange}
                />
              </div>
              <div className="p-field" style={{ marginTop: "10px" }}>
                <label htmlFor="duiEscaneo">Escaneo DUI:</label>
                <input
                  id="duiEscaneo"
                  type="file"
                  name="dui-asegurado"
                  onChange={onFileChange}
                />
              </div>
            </Panel>
            <Panel
              header="Documentos del beneficiario"
              style={{ marginTop: "10px" }}
            >
              <div className="p-field" style={{ marginTop: "10px" }}>
                <label htmlFor="partidaDeNacimientoBeneficiarioEscaneo">
                  Escaneo partida de nacimiento:
                </label>
                <input
                  id="partidaDeNacimientoBeneficiarioEscaneo"
                  type="file"
                  name="partida-nacimiento-beneficiario"
                  onChange={onFileChange}
                />
              </div>
              <div className="p-field" style={{ marginTop: "10px" }}>
                <label htmlFor="duiRTAEscaneo">
                  Escaneo DUI representante legal, tutor o apoderado legal:
                </label>
                <input
                  id="duiRTAEscaneo"
                  type="file"
                  name="dui-representante"
                  onChange={onFileChange}
                />
              </div>
            </Panel>
            <div className="p-field" style={{ marginTop: "10px" }}>
              <Button label="Enviar" icon="pi pi-check" type="submit" />
            </div>
          </form>
        </div>
      </Card>

      <Dialog
        header="Ingreso de información"
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
          La información proporcionada a sido guardada con éxito. Para poder
          completar su trámite, puede visitarnos en las oficinas centrales o
          agencias departamentales de La Caja con el DUI de la persona que
          registrado el trámite web.
        </p>
      </Dialog>
      <Dialog
        header="Ingreso de información"
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
          Lo sentimos, no se puedo guardar la información proporcionada, favor
          verificar la información en el formulario e intentar de nuevo. Haga
          clic en el botón <strong>SI</strong> para continuar.
        </p>
      </Dialog>
    </React.Fragment>
  );
};

export default ReclamoForm;
