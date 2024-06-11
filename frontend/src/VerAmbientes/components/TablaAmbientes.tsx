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
    <div className="mt-4 sm:mx-auto w-full max-w-screen-md">
      <section className="mx-6 my-4  ">
        <Table
          className="custom-table"
          aria-label="Example table with dynamic content"
        >
          <TableHeader>
            {/* <TableColumn className="text-center text-sm bg-slate-300">
              ID
            </TableColumn> */}
            <TableColumn className="text-center text-sm bg-slate-300">
              NOMBRE
            </TableColumn>
            <TableColumn className="text-center text-sm bg-slate-300">
              UBICACIÓN
            </TableColumn>
            <TableColumn className="text-center text-sm bg-slate-300">
              CAPACIDAD
            </TableColumn>
            <TableColumn className="text-center text-sm bg-slate-300">
              TIPO
            </TableColumn>
          </TableHeader>
          <TableBody>
            {ambientes.map((ambiente) => (
              <TableRow key={ambiente.id}>
                {/* <TableCell className=" text-xs">{ambiente.id}</TableCell> */}
                <TableCell className=" text-xs">{ambiente.nombre}</TableCell>
                <TableCell className=" text-xs">{ambiente.ubicacion}</TableCell>
                <TableCell className=" text-xs">{ambiente.capacidad}</TableCell>
                <TableCell className="text-xs">{ambiente.tipo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
