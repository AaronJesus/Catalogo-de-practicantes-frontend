import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startGetPrac } from "../actions/prac";
import { Nada } from "../helpers/Nada";
import { Tablas } from "./Tablas";

export const ListadoP = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetPrac());
  }, [dispatch]);
  const { practicantes } = useSelector((state) => state.practicantes);
  const navigate = useNavigate();
  const handleCreate = (e) => {
    e.preventDefault();
    navigate("/crear");
  };
  return (
    <>
      <div className="bg-dark p-1">
        <h1 className="d-flex justify-content-center text-light">
          Catalogo de Practicantes
        </h1>
      </div>

      <div className="d-flex align-items-end flex-column m-2">
        <button className="btn btn-success btn-lg m-2" onClick={handleCreate}>
          Crear
        </button>
      </div>

      <div className="container">
        {practicantes !== undefined ? <Tablas /> : <Nada />}
      </div>
    </>
  );
};
