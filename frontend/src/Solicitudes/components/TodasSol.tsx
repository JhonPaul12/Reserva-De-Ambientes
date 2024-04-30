import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
  } from "@nextui-org/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { Solicitud } from "../interfaces/Solicitud";
  


export const TodasSol = () => {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  
    useEffect(()=>{
      getSolicitudes();
    }, []);
  
    const getSolicitudes = async () => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/showAllDocentes/Leticia`);
      setSolicitudes(respuesta.data)
      console.log(respuesta.data)
    }

  return (
    <div className="contenedor-table">
      <label className='ml-10 text-3xl font-bold text-center text-gray-900'>HISTORIAL DE SOLICITUDES </label>
      <section className="mx-6 my-4">
        <Table className="custom-table" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Ambiente
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Docente
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Hora Inicio
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Hora Final
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Fecha
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Nro. Est.
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Estado
            </TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow>
                <TableCell className="text-base text-black">
                  {solicitud.ambiente.nombre}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.docente.nombre+" "+solicitud.docente.apellido}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.hora_inicio}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.hora_fin}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.fecha_solicitud}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.numero_estudiantes}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.estado}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
