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
    <div className="mx-6 my-2 mt-10 sm:mx-auto w-full max-w-screen-md">
      <Table
        className="custom-table"
        aria-label="Example table with dynamic content"
      >
        <TableHeader>
          <TableColumn className="text-center  text-sm bg-slate-300">
            NOMBRE
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            APELLIDOS
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            TELEFONO
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            EMAIL
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            CÓDIGO SIS
          </TableColumn>
        </TableHeader>
        <TableBody>
          {solicitudes.map((solicitud) => (
            <TableRow key={solicitud.id}>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.name}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.apellidos}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.telefono}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.email}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {solicitud.codigo_sis}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
