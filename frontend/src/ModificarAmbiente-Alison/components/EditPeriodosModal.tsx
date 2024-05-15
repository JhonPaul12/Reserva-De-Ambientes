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

export const EditPeriodosModal = ({ ambiente }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [periodos, setPeriodos] = useState<[]>([]);
  const [checkedPeriodos, setCheckedPeriodos] = useState({});

  useEffect(() => {
    if (isOpen) getAmbiente();
  }, [isOpen]);
  const imprimir = () => {
    console.log(periodos);
  };

  const getAmbiente = async () => {
    fetch(`http://127.0.0.1:8000/api/periodosAsignados/${ambiente.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPeriodos(data);
      });
  };

  const handleCheckboxesChange = (newCheckedItems) => {
    setCheckedPeriodos(newCheckedItems); // Actualizar el estado de los checkboxes marcados
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <FcCalendar size={60} onClick={onOpen} />
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
                  Close
                </Button>
                <Button color="primary" onPress={imprimir}>
                  Action
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
