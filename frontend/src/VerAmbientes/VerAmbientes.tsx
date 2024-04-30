import React, { useState, useEffect } from "react";
import { useAmbienteStore } from "./store/Ambientes.store";
import { TablaAmbientes } from "./components/TablaAmbientes";

export const VerAmbientes = () => {
  const ambientes = useAmbienteStore((state) => state.ambientes);
  const getAmbientes = useAmbienteStore((state) => state.getAmbientes);

  // Estados para almacenar los valores de los filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCapacidad, setFiltroCapacidad] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  useEffect(() => {
    const fetchAmbientes = async () => {
      if (ambientes.length === 0) await getAmbientes();
    };

    fetchAmbientes();
  }, [ambientes, getAmbientes]);

  // Funciones para manejar cambios en los filtros
  const handleFiltroNombreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiltroNombre(event.target.value);
  };

  const handleFiltroCapacidadChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiltroCapacidad(event.target.value);
  };

  const handleFiltroTipoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFiltroTipo(event.target.value);
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

  return (
    <div className="text-negro w-full m-10">
      <div className="flex flex-row justify-center items-center my-10">
        {/* Componentes de filtros */}
        <div className="mb-4 mx-4 ">
          <label htmlFor="filtroNombre" className="block text-gray-700">
            Filtrar por nombre:
          </label>
          <input
            type="text"
            id="filtroNombre"
            value={filtroNombre}
            onChange={handleFiltroNombreChange}
            className="mt-3 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 mx-4">
          <label htmlFor="filtroCapacidad" className="block text-gray-700">
            Filtrar por capacidad:
          </label>
          <input
            type="number"
            id="filtroCapacidad"
            value={filtroCapacidad}
            onChange={handleFiltroCapacidadChange}
            className="mt-3 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 mx-4">
          <label htmlFor="filtroTipo" className="block text-gray-700">
            Filtrar por tipo:
          </label>
          <select
            id="filtroTipo"
            value={filtroTipo}
            onChange={handleFiltroTipoChange}
            className="mt-3 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Todos</option>
            <option value="Aula">Aula</option>
            <option value="Laboratorio">Laboratorio</option>
            <option value="Multifuncional">Multifuncional</option>
          </select>
        </div>
      </div>
      {/* Tabla de ambientes con datos filtrados */}
      <TablaAmbientes ambientes={ambientesFiltrados} />
    </div>
  );
};
