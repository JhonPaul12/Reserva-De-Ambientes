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

  //Cargando del boton
  const [loading, setLoading] = useState(false);

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
    //Verificar antes la gestion
    if (selectedRegla !== "") {
      setSelectedAmbiente(selectedValue);
      if (selectedValue === "") {
        setCheckedItems({});
        setResetCheckboxes((prev) => !prev);
      }
    } else {
      toast.error("Primero debes seleccionar una gestion");
      //Resetear campo ambiente
      setSelectedAmbiente("");
      setResetAmbiente((prev) => !prev);
    }
  };

  //Lista de Reglas
  const handleReglaChange = (selectedValue: string) => {
    setSelectedRegla(selectedValue);
    setSelectedAmbiente("");
    setResetAmbiente((prev) => !prev);
    setResetCheckboxes((prev) => !prev);
    setCheckedItems({});
  };

  //Obtengo reglas
  const obtenerRegla = useCallback(async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/regla/" + selectedRegla
        // `http://127.0.0.1:8000/api/regla/${selectedRegla}`
      );
      console.log(selectedRegla);
      if (!response.ok) {
        throw new Error("No se pudo obtener la fecha inicial");
      }
      const data = await response.json();
      console.log(data);
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
      setLoading(true);
      console.log("fecha inicial:", fechaInicial);
      console.log("fecha final:", fechafinal);
      console.log("selectedRegla:", selectedRegla);
      console.log("selectedAmbiente:", selectedAmbiente);
      console.log("checkedItems:", checkedItems);
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
        const response = await axios.post(
          // "http://127.0.0.1:8000/api/periodo",
          import.meta.env.VITE_API_URL + "/api/periodo",
          {
            periodos: datos.periodos,
          }
        );
        if (response.data.errores !== undefined) {
          if (response.data.success !== undefined) {
            resetValues();
            toast.success("Guardado con exito");
            console.log(response.data);
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

    setLoading(false);
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
        // "http://127.0.0.1:8000/api/ambiente-regla",
        import.meta.env.VITE_API_URL + "/api/ambiente-regla",
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
    <div className="reglas-container" style={{ overflowX: "auto" }}>
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />

      <div className="mt-3 mx-3 sm:mt-10 sm:mx-10 text-negro flex flex-col ">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          {" "}
          Asignar Horarios
        </h1>
        <div className="sm:flex flex-row m-3 sm:m-5 justify-between">
          <div className="flex flex-row items-center">
            <p className="text-sm sm:text-2xl font-bold mr-5 ">Gestiones</p>
            <ListaReglas
              onSelectChange={handleReglaChange}
              reset={resetRegla}
            />
          </div>
          <div className="flex flex-row items-center ">
            <p className="text-sm sm:text-2xl font-bold mr-5">
              Seleccionar Ambiente
            </p>
            <ListaAmbientes
              onSelectChange={handleSelectChange}
              reset={resetAmbiente}
            />
          </div>
        </div>
        <MenuCheckBox
          prueba={handleCheckboxChange}
          reset={resetCheckboxes}
          selectedAmbiente={selectedAmbiente}
          selectedRegla={selectedRegla}
        />
        <div className="flex justify-end ">
          <Button
            className="bg-danger  mt-2 mb-10 text-white mr-5"
            onClick={resetValues}
          >
            limpiar
          </Button>
          <Button
            className="bg-primary mt-2 mb-10 text-white"
            onClick={guardar}
            isLoading={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
