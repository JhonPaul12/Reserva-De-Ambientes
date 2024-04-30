import { Toaster } from "sonner";
import { FormSolicitud } from "./components/FormSolicitud";

export const CreacionSolicitud = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Toaster
        position="top-right"
        richColors
        closeButton
      />
      <FormSolicitud />
    </div>
  );
};
