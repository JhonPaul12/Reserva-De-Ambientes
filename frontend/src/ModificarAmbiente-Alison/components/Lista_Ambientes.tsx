import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { useAmbienteStore } from "../store/Ambientes.store";
import { useEffect } from "react";
import { EditPeriodosModal } from "./EditPeriodosModal";
import { EditAmbienteModal } from "./EditAmbienteModal";

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
    <div className="text-center">
      <label className="ml-10 text-4xl font-bold text-gray-900">
        EDITAR AMBIENTES
      </label>
      <section style={{ margin: "5% 15%" }}>
        <Table
        hideHeader 
          className="custom-table"
          aria-label="Example table with dynamic content"
        >
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Ambiente
            </TableColumn>
            <TableColumn className="text-center mx-10 text-3xl bg-slate-300">
              Periodos
            </TableColumn>
            <TableColumn className=" text-center text-3xl bg-slate-300">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody>
            {ambientes.map((ambiente) => (
              <TableRow key={ambiente.id}>
                <TableCell className=" text-xl">{ambiente.nombre}</TableCell>
                <TableCell className=" text-base">
                  <EditPeriodosModal ambiente={ambiente} />
                </TableCell>
                <TableCell>
                  <EditAmbienteModal ambiente={ambiente}/>
                  {/*<DeleteAmbienteModal ambiente={ambiente}/>*/}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
