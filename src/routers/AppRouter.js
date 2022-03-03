import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CrearP } from "../components/CrearP";
import { DetallesP } from "../components/DetallesP";
import { EditarP } from "../components/EditarP";
import { ListadoP } from "../components/ListadoP";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<ListadoP />} />
          <Route path={"/crear"} element={<CrearP />} />
          <Route path={"/editar/:practicanteId"} element={<EditarP />} />
          <Route path={"/detalles/:practicanteId"} element={<DetallesP />} />
          <Route path={"/*"} element={<ListadoP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
