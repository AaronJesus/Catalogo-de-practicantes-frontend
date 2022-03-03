import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { startGetDatos, activar } from "../actions/prac";
import { Nada } from "../helpers/Nada";
import { DetallesForm } from "./DetallesForm";

export const DetallesP = () => {
  const location = useLocation();
  const ruta = location.pathname.split("/").pop();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetDatos(ruta));
  }, []);

  const { practicante } = useSelector((state) => state.practicantes);
  const navigate = useNavigate();
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/editar/${practicante.id}`);
  };

  const handleActivar = (e) => {
    e.preventDefault();
    dispatch(activar(practicante.id));
  };

  return (
    <>
      <div className="bg-dark p-1">
        <h1 className="d-flex justify-content-center text-light">
          Detalles del Practicante
        </h1>
      </div>

      <div className="d-flex justify-content-between m-3">
        <button className="btn btn-success btn-lg m-2" onClick={handleBack}>
          Regresar
        </button>
        <div>
          <button className="btn btn-success btn-lg m-2" onClick={handleEdit}>
            Editar
          </button>
          <button
            className="btn btn-success btn-lg m-2"
            onClick={handleActivar}
          >
            Activar
          </button>
        </div>
      </div>

      <div className="container">
        {practicante !== undefined ? (
          practicante.id ? (
            <DetallesForm />
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
