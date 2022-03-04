import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activar, startGetPrac } from "../actions/prac";
import Swal from "sweetalert2";
import { useForm } from "../hooks/useForm";

export const Tablas = () => {
  const dispatch = useDispatch();
  const { practicantes } = useSelector((state) => state.practicantes);
  useEffect(() => {
    dispatch(startGetPrac());
  }, [dispatch]);
  const navigate = useNavigate();

  const handleVer = (id) => {
    navigate(`/detalles/${id}`);
  };
  const handleEditar = (id) => {
    navigate(`/editar/${id}`);
  };
  const handleActivar = (id) => {
    Swal.fire({
      title: "Quiere activar al practicante?",
      showCancelButton: true,
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(activar(id));
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Correo Electronico</th>
            <th scope="col">Activo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {practicantes !== undefined ? (
            practicantes.map((practicante) => {
              return (
                <tr key={practicante.id}>
                  <th scope="row">{`${practicante.nombre} ${practicante.apellidos}`}</th>
                  <td>{`${practicante.correo}`}</td>
                  <td>{practicante.activo === 0 ? "X" : "✓"}</td>
                  <td>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => handleVer(practicante.id)}
                    >
                      Ver
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => handleEditar(practicante.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-success m-1"
                      onClick={() => handleActivar(practicante.id)}
                    >
                      {practicante.activo ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h3>Cargando...</h3>
          )}
        </tbody>
      </table>
    </div>
  );
};
