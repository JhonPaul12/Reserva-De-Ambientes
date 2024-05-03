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
import axios from "axios";

export const Reglas = () => {
  const crearRegla = useReglaStore((state) => state.crearRegla);
  const [selectedAmbiente, setSelectedAmbiente] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedDateFinal, setSelectedDateFinal] = useState<Dayjs | null>(
    null
  );
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);

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

  const calcularIdHorario = (id, day) => {
    let idAdjustment = 0;
    switch (day) {
      case "Lunes":
        idAdjustment = 0;
        break;
      case "Martes":
        idAdjustment = 20;
        break;
      case "Miércoles":
        idAdjustment = 40;
        break;
      case "Jueves":
        idAdjustment = 60;
        break;
      case "Viernes":
        idAdjustment = 80;
        break;
      case "Sábado":
        idAdjustment = 100;
        break;
      default:
        idAdjustment = 0;
    }
    return parseInt(id) + idAdjustment;
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

            //Creando periodos
            try {
              const promises = checkedCheckboxes.map(async (checkbox) => {
                console.log(
                  obtenerFecha(checkbox.day, selectedDate, selectedDateFinal)
                );
                const response = await axios.post(
                  "http://127.0.0.1:8000/api/periodo",
                  {
                    id_ambiente: parseInt(selectedAmbiente),
                    id_horario: calcularIdHorario(checkbox.id, checkbox.day),
                    estado: "libre",
                    fecha: obtenerFecha(
                      checkbox.day,
                      selectedDate,
                      selectedDateFinal
                    ),
                  }
                );

                return response.data;
              });

              const responses = await Promise.all(promises);

              console.log("Respuestas del servidor:", responses);
              //toast.success("Periodos creados exitosamente");
            } catch (error) {
              console.error("Error al crear periodos:", error);
              toast.error("Error al crear periodos");
            }

            // const periodos = checkedCheckboxes.map((checkbox) => ({
            //   id_ambiente: parseInt(selectedAmbiente),
            //   id_horario: calcularIdHorario(checkbox.id, checkbox.day),
            //   estado: "libre",
            //   fecha: selectedDate?.format("YYYY-MM-DD") || "",
            // }));

            // console.log("Periodos a crear:", periodos);
            // console.log(checkedCheckboxes);
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

  const obtenerFecha = (day, startDate, endDate) => {
    // Obtener el día de la semana seleccionado
    const daysOfWeek = {
      Domingo: 0,
      Lunes: 1,
      Martes: 2,
      Miércoles: 3,
      Jueves: 4,
      Viernes: 5,
      Sábado: 6,
    };
    const dayIndex = daysOfWeek[day];

    // Convertir la fecha inicial y final a objetos de fecha nativos de JavaScript
    const startJSDate = new Date(startDate.format());
    const endJSDate = new Date(endDate.format());

    // Iterar sobre las fechas dentro del rango
    const currentDate = new Date(startJSDate);
    while (currentDate <= endJSDate) {
      // Verificar si el día de la semana coincide
      if (currentDate.getDay() === dayIndex) {
        return currentDate.toISOString().slice(0, 10);
      }
      // Avanzar a la siguiente fecha
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Si no se encuentra ninguna fecha válida, devolver null
    return null;
  };

  const handleCheckboxChange = (checkedCheckboxes: string[]) => {
    setCheckedCheckboxes(checkedCheckboxes);
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
        <Button className="bg-primary text-4xl" onClick={handleButtonClick}>
          Registrar
        </Button>
      </div>
    </div>
  );
};
