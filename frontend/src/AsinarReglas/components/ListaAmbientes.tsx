import React, { useState, useEffect } from "react";

interface Option {
  id: string;
  nombre: string;
}

interface ListaAmbientesProps {
  onSelectChange: (selectedValue: string) => void;
  reset: boolean;
}

export const ListaAmbientes: React.FC<ListaAmbientesProps> = ({
  onSelectChange,
  reset,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/ambiente/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
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
      {/* <button
        onClick={resetSelection}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Restablecer
      </button> */}
    </div>
  );
};
