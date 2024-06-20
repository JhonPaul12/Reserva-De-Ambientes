import { useEffect, useState } from "react";
import { TablaSolicitudes } from "./SolicitudesListadas";
import axios from "axios";
import { ISimpleDocente } from "../interfaces/simple-deocente";
import { Pagination, Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

export const ListaReservas = () => {
  const [solicitudes, setSolicitudes] = useState<ISimpleDocente[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9; // Puedes ajustar este valor según tus necesidades

  useEffect(() => {
    const fetchSolicitudes = async () => {
      if (solicitudes.length === 0) await getSolicitudes();
    };

    fetchSolicitudes();
  }, [solicitudes]);

  const getSolicitudes = async () => {
    // const respuesta = await axios.get(
    //   `http://127.0.0.1:8000/api/usuario/docentes`
    // );

    const respuesta = await axios.get(
      import.meta.env.VITE_API_URL + "/api/usuario/docentes"
    );
    console.log(respuesta.data);
    setSolicitudes(respuesta.data);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(solicitudes.length / itemsPerPage);

  // Get current items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSolicitudes = solicitudes
    .filter((solicitud) =>
      solicitud.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="mx-6 my-2 text-center text-negro">
      <label className="text-4xl font-bold text-gray-900">
        LISTA DE DOCENTES
      </label>

      {/* Filtro de búsqueda */}
      <div className="mt-4  w-1/2 mx-auto flex items-center">
        <FaSearch />
        <Input
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="ml-2"
        />
      </div>
      <TablaSolicitudes solicitudes={currentSolicitudes} />
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
