import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import DatePicker from "react-datepicker";
import validator from "validator";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { startNewPrac } from "../actions/prac";

export const CrearP = () => {
  const dispacth = useDispatch();

  const isFormValid = () => {
    if (nombres.trim().length === 0) {
      Swal.fire("Error", "El nombre es necesario", "error");
    } else if (apellidos.trim().length === 0) {
      Swal.fire("Error", "Los apellidos son necesarios", "error");
    } else if (genero === "") {
      Swal.fire("Error", "Debes seleccionar un genero", "error");
    } else if (!validator.isEmail(correo)) {
      Swal.fire("Error", "El email no es correcto", "error");
    } else if (!validator.isMobilePhone(numTel)) {
      Swal.fire("Error", "El numero de telefono no es correcto", "error");
    } else if (horario === "") {
      Swal.fire("Error", "Debes seleccionar un horario", "error");
    } else {
      return true;
    }
  };

  const navigate = useNavigate();
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const [formValues, handleInputChange] = useForm({
    id: "",
    nombres: "",
    apellidos: "",
    genero: "",
    correo: "",
    numTel: "",
    CLABE: "",
    horario: "",
    fechaNac: "",
    activo: true,
  });

  const handleCrear = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      fechaNac = startDate.toISOString();
      dispacth(
        startNewPrac(
          nombres,
          apellidos,
          genero,
          correo,
          numTel,
          CLABE,
          horario,
          fechaNac
        )
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  const { nombres, apellidos, genero, correo, numTel, CLABE, horario } =
    formValues;
  let { fechaNac } = formValues;
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className="bg-dark p-1">
        <h1 className="d-flex justify-content-center text-light">
          Crear Practicante
        </h1>
      </div>

      <div className="d-flex align-items-start flex-column m-3">
        <button className="btn btn-success btn-lg m-2" onClick={handleBack}>
          Regresar
        </button>
      </div>

      <div className="container w-75">
        <form>
          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Nombre</h5>
            <div className="form-group w-75">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre(s)"
                name="nombres"
                value={nombres}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Apellidos</h5>
            <div className="form-group w-75">
              <input
                type="text"
                className="form-control"
                placeholder="Apellidos"
                name="apellidos"
                value={apellidos}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5>Genero</h5>
            <div className="radio w-75">
              <div className="radio">
                <label value={genero}>
                  <input
                    type="radio"
                    value="Femenino"
                    name="genero"
                    className="m-1"
                    onChange={handleInputChange}
                  />
                  Femenino
                </label>
              </div>
              <div className="radio">
                <label value={genero}>
                  <input
                    type="radio"
                    value="Masculino"
                    name="genero"
                    className="m-1"
                    onChange={handleInputChange}
                  />
                  Masculino
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Correo Electronico</h5>
            <div className="form-group w-75">
              <input
                type="email"
                className="form-control"
                placeholder="email@algo.com"
                name="correo"
                value={correo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Numero de telefono</h5>
            <div className="form-group w-75">
              <input
                type="text"
                className="form-control"
                name="numTel"
                value={numTel}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <div>
              <h5 className="align-middle m-1">CLABE Interbancaria</h5>
              <label className="d-flex justify-content-center text-muted font-weight-light">
                Opcional
              </label>
            </div>
            <div className="form-group w-75">
              <input
                type="text"
                className="form-control"
                name="CLABE"
                value={CLABE}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Preferencia de horario</h5>
            <div className="form-group w-75">
              <select
                className="form-select"
                value={horario}
                onChange={handleInputChange}
                name="horario"
              >
                <option value="" name="horario">
                  Seleccione horario
                </option>
                <option value="8Am-1Pm" name="horario">
                  8Am-1Pm
                </option>
                <option value="1Pm-6Pm" name="horario">
                  1Pm-6Pm
                </option>
                <option value="Otro" name="horario">
                  Otro
                </option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Fecha de nacimiento</h5>
            <div className="w-75">
              <DatePicker
                selected={startDate}
                className=" form-control w-100"
                name="fechaNac"
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center m-5">
            <input
              type="submit"
              className="btn btn-success btn-lg btn-block w-50"
              value="Crear"
              onClick={handleCrear}
            />
          </div>
        </form>
      </div>
    </>
  );
};
