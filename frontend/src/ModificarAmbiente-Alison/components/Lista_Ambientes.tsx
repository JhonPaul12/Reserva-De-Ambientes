import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

import { useAmbienteStore } from "../store/Ambientes.store";
import { useEffect } from "react";

export const Lista_Ambientes = () => {
  const ambientes = useAmbienteStore((state) => state.ambientes);
  const getAmbientes = useAmbienteStore((state) => state.getAmbientes);

  useEffect(() => {
    const fetchAmbientes = async () => {
      await getAmbientes();
    };

    fetchAmbientes();
  }, [getAmbientes]);

  return (
    <div>
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        LISTA DE AMBIENTES
      </label>
      <section className="mx-6 my-4  ">
        <Table
          className="custom-table"
          aria-label="Example table with dynamic content"
        >
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Nombre
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Tipo
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Capacidad
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody>
            {ambientes.map((ambiente) => (
              <TableRow key={ambiente.id}>
                <TableCell className=" text-base">{ambiente.nombre}</TableCell>
                <TableCell className="text-base">{ambiente.tipo}</TableCell>
                <TableCell className=" text-base">
                  {ambiente.capacidad}
                </TableCell>
                <TableCell>
                  <Button>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
