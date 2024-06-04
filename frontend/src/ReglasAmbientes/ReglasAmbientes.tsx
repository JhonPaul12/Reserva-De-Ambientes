import { Toaster } from "sonner";
import { FormReglas } from "./components/formReglas";
export const ReglasAmbientes = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />
      <FormReglas />
    </div>
  );
};
