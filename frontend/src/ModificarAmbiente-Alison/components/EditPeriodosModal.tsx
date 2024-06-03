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
import { useCallback, useEffect, useState } from "react";
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

  // const getAmbiente = async () => {
  //   fetch(`http://127.0.0.1:8000/api/periodosAsignados/${ambiente.id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPeriodos(data);
  //     });
  // };

  //Obtenemos los periodos de el ambiente
  const getAmbiente = useCallback(async () => {
    fetch(`http://127.0.0.1:8000/api/periodosAsignados/${ambiente.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPeriodos(data);
      });
  }, [ambiente.id]);

  useEffect(() => {
    if (isOpen) getAmbiente(), obtenerRegla();
  }, [isOpen, getAmbiente]);

  const checkboxCreated = (newCreatedItems) => {
    setCreatedItems(newCreatedItems);
  };

  const checkboxDeleted = (newDeleteItems) => {
    setDeleteItems(newDeleteItems);
  };

  const guardar = async () => {
    // console.log(cretedItems);
    //console.log(deleteItems);
    //Verficamos si tiene regla

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
      regla.id &&
      ambiente.id &&
      Object.keys(cretedItems).length !== 0
    ) {
      //Verficamos si tiene regla
      await reglaAmbiente();

      const startDate = dayjs(fechaInicio);
      const endDate = dayjs(fechaFinal);
      const datos = {
        periodos: Object.values(cretedItems)
          .map((item) => ({
            id_ambReg: regla.id,
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
      if (!regla.id) {
        toast.error("No hay una gestion activa");
      } else if (!ambiente.id) {
        toast.error("No hay un ambiente ");
      } else if (Object.keys(cretedItems).length === 0) {
        //toast.info("Debe seleccionar al menos un horario");
      }
    }
    if (regla.id && ambiente.id && deleteItems.length !== 0) {
      const datos1 = {
        periodos: deleteItems.flat().map((item) => ({
          id_regla: String(regla.id),
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
      //toast.error("No hay periodos para eliminar");
    }

    onOpenChange();
  };

  const reglaAmbiente = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/ambiente-regla",
        {
          id_ambiente: ambiente.id,
          id_regla: regla.id,
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

  const obtenerRegla = async () => {
    // fetch(`http://127.0.0.1:8000/api/regla-ambientes/${ambiente.id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setRegla(data);
    //     setFechaInicio(data.fecha_inicio);
    //     setFechaFinal(data.fecha_fin);
    //   });
    fetch("http://127.0.0.1:8000/api/reglaActiva/")
      .then((response) => response.json())
      .then((data) => {
        setRegla(data);
        setFechaInicio(data.fecha_inicial);
        setFechaFinal(data.fecha_final);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de elementos:", error);
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
                <Button
                  onClick={() => {
                    console.log(regla);
                    console.log(fechaInicio);
                    console.log(fechaFinal);
                  }}
                >
                  Prueba
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
