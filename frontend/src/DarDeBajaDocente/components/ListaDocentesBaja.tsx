import { useEffect, useState } from "react";
import { TablaSolicitudes } from "./SolicitudesListadas";
import axios from "axios";
import { ISimpleDocente } from "../interfaces/simple-deocente";

export const ListaDocentesBaja = () => {
  const [solicitudes, setSolicitudes] = useState<ISimpleDocente[]>([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (solicitudes.length === 0) await getSolicitudes();
    };

    fetchSolicitudes();
  }, [solicitudes]);

  const getSolicitudes = async () => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/usuario/docentes`
    );
    console.log(respuesta.data);
    setSolicitudes(respuesta.data);
  };

  return (
    <div className=" contenedor-table text-center">
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        ELIMINAR DOCENTES{" "}
      </label>

      <TablaSolicitudes />
    </div>
  );
};

{
  /* <TablaSolicitudes solicitudes={solicitudesOrdenAlfabetico} /> */
}
