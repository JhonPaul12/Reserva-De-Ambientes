import { Toaster } from "sonner";
import { ListaDocentes } from "./components/ListaDocentes";

export const ModificarDocentes = () => {
  return (
    <div className=" mx-auto w-full  text-negro ">
      <Toaster position="top-right" richColors closeButton />
      <ListaDocentes />
    </div>
  );
};
