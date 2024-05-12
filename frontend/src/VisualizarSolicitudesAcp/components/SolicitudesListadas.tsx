import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
  } from "@nextui-org/react";
  import "./estilosBusq.css";
import { ISimpleSolicitud } from "../interfaces/simple-solicitud";
  
  interface Props {
    solicitudes: ISimpleSolicitud[];
  }
  export const TablaSolicitudes = ({ solicitudes }: Props) => {
    return (
      <div className=" contenedor-table ">
        <section className="mx-6 my-4  ">
          <Table
            className="custom-table"
            aria-label="Example table with dynamic content"
          >
            <TableHeader>
              <TableColumn className="text-center  text-3xl bg-slate-300">
                Id
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
                Docente
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
                Hora inicio
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
              Hora fin
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
                estado
              </TableColumn>
            </TableHeader>
            <TableBody>
              {solicitudes.map((solicitud) => (
                <TableRow key={solicitud.id}>
                  <TableCell className="text-gray-900 text-base">{solicitud.id}</TableCell>
                  <TableCell className="text-gray-900 text-base">{solicitud.id}</TableCell>
                  <TableCell className="text-gray-900 text-base">
                    {solicitud.hora_inicio}
                  </TableCell>
                  <TableCell className="text-gray-900 text-base">
                    {solicitud.hora_fin}
                  </TableCell>
                  <TableCell className="text-gray-900 text-base">{solicitud.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    );
  };