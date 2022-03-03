import { types } from "../types/types";
import { api } from "../helpers/posts";
import Swal from "sweetalert2";

export const startNewPrac = (
  nombre,
  apellidos,
  genero,
  correo,
  telefono,
  horario
) => {
  return async (dispacth) => {
    try {
      const data = await api.post(
        "https://catalogo-de-practicantes-back.herokuapp.com/api/practicantes/",
        {
          nombre,
          apellidos,
          genero,
          correo,
          telefono,
          horario,
        }
      );
      Swal.fire("Listo", "Los campos fueron llenados correctamente", "success");
      dispacth(newPrac(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const newPrac = (practicante) => ({
  type: types.newPrac,
  payload: practicante,
});

export const editPrac = (
  id,
  nombre,
  apellidos,
  genero,
  correo,
  telefono,
  horario
) => {
  return async () => {
    try {
      const data = await api.put(
        `https://catalogo-de-practicantes-back.herokuapp.com/api/practicantes/${id}`,
        {
          nombre,
          apellidos,
          genero,
          correo,
          telefono,
          horario,
        }
      );
      Swal.fire("Listo", "Los campos fueron editados correctamente", "success");
    } catch (error) {
      Swal.fire("Error", toString(error), "error");
    }
  };
};

export const activar = (id) => {
  return async () => {
    try {
      const data = await api.delete(
        `https://catalogo-de-practicantes-back.herokuapp.com/api/practicantes/${id}`,
        {}
      );
      Swal.fire("Listo", "El estado activo cambio", "success");
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGetPrac = () => {
  return async (dispatch) => {
    try {
      const data = await api
        .get(
          "https://catalogo-de-practicantes-back.herokuapp.com/api/practicantes"
        )
        .then(({ data }) => data)
        .catch();
      dispatch(getPracs(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const getPracs = (practicantes) => ({
  type: types.getPracs,
  payload: practicantes,
});

export const startGetDatos = (id) => {
  return async (dispatch) => {
    try {
      const data = await api
        .get(
          `https://catalogo-de-practicantes-back.herokuapp.com/api/practicantes/${id}`
        )
        .then(({ data }) => data)
        .catch();
      dispatch(getDatos(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDatos = (practicantes) => ({
  type: types.getPracs,
  payload: practicantes,
});