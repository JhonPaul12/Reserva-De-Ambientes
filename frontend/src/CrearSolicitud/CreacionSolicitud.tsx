import { Toaster } from "sonner";
import { FormOrdenado } from "./components/FormOrdenado";

export const CreacionSolicitud = () => {
  return (
    <div className="mt-10 sm:mx-auto w-4/5 max-w-screen-md">
      <Toaster position="top-right" richColors closeButton />
      <FormOrdenado />
    </div>
  );
};
