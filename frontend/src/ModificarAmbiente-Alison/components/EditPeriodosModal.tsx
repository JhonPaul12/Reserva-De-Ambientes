import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FcCalendar } from "react-icons/fc";
import ModalMenuCheckBox from "./ModalMenuCheckBox";
import { useEffect, useState } from "react";
import { CalendarIcon } from "@mui/x-date-pickers";

export const EditPeriodosModal = ({ ambiente }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [periodos, setPeriodos] = useState<[]>([]);
  const [checkedPeriodos, setCheckedPeriodos] = useState({});

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

  const handleCheckboxesChange = (newCheckedItems) => {
    setCheckedPeriodos(newCheckedItems); // Actualizar el estado de los checkboxes marcaos
  };

  const guardar = async () => {
    console.log(checkedPeriodos);
    console.log(regla);
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
      <Button color="success" endContent={<CalendarIcon/>} onClick={onOpen}>
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
                  onCheckboxesChange={handleCheckboxesChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={guardar}>
                  Guardar
                </Button>
                <Button onClick={() => console.log(checkedPeriodos)}>
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
