import { Toaster } from "sonner";
import { FormularioFeriado } from "./components/FormularioFeriado";
import { ListaFeriados } from "./components/ListaFeriados";
import { useState } from "react";

export const Feriados = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <div className="sm:mt-10 sm:mx-10 mx-auto w-full sm:max-w-6xl flex">
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />
      <div className=" sm:flex w-full">
        <div className="sm:w-1/3">
          <FormularioFeriado actualizar={handleRefresh} />
        </div>
        <div className="sm:m-10 sm:w-2/3">
          <ListaFeriados refresh={refresh} />
        </div>
      </div>
    </div>
  );
};
