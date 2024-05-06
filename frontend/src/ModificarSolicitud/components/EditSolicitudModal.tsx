import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Calendario } from "./Calendario";
import dayjs, { Dayjs } from "dayjs";
export interface Materia {
  id: number;
  nombre_materia: string;
  user_id: number;
}
export const EditSolicitudModal = ({ solicitud }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState();
  const [selectedGrupo, setSelectedGrupo] = useState();
  const [ambientes, setAmbientes] = useState([]);
  const [selectedAmbiente, setSelectedAmbiente] = useState();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  useEffect(() => {
    getMaterias();
    getAmbientes();
    setSelectedMateria(solicitud.id_materia.toString());
    setSelectedGrupo(solicitud.id_grupo.toString());
    setSelectedAmbiente(solicitud.ambiente_id.toString());
    setSelectedDate(solicitud.fecha_solicitud ? dayjs(solicitud.fecha) : null);
  }, []);

  const getMaterias = async () => {
    fetch(`http://127.0.0.1:8000/api/usuario/materias/${solicitud.docente.id}`)
      .then((response) => response.json())
      .then((data) => {
        setMaterias(data);
        // Si hay materias disponibles, también obtenemos los grupos para la primera materia
        if (data.length > 0) {
          getGrupos(data[0].id); // Obtener grupos para la primera materia
        }
      });
  };

  const getAmbientes = async () => {
    fetch(`http://127.0.0.1:8000/api/ambiente/`)
      .then((response) => response.json())
      .then((data) => {
        setAmbientes(data);
      });
  };

  const getGrupos = async (materiaId: number) => {
    fetch(
      `http://127.0.0.1:8000/api/docentes/${solicitud.docente.id}/${materiaId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGrupos(data);
        console.log(data);
      });
  };

  const handleMateriaChange = (event) => {
    const materiaId = event.target.value;
    setSelectedMateria(materiaId);
    // Obtener los grupos para la nueva materia seleccionada
    getGrupos(materiaId);
    // Reiniciar el valor de selectedGrupo al cambiar de materia
  };

  const handleGrupoChange = (event) => {
    setSelectedGrupo(event.target.value);
  };

  const handleAmbienteChange = (event) => {
    setSelectedAmbiente(event.target.value);
  };

  const guardar = async () => {
    console.log("Materia seleccionada:", selectedMateria);
    console.log("Grupo seleccionado:", selectedGrupo);
    console.log("Ambiente seleccionado:", selectedAmbiente);
  };
  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };
  return (
    <>
      <Button className="bg-primary text-center text-white" onPress={onOpen}>
        Editar Solicitud
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Editar Solicitud
              </ModalHeader>
              <ModalBody>
                {/* Sector de docentes */}
                <p>Docente: {solicitud.docente.nombre}</p>
                {/* Sector de Materias */}
                <p>Materia: </p>
                <select
                  value={selectedMateria}
                  onChange={handleMateriaChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {materias.map((materia) => (
                    <option key={materia.id} value={materia.id}>
                      {materia.nombre_materia}
                    </option>
                  ))}
                </select>
                {/* Sector de Motivo */}
                <Input label="Motivo" placeholder={solicitud.motivo}></Input>
                {/* Sector de Estudiantes */}
                <Input
                  type="number"
                  label="Numero de Estudiantes"
                  placeholder={solicitud.numero_estudiantes.toString()}
                />

                {/* Sector de grupo */}
                <p>Grupo: </p>
                <select
                  value={selectedGrupo}
                  onChange={handleGrupoChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {grupos.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                      {grupo.grupo}
                    </option>
                  ))}
                </select>
                {/* Sector del Ambiente */}
                <p>Ambiente: </p>
                <select
                  value={selectedAmbiente}
                  onChange={handleAmbienteChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {ambientes.map((ambiente) => (
                    <option key={ambiente.id} value={ambiente.id}>
                      {ambiente.nombre}
                    </option>
                  ))}
                </select>
                {/* Sector del calendario */}
                <Calendario
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={guardar}>
                  Guardar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
