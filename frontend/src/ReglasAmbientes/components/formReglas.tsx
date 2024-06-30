// FormReglas.js
import { Select, SelectItem } from "@nextui-org/react";
import { Calendario } from "./Calendario";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "sonner";

const values = [
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

export const FormReglas = ({ actualizar }: { actualizar: () => void }) => {
  const [selectedRegla, setSelectedRegla] = useState<string | null>(null);
  const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(null);
  const [fechaFinal, setFechaFinal] = useState<Dayjs | null>(null);
  const [selectKey, setSelectKey] = useState(0);

  //Para cargar el boton de registrar
  const [loading, setLoading] = useState(false);

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
      setFechaInicio(dayjs(`${currentYear}-02-15`));
      setFechaFinal(dayjs(`${currentYear}-07-06`));
    } else if (event.target.value === "2") {
      // Segundo semestre
      setFechaInicio(dayjs(`${currentYear}-08-10`));
      setFechaFinal(dayjs(`${currentYear}-12-30`));
    } else if (event.target.value === "3") {
      // Invierno
      setFechaInicio(dayjs(`${currentYear}-07-10`));
      setFechaFinal(dayjs(`${currentYear}-08-05`));
    } else if (event.target.value === "4") {
      // Verano
      setFechaInicio(dayjs(`${currentYear}-01-15`));
      setFechaFinal(dayjs(`${currentYear}-02-10`));
    }
  };

  const guardarRegla = async () => {
    if (!selectedRegla || !fechaInicio || !fechaFinal) {
      toast.error(
        "Por favor, seleccione una período academico y fechas válidas"
      );
      return;
    }
    setLoading(true);

    // Verificamos que la fecha final sea posterior a la fecha inicial
    if (fechaFinal.isBefore(fechaInicio)) {
      toast.error("La fecha final debe ser posterior a la fecha inicial");
      setLoading(false);
      return;
    }
    // Validar duración de la regla según el tipo seleccionado
    let diffMonths = 0;
    if (selectedRegla === "1" || selectedRegla === "2") {
      // Primer semestre o segundo semestre
      diffMonths = fechaFinal.diff(fechaInicio, "month");
      if (diffMonths > 5) {
        toast.error("La diferencia es mayor a 6 meses");
        setLoading(false);
        return;
      }
    } else if (selectedRegla === "3" || selectedRegla === "4") {
      // Invierno o verano
      diffMonths = fechaFinal.diff(fechaInicio, "month");
      if (diffMonths !== 0) {
        toast.error("La duración debe ser de maximo de un mes");
        setLoading(false);
        return;
      }
    }

    const data = {
      nombre: values[Number(selectedRegla) - 1].label,
      fecha_inicial: fechaInicio.format("YYYY-MM-DD"),
      fecha_final: fechaFinal.format("YYYY-MM-DD"),
      activa: 1,
    };

    try {
      // const response = await fetch("http://127.0.0.1:8000/api/regla/", {
      const response = await fetch(
        // "http://steelcode.tis.cs.umss.edu.bo/api/regla",
        import.meta.env.VITE_API_URL + "/api/regla",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
      }
      if (response.ok) {
        toast.success("Periodo academico guardado correctamente");
        cancelar();
        actualizar();
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const cancelar = () => {
    setSelectedRegla(null);
    setFechaInicio(null);
    setFechaFinal(null);
    setSelectKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="sm:flex justify-center items-center  text-negro mx-auto w-full max-w-screen-md  sm:my-8">
      <div className="shadow-lg rounded-lg sm:p-6 w-full">
        <h1 className="text-2xl font-bold sm:my-5 text-center ">
          Crear Periodo Academico
        </h1>
        <form className="sm:flex flex-col w-full items-center space-y-2">
          <Select
            key={selectKey}
            items={values}
            label="Seleccione un periodo académico"
            placeholder=""
            className="w-full"
            onChange={handleSelectChange}
          >
            {(data) => <SelectItem key={data.value}>{data.label}</SelectItem>}
          </Select>
          <p>Fecha inicial:</p>
          <Calendario
            initialDate={fechaInicio}
            onDateChange={guardarFechaInicio}
          />
          <p>Fecha final:</p>
          <Calendario
            initialDate={fechaFinal}
            onDateChange={guardarFechaFinal}
          />
          <div className="flex justify-end py-2 space-x-4">
            <Button
              onClick={guardarRegla}
              className="bg-primary text-white"
              isLoading={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              onClick={cancelar}
              className=" text-red-500"
              color="danger"
              variant="light"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormReglas;
