import { useState, useEffect } from "react";
import { useAmbienteStore } from "./store/Ambientes.store";
import { TablaAmbientes } from "./components/TablaAmbientes";
import { Input, Select, SelectItem, Pagination } from "@nextui-org/react";

export const VerAmbientes = () => {
  const ambientes = useAmbienteStore((state) => state.ambientes);
  const getAmbientes = useAmbienteStore((state) => state.getAmbientes);

  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCapacidad, setFiltroCapacidad] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchAmbientes = async () => {
      if (ambientes.length === 0) await getAmbientes();
    };

    fetchAmbientes();
  }, [ambientes, getAmbientes]);

  const handleFiltroNombreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiltroNombre(event.target.value);
    setCurrentPage(1);
  };

  const handleFiltroCapacidadChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiltroCapacidad(event.target.value);
    setCurrentPage(1);
  };

  const handleFiltroTipoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFiltroTipo(event.target.value);
    setCurrentPage(1);
  };

  // Filtrar ambientes según los filtros
  const ambientesFiltrados = ambientes.filter((ambiente) => {
    const nombreMatch = ambiente.nombre
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());
    const capacidadMatch =
      filtroCapacidad === "" || ambiente.capacidad >= parseInt(filtroCapacidad);
    const tipoMatch =
      filtroTipo === "" ||
      ambiente.tipo.toLowerCase() === filtroTipo.toLowerCase();
    return nombreMatch && capacidadMatch && tipoMatch;
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(ambientesFiltrados.length / itemsPerPage);

  // Get the items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAmbientes = ambientesFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="text-negro w-full text-center mt-2">
      <label className="text-xl sm:text-3xl font-bold text-gray-900">
        LISTA DE AMBIENTES
      </label>
      <div className="flex flex-row justify-center items-center mt-2 sm:mt-10">
        <div className="text-xs sm:text-xl mb-3 sm:mx-4 ">
          <label
            htmlFor="filtroNombre"
            className="block text-gray-700 text-bold"
          >
            <b> Filtrar por nombre: </b>
          </label>
          <Input
            type="text"
            id="filtroNombre"
            value={filtroNombre}
            onChange={handleFiltroNombreChange}
            placeholder="Ej: 691A"
            className="mt-3 block w-24 sm:w-48 lg:w-64"
            aria-label="Filtrar por nombre"
          />
        </div>
        <div className="mb-3 sm:mx-4 text-xs sm:text-xl">
          <label
            htmlFor="filtroCapacidad"
            className="block text-gray-700 text-bold"
          >
            <b>Filtrar por capacidad:</b>
          </label>
          <Input
            type="number"
            id="filtroCapacidad"
            value={filtroCapacidad}
            placeholder="Ej:100"
            onChange={handleFiltroCapacidadChange}
            className="mt-3 block mx-7 sm:mx-0 w-24 sm:w-48 lg:w-64 "
            aria-label="Filtrar por capacidad"
          />
        </div>
        <div className="mb-3 sm:mx-4 text-xs sm:text-xl">
          <label htmlFor="filtroTipo" className="block text-gray-700 text-bold">
            <b>Filtrar por tipo:&nbsp; &nbsp; &nbsp; &nbsp;</b>
          </label>
          <Select
            id="filtroTipo"
            value={filtroTipo}
            onChange={handleFiltroTipoChange}
            placeholder="Todos"
            className="mt-3 block w-24 sm:w-48 lg:w-64"
            aria-label="Filtrar por tipo"
          >
            <SelectItem key={""} value="">
              Todos
            </SelectItem>
            <SelectItem key={"Multifuncional"} value="Multifuncional">
              Multifuncional
            </SelectItem>
            <SelectItem key={"Aula"} value="Aula">
              Aula
            </SelectItem>
            <SelectItem key={"Laboratorio"} value="Laboratorio">
              Laboratorio
            </SelectItem>
          </Select>
        </div>
      </div>
      {/* Tabla de ambientes con datos filtrados */}
      <TablaAmbientes ambientes={currentAmbientes} />
      {/* Pagination component */}
      <div className="flex justify-center mt-4">
        <Pagination
          showControls
          key={totalPages}
          total={totalPages}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
