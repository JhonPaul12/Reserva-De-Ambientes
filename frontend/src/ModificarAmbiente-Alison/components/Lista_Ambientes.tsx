import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

import { useAmbienteStore } from "../store/Ambientes.store";
import { useEffect, useState } from "react";
import { EditPeriodosModal } from "./EditPeriodosModal";
import { EditAmbienteModal } from "./EditAmbienteModal";

export const Lista_Ambientes = () => {
  const ambientes = useAmbienteStore((state) => state.ambientes);
  const getAmbientes = useAmbienteStore((state) => state.getAmbientes);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Puedes ajustar este valor según tus necesidades

  useEffect(() => {
    const fetchAmbientes = async () => {
      await getAmbientes();
    };

    fetchAmbientes();
  }, [getAmbientes]);

  // Calculate total number of pages
  const totalPages = Math.ceil(ambientes.length / itemsPerPage);

  // Get current items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAmbientes = ambientes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="text-center">
      <label className="ml-10 text-3xl sm:text-4xl font-bold text-gray-900">
        EDITAR AMBIENTES
      </label>
      <section className="mx-6 my-4 mt-10 mx-auto w-full max-w-screen-md">
        <Table
          className="custom-table"
          aria-label="Example table with dynamic content"
        >
          <TableHeader>
            <TableColumn className="text-center  text-sm bg-slate-300">
              Ambiente
            </TableColumn>
            <TableColumn className="text-center  text-sm bg-slate-300">
              Periodos
            </TableColumn>
            <TableColumn className=" text-center text-sm bg-slate-300">
              Acciones
            </TableColumn>
          </TableHeader>
          <TableBody>
            {currentAmbientes.map((ambiente) => (
              <TableRow key={ambiente.id}>
                <TableCell className="text-base" >
                  {ambiente.nombre}
                </TableCell>
                <TableCell className="text-base">
                  <EditPeriodosModal ambiente={ambiente} />
                </TableCell>
                <TableCell>
                  <EditAmbienteModal ambiente={ambiente} />
                  {/*<DeleteAmbienteModal ambiente={ambiente}/>*/}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination
            showControls
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
};
