import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CalendarIcon } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { toast } from "sonner";
import ModalMenuCheckBox from "./ModalMenuCheckBox";
import { GestionesAmbientes } from "./GestionesAmbientes";

interface Ambiente {
  id: string;
  nombre: string;
}

interface Props {
  ambiente: Ambiente;
}

interface Periodo {
  id: number;
  id_ambiente: number;
  id_horario: number;
  hora_inicio: string;
  hora_fin: string;
  fecha: string;
  estado: string;
  dia: string;
}

interface Item {
  id: number;
  dia: string;
}

export const EditPeriodosModal = ({ ambiente }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [createdItems, setCreatedItems] = useState<Record<number, Item>>({});
  const [deleteItems, setDeleteItems] = useState<number[]>([]);
  const [regla, setRegla] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFinal, setFechaFinal] = useState<string>("");

  const [limpiar, setLimpiar] = useState(false);

  //Cargando en el boton
  const [loading, setLoading] = useState(false);

  const onSelectChange = async (selectedValue: string) => {
    if (selectedValue === "") {
      console.log("No hay regla seleccionada");
      setPeriodos([]);
      setLimpiar(!limpiar);
      setRegla("");
      setFechaInicio("");
      setFechaFinal("");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/regla/${selectedValue}`
      );
      const data = await response.json();
      setRegla(data.id);
      setFechaInicio(data.fecha_inicial);
      setFechaFinal(data.fecha_final);
      await getPeriodos(data.id);
    } catch (error) {
      console.error("Error fetching regla:", error);
    }
  };

  useEffect(() => {
    setPeriodos([]);
    setLimpiar(!limpiar);
    setRegla("");
    setFechaInicio("");
    setFechaFinal("");
  }, [onOpenChange]);

  const getPeriodos = async (reglaId: string) => {
    try {
      // const response = await fetch(
      //   `http://127.0.0.1:8000/api/periodosAsignados/${ambiente.id}/${reglaId}`
      // );

      const response = await fetch(
        import.meta.env.VITE_API_URL +
          "/api/periodosAsignados/" +
          ambiente.id +
          "/" +
          reglaId
      );
      const data = await response.json();
      if (response.status === 200) {
        setPeriodos(data);
      } else {
        setPeriodos([]);
        setLimpiar(!limpiar);
      }
    } catch (error) {
      console.error("Error fetching periodos:", error);
    }
  };

  const checkboxCreated = (newCreatedItems: Record<number, Item>) => {
    setCreatedItems(newCreatedItems);
  };

  const checkboxDeleted = (newDeleteItems: number[]) => {
    setDeleteItems(newDeleteItems);
  };

  const guardar = async () => {
    if (
      fechaInicio &&
      fechaFinal &&
      regla &&
      ambiente.id &&
      Object.keys(createdItems).length !== 0
    ) {
      setLoading(true);
      await reglaAmbiente();

      const startDate = dayjs(fechaInicio);
      const endDate = dayjs(fechaFinal);
      const datos = {
        periodos: Object.values(createdItems)
          .map((item) => ({
            id_ambReg: regla,
            id_ambiente: ambiente.id,
            id_horario: item.id,
            estado: "libre",
            fecha: obtenerFecha(item.dia, startDate, endDate),
          }))
          .filter((periodo) => periodo.fecha !== null),
      };
      console.log(datos);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/periodo`,
          {
            periodos: datos.periodos,
          }
        );
        if (response.data.errores !== undefined) {
          if (response.data.success !== undefined) {
            toast.success("Guardado con éxito");
            setPeriodos([]);
            setLimpiar(!limpiar);
            setRegla("");
            setFechaInicio("");
            setFechaFinal("");
          } else {
            console.log(response.data);
            toast.error("Los períodos seleccionados ya están asignados");
          }
        } else {
          toast.success("Guardado con éxito");
        }
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    }
    if (regla && ambiente.id && deleteItems.length !== 0) {
      const datos1 = {
        periodos: deleteItems.map((item) => ({
          id_regla: regla,
          id_horario: item.toString(),
          id_ambiente: ambiente.id,
        })),
      };
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/eliminarPeriodo`,
          {
            data: datos1,
          }
        );
        if (response.status === 200) {
          toast.success("Eliminado con éxito");
          setPeriodos([]);
          setLimpiar(!limpiar);
          setRegla("");
          setFechaInicio("");
          setFechaFinal("");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.data
        ) {
          console.error("Error detalles:", error.response.data);
        } else {
          console.error("Error desconocido:", error);
        }
      }
    } else {
      if (!regla) {
        toast.error("Por favor, seleccione una gestion");
      }
      // toast.error("No hay períodos para eliminar");
    }
    setCreatedItems({});
    setDeleteItems([]);
    setLimpiar(!limpiar);
    setLoading(false);
    onOpenChange();
  };

  const reglaAmbiente = async () => {
    try {
      const response = await axios.post(
        // `${import.meta.env.VITE_API_URL}/api/ambiente-regla`,
        import.meta.env.VITE_API_URL + "/api/ambiente-regla",
        {
          id_ambiente: ambiente.id,
          id_regla: regla,
        }
      );
      if (response.status !== 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error al guardar:", error);
    }
  };

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

  return (
    <>
      <div className="flex justify-center items-center">
        <Button color="success" endContent={<CalendarIcon />} onClick={onOpen}>
          Horarios
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-3xl">
                Ambiente {ambiente.nombre}
              </ModalHeader>
              <GestionesAmbientes onSelectChange={onSelectChange} />
              <ModalBody>
                <ModalMenuCheckBox
                  Periodos={periodos}
                  checkboxCreated={checkboxCreated}
                  checkboxDeleted={checkboxDeleted}
                  limpiar={limpiar}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={guardar} isLoading={loading}>
                  {loading ? "Guardando..." : "Guardar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
