import React, { useState, useEffect } from "react";
import { useAmbienteStore } from "./store/Ambientes.store";
import { TablaAmbientes } from "./components/TablaAmbientes";
import { Input, Select, SelectItem } from "@nextui-org/react";

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
      <div className="flex flex-row justify-center items-center my-4">
        {/* Componentes de filtros */}
        <div className="mb-3 mx-4 ">
          <label htmlFor="filtroNombre" className="block text-gray-700 text-bold">
            <b> Filtrar por nombre: </b>
          </label>
          <Input
            type="text"
            id="filtroNombre"
            value={filtroNombre}
            onChange={handleFiltroNombreChange}
            placeholder="Ej: 691A"
            className="mt-3 block"
            style={{
              fontSize: "15px",
              padding: "10px",
            }}
          />
        </div>
        <div className="mb-3 mx-4">
          <label htmlFor="filtroCapacidad" className="block text-gray-700 text-bold">
            <b>Filtrar por capacidad:</b>
          </label>
          <Input
            type="number"
            id="filtroCapacidad"
            value={filtroCapacidad}
            placeholder="Ej:100"
            onChange={handleFiltroCapacidadChange}
            className="mt-3 block w-full "
            style={{
              fontSize: "15px",
              padding: "10px",
            }}
          />
        </div>
        <div className="mb-3 mx-4">
          <label htmlFor="filtroTipo" className="block text-gray-700 text-bold">
            <b>Filtrar por tipo:&nbsp; &nbsp; &nbsp; &nbsp;</b>
          </label>
          <Select
            id="filtroTipo"
            value={filtroTipo}
            onChange={handleFiltroTipoChange}
            placeholder="Todos"
            className="mt-3 block w-full "
            style={{
              fontSize: "15px",
              padding: "10px",
            }}
          >
            <SelectItem key={""} value="">Todos</SelectItem>
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
      <TablaAmbientes ambientes={ambientesFiltrados} />
    </div>
  );
};
