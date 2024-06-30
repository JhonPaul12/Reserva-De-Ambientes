import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Ambiente {
  id: number;
  ambientes: {
    id: number;
    nombre: string;
  }[];
  ubicacion: string;
}
export const ModalAmbientes = function ({ fecha }: { fecha: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);

  const obtenerContiguos = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/obtenerContiguos",
        { fecha }
      );
      setAmbientes(response.data);
    } catch (error) {
      console.error("Error fetching ambientes:", error);
    }
  };
  useEffect(() => {
    if (isOpen) {
      obtenerContiguos();
    } else {
      setAmbientes([]);
    }
  }, [isOpen, fecha]);

  const handleIconClick = () => {
    const fechaSeleccionada = new Date(fecha);
    const fechaActual = new Date();

    if (fechaSeleccionada > fechaActual) {
      onOpen();
    } else {
      console.error(
        "Fecha inválida: seleccione una fecha posterior a la de hoy."
      );
    }
  };

  return (
    <>
      <Button
        className=" mt-2 w-full "
        onClick={handleIconClick}
        color="primary" variant="faded" size="sm"
      >Ver ambientes contiguos libres</Button>
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Ambientes Contiguos
                <p className="text-sm text-gray-500"> Fecha: {fecha}</p>
              </ModalHeader>
              <ModalBody>
                {ambientes.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No hay ambientes contiguos
                  </p>
                ) : (
                  <Table
                    className="custom-table"
                    aria-label="Example table with dynamic content"
                  >
                    <TableHeader>
                      <TableColumn className="text-center  text-sm bg-slate-300">
                        AMBIENTES
                      </TableColumn>
                      <TableColumn className="text-center text-sm bg-slate-300">
                        UBICACIÓN
                      </TableColumn>
                    </TableHeader>
                    <TableBody>
                      {ambientes.map((ambiente) => (
                        <TableRow key={ambiente.ubicacion}>
                          <TableCell className="text-gray-900  text-center">
                            {ambiente.ambientes.map((ambiente1) => (
                              <p key={ambiente1.id}>{ambiente1.nombre}</p>
                            ))}
                          </TableCell>
                          <TableCell className="text-gray-900  text-center">
                            {ambiente.ubicacion}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                {/* <Button color="primary" onPress={() => console.log(ambientes)}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
