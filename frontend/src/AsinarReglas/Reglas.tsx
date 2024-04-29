import { Calendario } from "./components/Calendario";
import MenuCheckBox from "./components/MenuCheckBox";
import { ListaDocentes } from "./components/ListaDocentes";
import { useState } from "react";
import "./reglas.css"; // Importa el archivo CSS
import { Button } from "@nextui-org/react";
import { Dayjs } from "dayjs";
import { Toaster } from "sonner";
import { toast } from "sonner";

export const Reglas = () => {
  const [selectedDocente, setSelectedDocente] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDateFinal, setSelectedDateFinal] = useState<Dayjs | null>(
    null
  );

  const handleSelectChange = (selectedValue: string) => {
    setSelectedDocente(selectedValue);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };
  const handleDateChangeFinal = (newValue: Dayjs | null) => {
    setSelectedDateFinal(newValue);
  };

  const handleButtonClick = () => {
    if (selectedDocente === "") {
      console.error("Selecciona un docente");
      toast.error("Selecciona un docente");
    } else if (!selectedDate || !selectedDateFinal) {
      console.error("Por favor, selecciona la fecha inicial y la final");
      toast.error("Por favor, selecciona la fecha inicial y la final");
    } else {
      const selectedDay = selectedDate?.date();
      const selectedMonth = selectedDate?.month() + 1;
      const selectedYear = selectedDate?.year();
      const selectedDayFinal = selectedDateFinal?.date();
      const selectedMonthFinal = selectedDateFinal?.month() + 1;
      const selectedYearFinal = selectedDateFinal?.year();
      console.log(selectedDay, selectedMonth, selectedYear);
      console.log(selectedDayFinal, selectedMonthFinal, selectedYearFinal);
      if (selectedDay <= selectedDayFinal) {
        if (selectedMonth <= selectedMonthFinal) {
          if (selectedYear <= selectedYearFinal) {
            console.log("Registro exitoso");
            toast.success("Registro exitoso");
          } else {
            console.log("La fecha inicial es mayor a la fecha final");
            toast.error("La fecha inicial es mayor a la fecha final");
          }
        } else {
          console.log("La fecha inicial es mayor a la fecha final");
          toast.error("La fecha inicial es mayor a la fecha final");
        }
      } else {
        console.log("La fecha inicial es mayor a la fecha final");
        toast.error("La fecha inicial es mayor a la fecha final");
      }
    }
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
          <ListaDocentes onSelectChange={handleSelectChange} />
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

        <MenuCheckBox />
      </div>
      <Button className="bg-primary" onClick={handleButtonClick}>
        Registrar
      </Button>
    </div>
  );
};
