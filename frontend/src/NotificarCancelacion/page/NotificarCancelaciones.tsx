import { Toaster } from "sonner";
import { NotificarCan } from "../components/NotificarCan";

export const NotificarCancelaciones = () => {
  return (
    <div className="w-full" style={{ overflowY: "auto" }}>
      <Toaster position="top-right" richColors closeButton />
      <NotificarCan />
    </div>
  );
};
