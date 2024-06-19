import { Modal, ModalContent, Button } from "@nextui-org/react";
import { useAmbienteStore } from "../../RegistrarAmbientes/store/ambientes.store";
import { useState } from "react";

interface Ambiente {
  id: string;
}

export const DeleteAmbienteModal = ({ ambiente }: { ambiente: Ambiente }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const deleteAmbiente = useAmbienteStore((state) => state.deleteAmbiente);

  const openModal = async () => {
    setModalOpen(true);
  };
  const eliminarAmbiente = async () => {
    await deleteAmbiente(parseInt(ambiente.id));
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
