import { Toaster } from "sonner";
import { CancelarReservaA } from "../components/CancelarReservaA";

export const CancelarReservasAdmin = () => {
  return (
    <div className="w-full" style={{ overflowY: "auto" }}>
      <Toaster position="top-right" richColors closeButton />
      <CancelarReservaA />;
    </div>
  );
};
