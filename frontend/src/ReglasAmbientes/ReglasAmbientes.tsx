import { Toaster } from "sonner";
import { FormReglas } from "./components/formReglas";
import { ListaGestiones } from "./components/ListaGestiones";
import { useState } from "react";
export const ReglasAmbientes = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="sm:mt-10 sm:mx-10 w-full sm:max-w-6xl flex">
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />
      <div className=" sm:flex w-full px-3">
        <div className="sm:w-1/3">
          <FormReglas actualizar={handleRefresh} />
        </div>
        <div className="sm:m-10 sm:w-2/3">
          <ListaGestiones refresh={refresh} />
        </div>
      </div>
    </div>
  );
};
