// FormReglas.js
import { Select, SelectItem } from "@nextui-org/react";
import { Calendario } from "./Calendario";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const data = [
  {
    value: "1",
    label: "Primer semestre",
  },
  {
    value: "2",
    label: "Segundo semestre",
  },
  {
    value: "3",
    label: "Invierno",
  },
  {
    value: "4",
    label: "Verano",
  },
];

export const FormReglas = () => {
  const [selectedRegla, setSelectedRegla] = useState<string | null>(null);
  const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(null);
  const [fechaFinal, setFechaFinal] = useState<Dayjs | null>(null);
  const [selectKey, setSelectKey] = useState(0);

  const guardarFechaInicio = (value: Dayjs | null) => {
    setFechaInicio(value);
  };

  const guardarFechaFinal = (value: Dayjs | null) => {
    setFechaFinal(value);
    if (fechaInicio && value) {
      const diffMonths = value.diff(fechaInicio, "month");
      if (diffMonths > 5) {
        console.log("La diferencia es mayor a 6 meses");
      } else {
        console.log("La diferencia es menor a 6 meses");
      }
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRegla(event.target.value as string);
    const currentYear = dayjs().year();
    if (event.target.value === "1") {
      // Primer semestre
      setFechaInicio(dayjs(`${currentYear}-01-01`));
      setFechaFinal(dayjs(`${currentYear}-06-30`));
    } else if (event.target.value === "2") {
      // Segundo semestre
      setFechaInicio(dayjs(`${currentYear}-07-01`));
      setFechaFinal(dayjs(`${currentYear}-12-31`));
    } else if (event.target.value === "3") {
      // Invierno
      setFechaInicio(dayjs(`${currentYear}-12-01`));
      setFechaFinal(dayjs(`${currentYear}-12-31`));
    } else if (event.target.value === "4") {
      // Verano
      setFechaInicio(dayjs(`${currentYear}-06-01`));
      setFechaFinal(dayjs(`${currentYear}-06-30`));
    }
  };

  const guardarRegla = async () => {
    if (!selectedRegla || !fechaInicio || !fechaFinal) {
      console.log("Por favor, seleccione una regla y fechas válidas");
      return;
    }

    const reglaData = {
      nombre: data[Number(selectedRegla) - 1].label,
      fecha_inicial: fechaInicio.format("YYYY-MM-DD"),
      fecha_final: fechaFinal.format("YYYY-MM-DD"),
      activa: 0,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/regla/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reglaData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la regla");
      }

      const result = await response.json();
      console.log("Regla guardada exitosamente:", result);
      cancelar();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancelar = () => {
    setSelectedRegla(null);
    setFechaInicio(null);
    setFechaFinal(null);
    setSelectKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="mt-10">
      <h1>Formulario de Reglas</h1>
      <form className="flex flex-col items-center space-y-4">
        <Select
          key={selectKey}
          items={data}
          label="Seleccione una gestion"
          placeholder=""
          className="max-w-xs"
          onChange={handleSelectChange}
        >
          {(data) => <SelectItem key={data.value}>{data.label}</SelectItem>}
        </Select>
        <Calendario
          initialDate={fechaInicio}
          onDateChange={guardarFechaInicio}
        />
        <Calendario initialDate={fechaFinal} onDateChange={guardarFechaFinal} />
        <div className="flex space-x-4">
          <Button onClick={guardarRegla} className="bg-primary text-white">
            Registrar
          </Button>
          <Button onClick={cancelar} className="bg-primary text-white">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormReglas;
