import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

interface Docente {
  id: number;
  name: string;
  apellidos: string;
  telefono: string;
  email: string;
  codigo_sis: string;
}

export const ModificarDocenteModal = ({
  docente,
  onDocenteUpdate,
}: {
  docente: Docente;
  onDocenteUpdate: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [inputName, setInputName] = useState(`${docente.name}`);
  const [inputApellidos, setInputApellidos] = useState(`${docente.apellidos}`);
  const [inputTel, setInputTel] = useState(`${docente.telefono}`);
  const [inputEmail, setInputEmail] = useState(`${docente.email}`);
  const [inputCod, setInputCod] = useState(`${docente.codigo_sis}`);

  const onImputNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length === 0) {
      setInputName(docente.name);
      console.log(inputValue.value);
    } else {
      setInputName(inputValue.value);
    }
  };
  const onImputApellidos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length === 0) {
      setInputApellidos(docente.apellidos);
    } else {
      setInputApellidos(inputValue.value);
    }
  };
  const onImputTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length === 0) {
      setInputTel(docente.telefono);
    } else {
      setInputTel(inputValue.value);
    }
  };

  const onImputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length === 0) {
      setInputEmail(docente.email);
    } else {
      setInputEmail(inputValue.value);
    }
  };
  const onImputCod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target as HTMLInputElement;
    if (inputValue.value.length === 0) {
      setInputCod(docente.codigo_sis);
    } else {
      setInputCod(inputValue.value);
    }
  };

  const validarTelefono = (telefono: string) => {
    return /^\d{8}$/.test(telefono);
  };

  const validarCodigoSIS = (codigoSIS: string) => {
    return /^\d{9}$/.test(codigoSIS);
  };

  const guardar = async () => {
    if (!validarTelefono(inputTel)) {
      toast.error("El número de telefono debe ser de 8 dígitos.");
      return;
    }
    if (!validarCodigoSIS(inputCod)) {
      toast.error("El código SIS debe ser de 9 dígitos.");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      toast.error("El formato del email es incorrecto.");
      return;
    }
    if (
      inputName === docente.name &&
      inputApellidos === docente.apellidos &&
      inputTel === docente.telefono &&
      inputEmail === docente.email &&
      inputCod === docente.codigo_sis
    ) {
      toast.info("No se realizaron cambios.");
    } else {
      try {
        const response = await fetch(
          // `http://127.0.0.1:8000/api/usuario/${docente.id}`,
          import.meta.env.VITE_API_URL + "/api/usuario/" + docente.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: inputName,
              apellidos: inputApellidos,
              telefono: inputTel,
              email: inputEmail,
              codigo_sis: inputCod,
            }),
          }
        );
        toast.success("Se han guardado los cambios.");
        onDocenteUpdate();
        if (!response.ok) {
          throw new Error("Error al guardar los cambios.");
        }
        onClose();
      } catch (error) {
        toast.error("Hubo un problema al guardar los cambios.");
        console.error("Error:", error);
      }
      onClose();
    }
  };

  return (
    <>
      <Button color="warning" onPress={onOpen}>
        Editar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Editar Docente</h1>
              </ModalHeader>
              <ModalBody>
                <label className="text-ms text-gray-900">Nombres:</label>
                <Input
                  type="text"
                  name="nombre"
                  className="w-full"
                  placeholder={docente.name}
                  value={inputName}
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    padding: "8px",
                  }}
                  maxLength={30}
                  onChange={onImputNombre}
                ></Input>
                <label className="text-ms text-gray-900">Apellidos:</label>
                <Input
                  type="text"
                  name="apellidos"
                  value={inputApellidos}
                  className="w-full"
                  placeholder={docente.apellidos}
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    padding: "8px",
                  }}
                  maxLength={30}
                  onChange={onImputApellidos}
                ></Input>
                <label className="text-ms text-gray-900">Teléfono:</label>
                <Input
                  type="number"
                  name="telefono"
                  value={inputTel}
                  className="w-full"
                  placeholder={docente.telefono}
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    padding: "8px",
                  }}
                  onChange={onImputTel}
                ></Input>
                <label className="text-ms text-gray-900">Email:</label>
                <Input
                  type="email"
                  name="email"
                  value={inputEmail}
                  className="w-full"
                  placeholder={docente.email}
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    padding: "8px",
                  }}
                  maxLength={30}
                  onChange={onImputEmail}
                ></Input>
                <label className="text-ms text-gray-900">Codigo SIS:</label>
                <Input
                  type="number"
                  name="codigo SIS"
                  value={inputCod}
                  className="w-full"
                  placeholder={docente.codigo_sis}
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    padding: "8px",
                  }}
                  onChange={onImputCod}
                ></Input>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={guardar}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
