import { Toaster } from "sonner";
import { TablaSolicitudes } from "./components/SolicitudesListadas";

export const DarDeBaja = () => {
  return (
    <div className="mt-10 mx-auto w-full">
      <Toaster position="top-right" richColors closeButton />
      <TablaSolicitudes />
    </div>
  );
};
