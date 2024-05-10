import { Toaster } from "sonner";
import { FormOrdenado } from "./components/FormOrdenado";

export const CreacionSolicitud = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Toaster
        position="top-right"
        richColors
        closeButton
      />
      <FormOrdenado />
    </div>
  );
};
