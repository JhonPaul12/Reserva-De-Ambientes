import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
  } from "@nextui-org/react";
  import "./estilosBusq.css";
import { ISimpleDocente } from "../interfaces/simple-deocente";
  
  interface Props {
    solicitudes: ISimpleDocente[];
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
                Nombre
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
                Apellidos
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
                Telefono
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
              Email
              </TableColumn>
              <TableColumn className="text-center text-3xl bg-slate-300">
              Código SIS
              </TableColumn>
            </TableHeader>
            <TableBody>
              {solicitudes.map((solicitud) => (
                <TableRow key={solicitud.id}>
                  <TableCell className="text-gray-900 text-base">{solicitud.name}</TableCell>
                  <TableCell className="text-gray-900 text-base">{solicitud.apellidos}</TableCell>
                  <TableCell className="text-gray-900 text-base">
                    {solicitud.telefono}
                  </TableCell>
                  <TableCell className="text-gray-900 text-base">
                    {solicitud.email}
                  </TableCell>
                  <TableCell className="text-gray-900 text-base">{solicitud.codigo_sis}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    );
  };