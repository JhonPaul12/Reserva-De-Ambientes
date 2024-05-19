import {
  Modal,
  ModalContent,
  Button
} from "@nextui-org/react";
import { useAmbienteStore } from "../../RegistrarAmbientes/store/ambientes.store";
import { useState } from "react";

export const DeleteAmbienteModal = ({ambiente}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const deleteAmbiente = useAmbienteStore( state => state.deleteAmbiente);
  
  const openModal = async() => {
    setModalOpen(true);
  };
  const eliminarAmbiente = async () => {
    await deleteAmbiente(parseInt(ambiente.id));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
        setModalOpen(false);
        
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <Button className="bg-danger text-white " onClick={() => openModal()}>
          Eliminar
        </Button>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="p-10 bg-white"
      >
        <ModalContent className="">
          ¿Estás seguro de que quieres eliminar este ambiente?
          <Button
            className="bg-danger m-2 text-white"
            onClick={eliminarAmbiente}
          >
            Sí
          </Button>
          <Button className="m-2" onClick={() => setModalOpen(false)}>
            No
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
};
