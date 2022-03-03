import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../helpers/posts";
import { practicantes } from "../data/Practicantes";
import { EditarForm } from "./EditarForm";
import { Nada } from "../helpers/Nada";
import { useDispatch, useSelector } from "react-redux";
import { startGetDatos } from "../actions/prac";

export const EditarP = () => {
  const location = useLocation();
  const ruta = location.pathname.split("/").pop();
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(startGetDatos(ruta));
  }, []);

  const { practicante } = useSelector((state) => state.practicantes);

  const navigate = useNavigate();
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <div className="bg-dark p-1">
        <h1 className="d-flex justify-content-center text-light">
          Editar Practicante
        </h1>
      </div>

      <div className="d-flex align-items-start flex-column m-3">
        <button className="btn btn-success btn-lg m-2" onClick={handleBack}>
          Regresar
        </button>
      </div>

      <div className="container">
        {practicante !== undefined ? (
          practicante.id ? (
            <EditarForm />
          ) : (
            <Nada />
          )
        ) : (
          <h3>Cargando...</h3>
        )}
      </div>
    </>
  );
};
