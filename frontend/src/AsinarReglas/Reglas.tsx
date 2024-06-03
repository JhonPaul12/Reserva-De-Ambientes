import { Button } from "@nextui-org/react";
import { MenuCheckBox } from "./components/MenuCheckBox";
import "./reglas.css";
import { useCallback, useEffect, useState } from "react";
import { ListaAmbientes } from "./components/ListaAmbientes";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ListaReglas } from "./components/ListaReglas";
import axios from "axios";
import { Toaster, toast } from "sonner";

export const Reglas = () => {
  const [checkedItems, setCheckedItems] = useState<{
    [key: string]: { id: number; dia: string; fijo?: boolean };
  }>({});
  const [selectedAmbiente, setSelectedAmbiente] = useState("");
  const [selectedRegla, setSelectedRegla] = useState("");
  const [fechaInicial, setFechainicial] = useState<Dayjs | null>(null);
  const [fechafinal, setFechafinal] = useState<Dayjs | null>(null);

  //Para resetear los ambientes
  const [resetAmbiente, setResetAmbiente] = useState(false);
  const [resetRegla, setResetRegla] = useState(false);
  const [resetCheckboxes, setResetCheckboxes] = useState(false);

  //Para resetear los valores
  const resetValues = () => {
    setCheckedItems({});
    setSelectedAmbiente("");
    setSelectedRegla("");
    setFechainicial(null);
    setFechafinal(null);
    setResetAmbiente((prev) => !prev);
    setResetRegla((prev) => !prev);
    setResetCheckboxes((prev) => !prev);
  };

  //Lista de checkbox
  const handleCheckboxChange = (
    checkedItems: Record<string, { id: number; dia: string; fijo?: boolean }>
  ) => {
    setCheckedItems(checkedItems);
  };

  //Lista de Ambientes
  const handleSelectChange = (selectedValue: string) => {
    setSelectedAmbiente(selectedValue);
    if (selectedValue === "") {
      setCheckedItems({});
      setResetCheckboxes((prev) => !prev);
    }
  };

  //Lista de Reglas
  const handleReglaChange = (selectedValue: string) => {
    setSelectedRegla(selectedValue);
  };

  //Obtengo reglas
  const obtenerRegla = useCallback(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/regla/${selectedRegla}`
      );
      if (!response.ok) {
        throw new Error("No se pudo obtener la fecha inicial");
      }
      const data = await response.json();
      setFechainicial(data.fecha_inicial);
      setFechafinal(data.fecha_final);
    } catch (error) {
      console.error("Error al obtener la fecha inicial:", error);
    }
  }, [selectedRegla]);

  useEffect(() => {
    if (selectedRegla) {
      obtenerRegla();
    }
  }, [selectedRegla, obtenerRegla]);

  //Funcion para crear los periodos
  const guardar = async () => {
    if (
      fechaInicial &&
      fechafinal &&
      selectedRegla &&
      selectedAmbiente &&
      Object.keys(checkedItems).length !== 0
    ) {
      //Creamos la regla asociada al ambiente
      await crearReglaAmbiente();
      const startDate = dayjs(fechaInicial);
      const endDate = dayjs(fechafinal);
      const datos = {
        periodos: Object.values(checkedItems)
          .map((item) => ({
            id_ambReg: selectedRegla,
            id_ambiente: selectedAmbiente,
            id_horario: item.id,
            estado: "libre",
            fecha: obtenerFecha(item.dia, startDate, endDate),
          }))
          .filter((periodo) => periodo.fecha !== null), // Filtrar los períodos con fecha nula
      };

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/periodo", {
          periodos: datos.periodos,
        });
        if (response.data.errores !== undefined) {
          if (response.data.success !== undefined) {
            resetValues();
            toast.success("Guardado con exito");
          } else {
            console.log(response.data);
            toast.error("Los peridos seleccionados ya estan asignados");
          }
        } else {
          resetValues();
          toast.success("Guardado con exito");
        }
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    } else {
      if (!selectedRegla) {
        toast.error("Debe seleccionar una Gestion");
      } else if (!selectedAmbiente) {
        toast.error("Debe seleccionar un ambiente");
      } else if (Object.keys(checkedItems).length === 0) {
        toast.error("Debe seleccionar al menos un horario");
      }
    }
  };

  //Funcion para obtener la fecha
  const obtenerFecha = (day: string, startDate: Dayjs, endDate: Dayjs) => {
    const daysOfWeek: { [key: string]: number } = {
      domingo: 0,
      lunes: 1,
      martes: 2,
      miércoles: 3,
      jueves: 4,
      viernes: 5,
      sábado: 6,
    };
    const dayIndex = daysOfWeek[day];
    let currentDate = startDate.startOf("day");
    while (currentDate <= endDate) {
      if (currentDate.day() === dayIndex) {
        return currentDate.toISOString().slice(0, 10);
      }
      currentDate = currentDate.add(1, "day");
    }
    return null;
  };

  //Creamos la conexion de regla con el ambiente que se necesita para asignar horarios
  const crearReglaAmbiente = async () => {
    //Verficamos si tiene regla
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ambiente-regla",
        {
          id_ambiente: selectedAmbiente,
          id_regla: selectedRegla,
        }
      );
      if (response.status !== 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error al guardar:", error);
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

      <div className="mt-10 mx-10 text-negro flex flex-col text-center">
        <h1 className="text-3xl font-bold"> Asignar Horarios</h1>
        <div className="flex flex-row ">
          <p className="text-2xl font-bold m-auto my-9">Gestion Actual</p>
          <ListaReglas onSelectChange={handleReglaChange} reset={resetRegla} />
          <p className="text-2xl font-bold mx-5 mt-9">Seleccionar Ambiente</p>
          <ListaAmbientes
            onSelectChange={handleSelectChange}
            reset={resetAmbiente}
          />
        </div>
        <MenuCheckBox
          prueba={handleCheckboxChange}
          reset={resetCheckboxes}
          selectedAmbiente={selectedAmbiente}
        />
        <Button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={guardar}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};

// import { Calendario } from "./components/Calendario";
// import { MenuCheckBox } from "./components/MenuCheckBox";
// import { ListaAmbientes } from "./components/ListaAmbientes";

// import { useEffect, useState } from "react";
// import "./reglas.css";

// import { Button } from "@nextui-org/react";
// import { Dayjs } from "dayjs";
// import { Toaster } from "sonner";
// import { toast } from "sonner";

// import { useReglaStore } from "./store/Reglas.store";
// import axios from "axios";

// export const Reglas = () => {
//   const crearRegla = useReglaStore((state) => state.crearRegla);
//   const [selectedAmbiente, setSelectedAmbiente] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
//   const [selectedDateFinal, setSelectedDateFinal] = useState<Dayjs | null>(
//     null
//   );
//   const [checkedCheckboxes, setCheckedCheckboxes] = useState<
//     { id: number; name: string; day: string }[]
//   >([]);
//   const [resetCheckboxes, setResetCheckboxes] = useState(false);

//   useEffect(() => {
//     if (resetCheckboxes) {
//       setResetCheckboxes(false);
//     }
//   }, [resetCheckboxes]);

//   const handleResetCheckboxes = () => {
//     setResetCheckboxes(true);
//   };
//   //Ambientes
//   const handleSelectChange = (selectedValue: string) => {
//     setSelectedAmbiente(selectedValue);
//   };

//   //Fechas
//   const handleDateChange = (newValue: Dayjs | null) => {
//     setSelectedDate(newValue);
//   };
//   const handleDateChangeFinal = (newValue: Dayjs | null) => {
//     setSelectedDateFinal(newValue);
//   };

//   const calcularIdHorario = (id: number, day: string) => {
//     let idAdjustment = 0;
//     switch (day) {
//       case "Lunes":
//         idAdjustment = 0;
//         break;
//       case "Martes":
//         idAdjustment = 20;
//         break;
//       case "Miércoles":
//         idAdjustment = 40;
//         break;
//       case "Jueves":
//         idAdjustment = 60;
//         break;
//       case "Viernes":
//         idAdjustment = 80;
//         break;
//       case "Sábado":
//         idAdjustment = 100;
//         break;
//       default:
//         idAdjustment = 0;
//     }
//     return id + idAdjustment;
//   };

//   const handleButtonClick = async () => {
//     if (selectedAmbiente === "") {
//       toast.error("Selecciona un Ambiente");
//     } else if (!selectedDate || !selectedDateFinal) {
//       toast.error("Por favor, selecciona la fecha inicial y la final");
//     } else {
//       const selectedDay = selectedDate?.date();
//       const selectedMonth = selectedDate?.month() + 1;
//       const selectedYear = selectedDate?.year();
//       const selectedDayFinal = selectedDateFinal?.date();
//       const selectedMonthFinal = selectedDateFinal?.month() + 1;
//       const selectedYearFinal = selectedDateFinal?.year();
//       //console.log(selectedDay, selectedMonth, selectedYear);
//       //console.log(selectedDayFinal, selectedMonthFinal, selectedYearFinal);
//       if (selectedDay <= selectedDayFinal) {
//         if (selectedMonth <= selectedMonthFinal) {
//           if (selectedYear <= selectedYearFinal) {
//             await crearRegla(
//               parseInt(selectedAmbiente),
//               selectedDate?.format("YYYY-MM-DD"),
//               selectedDateFinal?.format("YYYY-MM-DD")
//             );

//             // Mostrar mensaje de éxito solo si la creación de la regla es exitosa
//             const periodosData = checkedCheckboxes.map((checkbox) => ({
//               id_ambiente: parseInt(selectedAmbiente),
//               id_horario: calcularIdHorario(checkbox.id, checkbox.day),
//               estado: "libre",
//               fecha: obtenerFecha(
//                 checkbox.day,
//                 selectedDate,
//                 selectedDateFinal
//               ),
//             }));

//             const response = await axios.post(
//               "http://127.0.0.1:8000/api/periodos",
//               { periodos: periodosData }
//             );
//             toast.success("Guardado", { description: response.data.message });
//             //setSelectedAmbiente("");
//             setSelectedDate(null);
//             setSelectedDateFinal(null);
//             setCheckedCheckboxes([]);
//             handleResetCheckboxes();

//             //Este Sirve
//             // try {
//             //   const promises = checkedCheckboxes.map(async (checkbox) => {
//             //     console.log(
//             //       obtenerFecha(checkbox.day, selectedDate, selectedDateFinal)
//             //     );
//             //     const response = await axios.post(
//             //       "http://127.0.0.1:8000/api/periodo",
//             //       {
//             //         id_ambiente: parseInt(selectedAmbiente),
//             //         id_horario: calcularIdHorario(checkbox.id, checkbox.day),
//             //         estado: "libre",
//             //         fecha: obtenerFecha(
//             //           checkbox.day,
//             //           selectedDate,
//             //           selectedDateFinal
//             //         ),
//             //       }
//             //     );

//             //     return response.data;
//             //   });

//             //   const responses = await Promise.all(promises);

//             //   console.log("Respuestas del servidor:", responses);
//             //   // setSelectedAmbiente("");
//             //   // setSelectedDate(null);
//             //   // setSelectedDateFinal(null);
//             //   // setCheckedCheckboxes([]);
//             // } catch (error) {
//             //   console.error("Error al crear periodos:", error);
//             // }

//             // const periodos = checkedCheckboxes.map((checkbox) => ({
//             //   id_ambiente: parseInt(selectedAmbiente),
//             //   id_horario: calcularIdHorario(checkbox.id, checkbox.day),
//             //   estado: "libre",
//             //   fecha: selectedDate?.format("YYYY-MM-DD") || "",
//             // }));

//             // console.log("Periodos a crear:", periodos);
//             // console.log(checkedCheckboxes);
//           } else {
//             toast.error("La fecha inicial es mayor a la fecha final");
//           }
//         } else {
//           toast.error("La fecha inicial es mayor a la fecha final");
//         }
//       } else {
//         toast.error("La fecha inicial es mayor a la fecha final");
//       }
//     }
//   };

//   const obtenerFecha = (day: string, startDate: Dayjs, endDate: Dayjs) => {
//     const daysOfWeek: { [key: string]: number } = {
//       Domingo: 0,
//       Lunes: 1,
//       Martes: 2,
//       Miércoles: 3,
//       Jueves: 4,
//       Viernes: 5,
//       Sábado: 6,
//     };
//     const dayIndex = daysOfWeek[day];

//     // Convertir la fecha inicial y final a objetos de fecha nativos de JavaScript
//     const startJSDate = new Date(startDate.format());
//     const endJSDate = new Date(endDate.format());

//     // Iterar sobre las fechas dentro del rango
//     const currentDate = new Date(startJSDate);
//     while (currentDate <= endJSDate) {
//       // Verificar si el día de la semana coincide
//       if (currentDate.getDay() === dayIndex) {
//         return currentDate.toISOString().slice(0, 10);
//       }
//       // Avanzar a la siguiente fecha
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     // Si no se encuentra ninguna fecha válida, devolver null
//     return null;
//   };

//   const handleCheckboxChange = (
//     checkedCheckboxes: { id: number; name: string; day: string }[]
//   ) => {
//     setCheckedCheckboxes(checkedCheckboxes);
//   };

//   return (
//     <div className="reglas-container">
//       <Toaster
//         position="top-right"
//         richColors
//         closeButton
//         style={{ position: "absolute" }}
//       />
//       <div className="flex flex-col text-negro mx-10 my-10">
//         <h1 className="text-3xl font-bold text-center">Periodos</h1>
//         <div className="flex flex-row mt-8">
//           <p className="text-2xl font-bold text-center justify-center mt-5 mx-5">
//             Seleccionar Ambiente
//           </p>
//           <ListaAmbientes onSelectChange={handleSelectChange} />
//           <p className="text-2xl font-bold mt-5 mx-8">Fecha Inicial</p>
//           <Calendario
//             selectedDate={selectedDate}
//             onDateChange={handleDateChange}
//           />
//           <p className="text-2xl font-bold mt-5 mx-5">Fecha Final</p>
//           <Calendario
//             selectedDate={selectedDateFinal}
//             onDateChange={handleDateChangeFinal}
//           />
//         </div>

//         <MenuCheckBox
//           onCheckboxChange={handleCheckboxChange}
//           reset={resetCheckboxes}
//         />
//         {/* <Button onClick={handleResetCheckboxes}>Limpiar Checkboxes</Button> */}
//         <Button
//           className="bg-primary text-2xl text-white mx-10"
//           onClick={handleButtonClick}
//         >
//           Registrar
//         </Button>
//         {/* <Button onClick={handleResetInParent}>Prueb</Button> */}
//       </div>
//     </div>
//   );
// };
