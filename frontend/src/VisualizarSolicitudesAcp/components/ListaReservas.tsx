
import { useSolicitudStore } from "../store/solicitud.store";
import { useEffect, useState } from "react";
import { TablaSolicitudes } from "./SolicitudesListadas";

export const ListaReservas = () => {
  const solicitudes = useSolicitudStore((state) => state.solicitudes);
  const getSolicitudes = useSolicitudStore((state) => state.getSolicitudes);

  const [estado, setEstado] = useState('');


  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (solicitudes.length === 0) await getSolicitudes();
    };

    fetchSolicitudes();
  }, [solicitudes, getSolicitudes]);

  const onInputChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target as HTMLSelectElement;
    setEstado(inputValue.value);
  }

  const solicitudesFiltrados = solicitudes.filter((solicitud) => {
    console.log(estado);
    const estadoMatch = solicitud.estado.includes(estado);
    return estadoMatch
  });

  
  return (
    <div className=" contenedor-table ">
      <label className='ml-10 text-3xl font-bold text-center text-gray-900'>FILTRO DE SOLICITUDES POR ESTADO </label>
      <div className="flex flex-row  justify-center items-center my-10">
        <div className="mb-4 mx-4 ">
          <label className='ml-10 text-1xl font-bold text-center text-gray-900'>Estado:</label>
        <select
          id="estado"
          value={estado}
          onChange={onInputChangeFilter}
          className="mt-3 text-gray-900 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
        >
          <option value="">Seleccione tipo...</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Aceptado">Aceptado</option>
          <option value="Rechazado">Rechazado</option>
        </select>
        </div>
        
      </div>
        <TablaSolicitudes solicitudes={solicitudesFiltrados}/>
    </div>
  )
}
