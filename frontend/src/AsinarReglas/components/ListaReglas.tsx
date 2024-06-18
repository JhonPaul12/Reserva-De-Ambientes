// import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

interface Option {
  id: string;
  nombre: string;
}

interface ListaReglasProps {
  onSelectChange: (selectedValue: string) => void;
  reset: boolean;
}

export const ListaReglas: React.FC<ListaReglasProps> = ({
  onSelectChange,
  reset,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

  console.log(import.meta.env.VITE_API_URL + "/regla/");
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/regla/")
      .then((response) => response.json())
      .then((data) => {
        const opcionesActivas = data.filter(
          (opcion: { activa: number }) => opcion.activa === 1
        );
        setOptions(opcionesActivas);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de elementos:", error);
      });
  }, []);

  useEffect(() => {
    resetSelection();
  }, [reset]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectChange(selectedValue);
  };

  const resetSelection = () => {
    setSelectedOption("");
  };

  return (
    <div className="mt-8 mx-auto">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" className="text-gray-500">
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nombre}
          </option>
        ))}
      </select>
      {/* <Button
        onClick={() => setSelectedOption("")}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        Limpiar
      </Button> */}
    </div>
  );
};
