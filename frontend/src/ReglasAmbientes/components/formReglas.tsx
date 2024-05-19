import { Select, SelectItem } from "@nextui-org/react";
import { Calendario } from "./Calendario";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Dayjs } from "dayjs";

const data = [
  {
    value: "1",
    label: "Semestre 1",
  },
  {
    value: "2",
    label: "Semestre 2",
  },
  {
    value: "3",
    label: "Invierno ",
  },
  {
    value: "4",
    label: "Verano",
  },
];

export const FormReglas = () => {
  const [fechaInicio, setFechaInicio] = useState<Dayjs | null>();
  const [fechaFinal, setFechaFinal] = useState<Dayjs | null>();

  const guardarFechaInicio = (value: Dayjs | null) => {
    setFechaInicio(value);
  };

  const guardarFechaFinal = (value: Dayjs | null) => {
    setFechaFinal(value);
    const diffMonths = fechaFinal!.diff(fechaInicio, "month");
    if (diffMonths > 5) {
      // Aquí puedes mostrar un mensaje de error o tomar otra acción
      console.log("La diferencia es mayor a 6 meses");
    } else {
      console.log("La diferencia es menor a 6 meses");
    }
  };
  // const Imprimir = () => {
  //   console.log(fechaInicio?.format("YYYY-MM-DD"));
  //   console.log(fechaFinal?.format("YYYY-MM-DD"));
  // };
  return (
    <div className="mt-10">
      <h1>Formulario de Reglas</h1>
      <form className="flex flex-col  items-center space-y-4">
        <Select
          items={data}
          label="Seleccione una gestion"
          placeholder=""
          className="max-w-xs "
        >
          {(data) => <SelectItem key={data.value}>{data.label}</SelectItem>}
        </Select>
        <Calendario onDateChange={guardarFechaInicio} />
        <Calendario onDateChange={guardarFechaFinal} />
        <div className="flex space-x-4">
          <Button className="bg-primary text-white ">Registrar</Button>
          <Button className="bg-primary text-white"> Cancelar</Button>
        </div>
      </form>
    </div>
  );
};

export default FormReglas;
