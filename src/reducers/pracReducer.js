import { types } from "../types/types";

const initialState = {
  practicantes: {
    // nombres: "",
    // apellidos: "",
    // genero: "",
    // correo: "",
    // numTel: "",
    // CLABE: "",
    // horario: "",
    // fechaNac: "",
    // activo: true,
  },
};

export const pracReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.newPrac:
      return {
        ...state,
        practicantes: [...state.practicantes, action.payload],
      };

    case types.editPrac:
      return {
        ...state,
        practicantes: state.practicantes.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case types.activarPrac:
      return {
        ...state,
        practicantes: state.practicantes.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case types.getPracs:
      return {
        ...state,
        practicantes: action.payload,
      };

    case types.getDatos:
      return {
        ...state,
        practicantes: action.payload,
      };

    default:
      return state;
  }
};
