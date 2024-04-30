import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
//import "./tabla.css";
import { ISimpleSolicitud } from "../interfaces/simple-solicitud";

interface Props {
  solicitudes: ISimpleSolicitud[];
}
export const TablaSolicitudes = ({ solicitudes }: Props) => {
  console.log("Solicitudes de mi tabla");
  console.log(solicitudes);
  return (
    <div className=" contenedor-table ">
      <label className='ml-10 text-3xl font-bold text-center text-gray-900'>SOLICITUDES</label>
      <section className="mx-6 my-4  ">
        <Table
          className="custom-table"
          aria-label="Example table with dynamic content"
        >
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Id
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Nombre
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Ubicacion
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Capaci
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Tipo
            </TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell className=" text-base">{solicitud.id}</TableCell>
                <TableCell className=" text-base">{solicitud.motivo}</TableCell>
                <TableCell className=" text-base">
                  {solicitud.ambiente.ubicacion}
                </TableCell>
                <TableCell className=" text-base">
                  {solicitud.hora_inicio}
                </TableCell>
                <TableCell className="text-base">{solicitud.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
