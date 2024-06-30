// import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

interface Option {
  id: string;
  nombre: string;
}

interface GestionesAmbientesProps {
  onSelectChange: (selectedValue: string) => void;
}

export const GestionesAmbientes: React.FC<GestionesAmbientesProps> = ({
  onSelectChange,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/regla/")
      .then((response) => response.json())
      .then((data) => {
        // const opcionesActivas = data.filter(
        //   (opcion: { activa: number }) => opcion.activa === 1
        // );
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de elementos:", error);
      });
    console.log(import.meta.env.VITE_API_URL + "/regla/");
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <div className="mt-8 mx-auto flex flex-row">
      <label className="text-xl mx-4 text-gray-900 font-bold mt-1 ">
        Gestion:
      </label>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" className="text-gray-500">
          Selecciona una gestion
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
