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

export const EditPeriodosModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              <ModalHeader className="flex flex-col gap-1">
                Peridos del ambiente
              </ModalHeader>
              <ModalBody>
                <ModalMenuCheckBox />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
