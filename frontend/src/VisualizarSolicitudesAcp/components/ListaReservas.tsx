import { useEffect, useState } from "react";
import { TablaSolicitudes } from "./SolicitudesListadas";
import axios from "axios";
import { ISimpleDocente } from "../interfaces/simple-deocente";

export const ListaReservas = () => {
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
  }

  const solicitudesOrdenAlfabetico = [...solicitudes].sort((a, b) =>
    a.name.localeCompare(b.name)
);

/*
  const solicitudesFiltrados = solicitudes.filter((solicitud) => {
    console.log(estado);
    const estadoMatch = solicitud.nombre ? solicitud.nombre.includes(estado) : false;
    return estadoMatch;
  });*/

  return (
    <div className=" contenedor-table ">
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        LISTA DE DOCENTES{" "}
      </label>
      {/*<div className="flex flex-row  justify-center items-center my-10">
        <div className="mb-4 mx-4 ">
          <label className="ml-10 text-1xl font-bold text-center text-gray-900">
            Nombre:
          </label>
          <input
            id="estado"
            value={estado}
            onChange={onInputChangeFilter}
            className="mt-3 text-gray-900 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
          >
          </input>
        </div>
  </div>*/}
      <TablaSolicitudes solicitudes={solicitudesOrdenAlfabetico} />
    </div>
  );
};
