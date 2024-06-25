import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ModificarDocenteModal } from "./ModificarDocenteModal";
import { Pagination } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@nextui-org/react";

interface Docente {
  id: number;
  name: string;
  apellidos: string;
  telefono: string;
  email: string;
  codigo_sis: string;
}

export const ListaDocentes = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5; // Puedes ajustar este valor según tus necesidades

  const fetchDocentes = async () => {
    try {
      // const response = await fetch(
      //   "http://127.0.0.1:8000/api/usuario/docentes"
      // );
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/usuario/docentes"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDocentes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  const handleDocenteUpdate = async () => {
    await fetchDocentes(); // Actualizar la lista de docentes
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(docentes.length / itemsPerPage);

  // Get current items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocentes = docentes
    .filter((docente) =>
      docente.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, startIndex + itemsPerPage);

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search term change
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="mx-6 mt-4 mx-auto w-full max-w-screen-md">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Editar Docentes
      </h2>
      <div className="mt-4 mb-4 w-1/2 mx-auto flex items-center">
        <FaSearch />
        <Input
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="ml-2"
        />
      </div>
      <Table
        className="custom-table"
        aria-label="Example table with dynamic content"
      >
        <TableHeader>
          <TableColumn className="text-center text-sm bg-slate-300">
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
            ACCIONES
          </TableColumn>
        </TableHeader>
        <TableBody>
          {currentDocentes.map((docente) => (
            <TableRow key={docente.id}>
              <TableCell className="text-gray-900 text-xs">
                {docente.name}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {docente.apellidos}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {docente.telefono}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {docente.email}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                {docente.codigo_sis}
              </TableCell>
              <TableCell className="text-gray-900 text-xs">
                <ModificarDocenteModal
                  docente={docente}
                  onDocenteUpdate={handleDocenteUpdate}
                />
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
