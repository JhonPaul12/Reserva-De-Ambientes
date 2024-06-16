import { Toaster } from "sonner";
import { FormularioFeriado } from "./components/FormularioFeriado";

export const Feriados = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md text-negro text-center">
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />
      Registrar Feriados
      <FormularioFeriado />
    </div>
  );
};
