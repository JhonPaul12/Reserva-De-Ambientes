import React, { useState, useEffect } from "react";

interface Option {
  id: string;
  nombre: string;
}

interface ListaAmbientesProps {
  onSelectChange: (selectedValue: string) => void;
}

export const ListaAmbientes: React.FC<ListaAmbientesProps> = ({
  onSelectChange,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ambiente")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de elementos:", error);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <div className="mt-8">
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
    </div>
  );
};
