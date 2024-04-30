import { Calendario } from "./components/Calendario";
import { MenuCheckBox } from "./components/MenuCheckBox";
import { ListaAmbientes } from "./components/ListaAmbientes";

import { useState } from "react";
import "./reglas.css";

import { Button } from "@nextui-org/react";
import { Dayjs } from "dayjs";
import { Toaster } from "sonner";
import { toast } from "sonner";

import { useReglaStore } from "./store/Reglas.store";

export const Reglas = () => {
  const crearRegla = useReglaStore((state) => state.crearRegla);
  const [selectedAmbiente, setSelectedAmbiente] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDateFinal, setSelectedDateFinal] = useState<Dayjs | null>(
    null
  );

  //Ambientes
  const handleSelectChange = (selectedValue: string) => {
    setSelectedAmbiente(selectedValue);
  };

  //Fechas
  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };
  const handleDateChangeFinal = (newValue: Dayjs | null) => {
    setSelectedDateFinal(newValue);
  };

  const handleButtonClick = async () => {
    if (selectedAmbiente === "") {
      toast.error("Selecciona un Ambiente");
    } else if (!selectedDate || !selectedDateFinal) {
      toast.error("Por favor, selecciona la fecha inicial y la final");
    } else {
      const selectedDay = selectedDate?.date();
      const selectedMonth = selectedDate?.month() + 1;
      const selectedYear = selectedDate?.year();
      const selectedDayFinal = selectedDateFinal?.date();
      const selectedMonthFinal = selectedDateFinal?.month() + 1;
      const selectedYearFinal = selectedDateFinal?.year();
      //console.log(selectedDay, selectedMonth, selectedYear);
      //console.log(selectedDayFinal, selectedMonthFinal, selectedYearFinal);
      if (selectedDay <= selectedDayFinal) {
        if (selectedMonth <= selectedMonthFinal) {
          if (selectedYear <= selectedYearFinal) {
            toast.success("Registro exitoso");
            await crearRegla(
              parseInt(selectedAmbiente),
              selectedDate?.format("YYYY-MM-DD"),
              selectedDateFinal?.format("YYYY-MM-DD")
            );
          } else {
            toast.error("La fecha inicial es mayor a la fecha final");
          }
        } else {
          toast.error("La fecha inicial es mayor a la fecha final");
        }
      } else {
        toast.error("La fecha inicial es mayor a la fecha final");
      }
    }
  };

  const handleCheckboxChange = (checkedCheckboxes: string[]) => {
    // Utiliza los checkboxes marcados como necesites
    console.log("Checkboxes marcados desde reglas:", checkedCheckboxes);
  };

  return (
    <div className="reglas-container">
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />
      <div className="flex flex-col text-negro mx-10 my-10">
        <h1 className="text-3xl font-bold text-center">
          Registrar Reglas para ambientes
        </h1>
        <div className="flex flex-row mt-8">
          <p className="text-2xl font-bold text-center justify-center mt-5 mx-5">
            Seleccionar Ambiente
          </p>
          <ListaAmbientes onSelectChange={handleSelectChange} />
          <p className="text-2xl font-bold mt-5 mx-8">Fecha Inicial</p>
          <Calendario
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <p className="text-2xl font-bold mt-5 mx-5">Fecha Final</p>
          <Calendario
            selectedDate={selectedDateFinal}
            onDateChange={handleDateChangeFinal}
          />
        </div>

        <MenuCheckBox onCheckboxChange={handleCheckboxChange} />
      </div>
      <Button className="bg-primary" onClick={handleButtonClick}>
        Registrar
      </Button>
    </div>
  );
};
