import { Toaster } from "sonner";
import { TablaSolicitudes } from "./components/SolicitudesListadas";

export const DarDeBaja = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full">
      <Toaster position="top-right" richColors closeButton />
      <TablaSolicitudes />
    </div>
  );
};
