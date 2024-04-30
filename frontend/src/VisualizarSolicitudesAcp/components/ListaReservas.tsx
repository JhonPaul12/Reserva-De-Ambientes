import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
  } from "@nextui-org/react";
import { useSolicitudStore } from "../store/solicitud.store";
import { useEffect, useState } from "react";

export const ListaReservas = () => {
  const [datos, setDatos] = useState<any[]>([]);
  const solicitudes = useSolicitudStore((state) => state.solicitudes);
  const getSolicitudes = useSolicitudStore((state) => state.getSolicitudes);


  

  const fetchSolicitud = async () => {
      try {
    console.log(solicitudes.length);
    await getSolicitudes();
    const datosFiltrados = solicitudes.filter(solicitud => solicitud.estado === "Aceptado")
    setDatos(datosFiltrados); 
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
  };

  
  useEffect(() => {
    fetchSolicitud();
    console.log(solicitudes);
  }, []);
  
  
  return (
    <div className=" contenedor-table ">
      <label className='ml-10 text-3xl font-bold text-center text-gray-900'>SOLICITUDES ACEPTADAS</label>
      <section className="mx-6 my-4  ">
        <Table
          className="custom-table"
          aria-label="Example table with client side sorting"
        >
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Id
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
            Motivo
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
            Hora Inicio
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
            Hora Fin
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
            Estado
            </TableColumn>
          </TableHeader>
          <TableBody>
            {datos.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell className=" text-base text-black">{solicitud.id}</TableCell>
                <TableCell className=" text-base text-black ">{solicitud.motivo}</TableCell>
                <TableCell className=" text-base text-black">
                  {solicitud.hora_inicio}
                </TableCell>
                <TableCell className=" text-base text-black">
                  {solicitud.hora_fin}
                </TableCell>
                <TableCell className="text-base text-black">{solicitud.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
