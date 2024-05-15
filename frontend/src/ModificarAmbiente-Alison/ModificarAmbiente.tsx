import { Toaster } from "sonner";
import { Lista_Ambientes } from "./components/Lista_Ambientes";
export const ModificarAmbiente = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full  text-negro">
      <Toaster position="top-right" richColors closeButton />
      <Lista_Ambientes />
    </div>
  );
};
