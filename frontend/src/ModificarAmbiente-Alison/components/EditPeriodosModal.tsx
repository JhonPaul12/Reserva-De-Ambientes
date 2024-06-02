import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
//import { FcCalendar } from "react-icons/fc";
import ModalMenuCheckBox from "./ModalMenuCheckBox";
import { useEffect, useState } from "react";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "sonner";

export const EditPeriodosModal = ({ ambiente }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [periodos, setPeriodos] = useState<[]>([]);
  //const [checkedPeriodos, setCheckedPeriodos] = useState({});
  const [cretedItems, setCreatedItems] = useState({});
  const [deleteItems, setDeleteItems] = useState([]);

  const [regla, setRegla] = useState({});
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  useEffect(() => {
    if (isOpen) getAmbiente(), obtenerRegla();
  }, [isOpen]);

  const getAmbiente = async () => {
    fetch(`http://127.0.0.1:8000/api/periodosAsignados/${ambiente.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPeriodos(data);
      });
  };

  const checkboxCreated = (newCreatedItems) => {
    setCreatedItems(newCreatedItems);
  };

  const checkboxDeleted = (newDeleteItems) => {
    setDeleteItems(newDeleteItems);
  };

  const guardar = async () => {
    // console.log(cretedItems);
    //console.log(deleteItems);

    // console.log(regla.id_regla);
    // console.log(ambiente.id);
    // console.log(fechaInicio);
    // console.log(fechaFinal);
    // const startDate = dayjs(fechaInicio);
    // const endDate = dayjs(fechaFinal);
    // console.log(obtenerFecha("martes", startDate, endDate));

    if (
      fechaInicio &&
      fechaFinal &&
      regla.id_regla &&
      ambiente.id &&
      Object.keys(cretedItems).length !== 0
    ) {
      const startDate = dayjs(fechaInicio);
      const endDate = dayjs(fechaFinal);
      const datos = {
        periodos: Object.values(cretedItems)
          .map((item) => ({
            id_ambReg: regla.id_regla,
            id_ambiente: ambiente.id,
            id_horario: item.id, // Assuming each item has an id
            estado: "libre",
            fecha: obtenerFecha(item.dia, startDate, endDate),
          }))
          .filter((periodo) => periodo.fecha !== null), // Filter out periods with null dates
      };
      console.log(datos);
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/periodo", {
          periodos: datos.periodos,
        });
        if (response.data.errores !== undefined) {
          if (response.data.success !== undefined) {
            //salir
            toast.success("Guardado con exito");
          } else {
            console.log(response.data);
            toast.error("Los peridos seleccionados ya estan asignados");
          }
        } else {
          //resetValues();
          toast.success("Guardado con exito");
        }
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    } else {
      console.log("No se ha seleccionado ningun horario");
    }
    if (regla.id_regla && ambiente.id && deleteItems.length !== 0) {
      const datos1 = {
        periodos: deleteItems.flat().map((item) => ({
          id_regla: String(regla.id_regla),
          id_horario: String(item), // Adjust item access if necessary
          id_ambiente: String(ambiente.id),
        })),
      };
      try {
        const response = await axios.delete(
          "http://127.0.0.1:8000/api/eliminarPeriodo",
          {
            data: datos1,
          }
        );
        if (response.status === 200) {
          toast.success("Eliminado con exito");
          getAmbiente();
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        if (error.response && error.response.data) {
          console.error("Error detalles:", error.response.data);
        }
      }
    } else {
      console.log("No se ha seleccionado ningun horario para borrar");
    }

    onOpenChange();
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

  const obtenerRegla = async () => {
    fetch(`http://127.0.0.1:8000/api/regla-ambientes/${ambiente.id}`)
      .then((response) => response.json())
      .then((data) => {
        setRegla(data);
        setFechaInicio(data.fecha_inicio);
        setFechaFinal(data.fecha_fin);
      });
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <Button color="success" endContent={<CalendarIcon />} onClick={onOpen}>
          Horarios
        </Button>
        {/*<FcCalendar size={60} onClick={onOpen} />*/}
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
              <ModalBody>
                <ModalMenuCheckBox
                  Periodos={periodos}
                  checkboxCreated={checkboxCreated}
                  checkboxDeleted={checkboxDeleted}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={guardar}>
                  Guardar
                </Button>
                {/* <Button
                  onClick={() => {
                    console.log(cretedItems);
                    console.log(deleteItems);
                  }}
                >
                  Prueba
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
