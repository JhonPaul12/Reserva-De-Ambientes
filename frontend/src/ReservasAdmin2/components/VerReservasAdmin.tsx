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
  import { IReservaA } from "../interface/IReservaA";
  
  export const VerReservaAdmin = () => {
    const [solicitudes, setSolicitudes] = useState<IReservaA[]>([]);
    const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
  
    useEffect(() => {
      getSolicitudes();
    }, []);
  
    const getSolicitudes = async () => {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/periodoSolicitud2`);
      setSolicitudes(respuesta.data);
      console.log(respuesta.data);
    };
  
    const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFiltroEstado(e.target.value);
    };
  
    const solicitudesFiltradas = solicitudes.filter((solicitud) => {
      if (filtroEstado === "Todos") return true;
      return solicitud.solicitud.estado === filtroEstado;
    });
    
    return (
      <div className="contenedor-table my-8 text-center">
        <label className="ml-10 text-3xl font-bold text-center text-gray-900">
          HISTORIAL DE RESERVAS
        </label>
        <section className="mx-6 my-4">
          <div className="flex justify-start p-2">
            <label htmlFor="filtroEstado" className="mr-2 text-lg text-black">
              Filtrar por estado:
            </label>
            <select
              id="filtroEstado"
              className="p-2 border border-gray-300 rounded text-black"
              value={filtroEstado}
              onChange={handleEstadoChange}
            >
              <option className="mr-2 text-lg text-black" value="Todos">
                Todos
              </option>
              <option className="mr-2 text-lg text-black" value="Aceptado">
                Aceptado
              </option>
              <option className="mr-2 text-lg text-black" value="Cancelado">
                Cancelado
              </option>
              <option className="mr-2 text-lg text-black" value="Rechazado">
                Rechazado
              </option>
            </select>
          </div>
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
              {solicitudesFiltradas.map((solicitud) => (
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
        </section>
      </div>
    );
  };
  