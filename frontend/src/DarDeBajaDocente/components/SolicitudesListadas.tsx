import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from "@nextui-org/react";
import "./estilosBusq.css";
import { ISimpleDocente } from "../interfaces/simple-deocente";
import { useState } from "react";

interface Props {
  solicitudes: ISimpleDocente[];
}

export const TablaSolicitudes = ({ solicitudes }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Puedes ajustar este valor según tus necesidades

  // Calculate total number of pages
  const totalPages = Math.ceil(solicitudes.length / itemsPerPage);

  // Get current items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSolicitudes = solicitudes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-6 my-4 mt-10 sm:mx-auto w-full max-w-screen-md">
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
          <TableColumn className="text-center text-sm bg-slate-300">
            OPCION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {currentSolicitudes.map((solicitud) => (
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
              <TableCell>
                <Button>Deshabilitar</Button>
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
    </div>
  );
};
