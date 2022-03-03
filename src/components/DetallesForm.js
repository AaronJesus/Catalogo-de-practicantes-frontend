import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { startGetDatos } from "../actions/prac";
import { api } from "../helpers/posts";

export const DetallesForm = () => {
  const location = useLocation();
  const ruta = location.pathname.split("/").pop();
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startGetDatos(ruta));
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

  return (
    <>
      {practicante !== undefined ? (
        <div className="container w-75">
          <form>
            <div className="d-flex justify-content-between m-3">
              <h5 className="align-middle m-1">Nombre</h5>
              <div className="form-group w-75">
                <span type="text" className="form-control-plaintext">
                  {nombre}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between m-3">
              <h5 className="align-middle m-1">Apellidos</h5>
              <div className="form-group w-75">
                <span type="text" className="form-control-plaintext">
                  {apellidos}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between m-3">
              <h5>Genero</h5>
              <div className="form-group w-75">
                <span type="text" className="form-control-plaintext">
                  {genero}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between m-3">
              <h5 className="align-middle m-1">Correo Electronico</h5>
              <div className="form-group w-75">
                <span type="text" className="form-control-plaintext">
                  {correo}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between m-3">
              <h5 className="align-middle m-1">Numero de telefono</h5>
              <div className="form-group w-75">
                <span type="text" className="form-control-plaintext">
                  {telefono}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between m-3">
              <h5 className="align-middle m-1">CLABE Interbancaria</h5>
              <div className="form-group w-75">
                <span type="text" className="form-control-plaintext">
                  {clabeInterbancaria ? clabeInterbancaria : "-----"}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between m-3">
              <h5 className="align-middle m-1">Preferencia de horario</h5>
              <div className="form-group w-75">
                <span type="text" className="form-control-plaintext">
                  {horario}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between m-3">
              <h5 className="align-middle m-1">Fecha de nacimiento</h5>
              <div className="form-group w-75">
                <span type="text" className="form-control-plaintext">
                  {fechaNac ? fechaNac : "-----"}
                </span>
              </div>
            </div>
          </form>
        </div>
      ) : (
        console.log("Trayendo practicante")
      )}
    </>
  );
};
