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
    <div className="mt-10 mx-10 sm:w-full sm:max-w-6xl flex">
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />
      <div className=" flex w-full">
        <div className="w-1/3">
          <FormularioFeriado actualizar={handleRefresh} />
        </div>
        <div className="m-10 w-2/3">
          <ListaFeriados refresh={refresh} />
        </div>
      </div>
    </div>
  );
};
