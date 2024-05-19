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
import { SolicitudD } from "../interfaces/Solicitud";

export const TodasSol = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudD[]>([]);

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/nombre_usuario/Vladimir Abel`
    );
    setSolicitudes(respuesta.data);
    console.log(respuesta.data);
  };

  return (
    <div className="contenedor-table my-8 text-center">
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        HISTORIAL DE RESERVAS
      </label>
        <Table className="custom-table" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Ambiente
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Docente
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Materia
            </TableColumn>
             <TableColumn className="text-center text-3xl bg-slate-300">
                H. Inicio
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
                H. Final
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
                  {solicitud.solicitud.ambiente.nombre}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.materia.user.name}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.materia.nombre_materia}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.periodos[0].periodo.horario.hora_inicio}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.periodos[solicitud.periodos.length-1].periodo.horario.hora_fin}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.periodos[0].periodo.fecha}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.numero_estudiantes}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.estado}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
};
