import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ISimpleAmbiente } from "../interfaces/simple-ambientes";
import "./tabla.css";

interface Props {
  ambientes: ISimpleAmbiente[];
}
export const TablaAmbientes = ({ ambientes }: Props) => {
  return (
    <div className=" contenedor-table ">
      <label className='ml-10 text-3xl font-bold text-center text-gray-900'>LISTA DE AMBIENTES</label>
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
              Capacidad
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Tipo
            </TableColumn>
          </TableHeader>
          <TableBody>
            {ambientes.map((ambiente) => (
              <TableRow key={ambiente.id}>
                <TableCell className=" text-base">{ambiente.id}</TableCell>
                <TableCell className=" text-base">{ambiente.nombre}</TableCell>
                <TableCell className=" text-base">
                  {ambiente.ubicacion}
                </TableCell>
                <TableCell className=" text-base">
                  {ambiente.capacidad}
                </TableCell>
                <TableCell className="text-base">{ambiente.tipo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
