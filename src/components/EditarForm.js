import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { startGetDatos, editPrac } from "../actions/prac";
import Swal from "sweetalert2";
import validator from "validator";

export const EditarForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ruta = location.pathname.split("/").pop();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetDatos(ruta));
  }, []);

  const { practicante } = useSelector((state) => state.practicantes);

  const {
    nombre,
    apellidos,
    genero,
    correo,
    telefono,
    clabeInterbancaria,
    horario,
    fechaNac,
  } = practicante;

  const [formValues, handleInputChange] = useForm({
    nombreP: nombre,
    apellidoP: apellidos,
    generoP: genero,
    correoP: correo,
    numTelP: telefono,
    CLABEP: clabeInterbancaria,
    horarioP: horario,
    fechaNacP: fechaNac,
  });
  const { nombreP, apellidoP, generoP, correoP, numTelP, CLABEP, horarioP } =
    formValues;
  //let { fechaNac } = formValues;
  const [startDate, setStartDate] = useState(new Date());

  const handleCrear = (e) => {
    e.preventDefault();
    //fechaNac = moment(startDate).format("MM Do YYYY");
    if (isFormValid()) {
      dispatch(
        editPrac(ruta, nombreP, apellidoP, generoP, correoP, numTelP, horarioP)
      );
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  };

  const isFormValid = () => {
    if (nombreP.trim().length === 0) {
      Swal.fire("Error", "El nombre es necesario", "error");
    } else if (apellidos.trim().length === 0) {
      Swal.fire("Error", "Los apellidos son necesarios", "error");
    } else if (genero === "") {
      Swal.fire("Error", "Debes seleccionar un genero", "error");
    } else if (!validator.isEmail(correo)) {
      Swal.fire("Error", "El email no es correcto", "error");
    } else if (!validator.isMobilePhone(numTelP)) {
      Swal.fire("Error", "El numero de telefono no es correcto", "error");
    } else if (horario === "") {
      Swal.fire("Error", "Debes seleccionar un horario", "error");
    } else {
      return true;
    }
  };

  const checkRadio = (val) => {
    if (genero === val) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="container w-75">
        <form>
          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Nombre</h5>
            <div className="form-group w-75">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre(s)"
                name="nombreP"
                value={nombreP}
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
                name="apellidoP"
                value={apellidoP}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5>Genero</h5>
            <div className="radio w-75">
              <div className="radio">
                <label value={generoP}>
                  <input
                    type="radio"
                    value="Femenino"
                    name="generoP"
                    onChange={handleInputChange}
                  />
                  Femenino
                </label>
              </div>
              <div className="radio">
                <label value={generoP}>
                  <input
                    type="radio"
                    value="Masculino"
                    name="generoP"
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
                type="text"
                className="form-control"
                placeholder="email@algo.com"
                name="correoP"
                value={correoP}
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
                name="numTelP"
                value={numTelP}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">CLABE Interbancaria</h5>
            <div className="form-group w-75">
              <input
                type="text"
                className="form-control"
                name="CLABEP"
                value={CLABEP}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Preferencia de horario</h5>
            <div className="form-group w-75">
              <select
                className="form-select"
                value={horarioP}
                onChange={handleInputChange}
                name="horarioP"
              >
                <option value="n/a" name="horarioP">
                  Seleccione horario
                </option>
                <option value="8Am-1Pm" name="horarioP">
                  8Am-1Pm
                </option>
                <option value="1Pm-6Pm" name="horarioP">
                  1Pm-6Pm
                </option>
                <option value="Otro" name="horarioP">
                  Otro
                </option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between m-3">
            <h5 className="align-middle m-1">Fecha de nacimiento</h5>
            <div className="w-75">
              <DatePicker
                className=" form-control w-100"
                selected={startDate}
                name="fechaNacP"
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center m-5">
            <input
              type="submit"
              className="btn btn-success btn-lg btn-block w-50"
              value="Editar"
              onClick={handleCrear}
            />
          </div>
        </form>
      </div>
    </>
  );
};
