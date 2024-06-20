import { useState, useEffect } from "react";
import {
  Button,
  CalendarDate,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
  TimeInputValue,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "sonner";
interface IDS {
  id_solicitud: number;
  usuarios: [id_usuario: number, email: string];
}

export const NotificarCan = () => {
  const [horaInicio, setHoraInicio] = useState<TimeInputValue | null>(null);
  const [horaFin, setHoraFin] = useState<TimeInputValue | null>(null);
  const [fecha, setFecha] = useState<CalendarDate | null>(null);
  const [aulas, setAulas] = useState<any>([]);
  const [aulasSeleccionadas, setAulasSeleccionadas] = useState<any>([]);
  const [ids, setIDS] = useState<IDS[]>([]);
  const [descripcionNotificacion, setDescripcionNotificacion] =
    useState<string>("");
  const [tituloNotificacion, setTituloNotificacion] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelando, setCancelando] = useState(false);

  const handleChange = async () => {
    const horaInicioStr = horaInicio ? horaInicio.toString() : "";
    const horaFinStr = horaFin ? horaFin.toString() : "";
    const fechaStr = fecha ? fecha.toString() : "";

    try {
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/obtenerSolicitudesPorFechaYHorario2/${fechaStr}/${horaInicioStr}/${horaFinStr}`
      // );
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/api/obtenerSolicitudesPorFechaYHorario2/" +
          fechaStr +
          "/" +
          horaInicioStr +
          "/" +
          horaFinStr
      );
      setAulas(response.data);
    } catch (error) {
      setAulas([]);
      toast.error("No hay Aulas en la fecha");
    }
  };

  const cambiarEstado = async () => {
    setModalOpen(false);
    if (!tituloNotificacion || !descripcionNotificacion) {
      toast.error("El título y la descripción no pueden estar vacíos");
      return;
    }

    const horaInicioStr = horaInicio ? horaInicio.toString() : "";
    const horaFinStr = horaFin ? horaFin.toString() : "";
    const fechaStr = fecha ? fecha.toString() : "";

    const aulasArray = Array.from(aulasSeleccionadas);

    if (aulasArray.length > 0) {
      try {
        setCancelando(true);

        await Promise.all(
          aulasArray.map(async (aula: any) => {
            const response = await axios.post(
              import.meta.env.VITE_API_URL +
                "/api/cambiarEstadoPorNombreAmbienteYHorario/" +
                aula +
                "/" +
                fechaStr +
                "/" +
                horaInicioStr +
                "/" +
                horaFinStr
            );
            const idsActualizados = response.data;
            setIDS(idsActualizados);
            console.log(ids);
            await Promise.all(
              idsActualizados.map(async (id: any) => {
                await Promise.all(
                  id.usuarios.map(async (usuario: any) => {
                    try {
                      await axios.post(
                        // `http://127.0.0.1:8000/api/notificacion`,
                        import.meta.env.VITE_API_URL + "/api/notificacion",
                        {
                          id_usuario: usuario.id_usuario,
                          id_solicitud: id.id_solicitud,
                          titulo: tituloNotificacion,
                          contenido: descripcionNotificacion,
                          visto: 1,
                        }
                      );
                      await axios.post(
                        // `http://127.0.0.1:8000/api/enviarEmail`,
                        import.meta.env.VITE_API_URL + "/api/enviarEmail",
                        {
                          email: usuario.email,
                          title: tituloNotificacion,
                          description: descripcionNotificacion,
                        }
                      );
                    } catch (error) {
                      console.error(
                        `Error al enviar notificaciones ${aula}: ${error}`
                      );
                    }
                  })
                );
              })
            );
          })
        );

        toast.success("Notificaciones Enviadas");
      } catch (error) {
        toast.error("Error al cambiar estado de las aulas seleccionadas");
        console.error("Error al cambiar estado:", error);
      } finally {
        setCancelando(false);
      }
    }

    limpiarCampos();
  };

  const limpiarCampos = () => {
    setHoraInicio(null);
    setHoraFin(null);
    setFecha(null);
    setAulas([]);
    setAulasSeleccionadas([]);
    setTituloNotificacion("");
    setDescripcionNotificacion("");
  };

  useEffect(() => {
    if (horaInicio && horaFin && fecha) {
      handleChange();
    }
  }, [horaInicio, horaFin, fecha]);

  return (
    <div className="p-5">
      <div className="">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
          Descripcion de la Notificación
        </h2>
        <Input
          className={`my-5 sm:px-5 `}
          labelPlacement="outside"
          fullWidth
          label="Motivo"
          value={tituloNotificacion}
          onChange={(e) => setTituloNotificacion(e.target.value)}
        />
        <Textarea
          className={`my-5 sm:px-5 `}
          labelPlacement="outside"
          fullWidth
          label="Descripcion del motivo"
          value={descripcionNotificacion}
          onChange={(e) => setDescripcionNotificacion(e.target.value)}
        />
      </div>
      <div className="my-2">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
          Seleccionar Aulas
        </h2>
        <div
          className={`flex flex-wrap justify-between items-center ${
            window.innerWidth > 768 ? "" : "px-2"
          }`}
        >
          <TimeInput
            className={`sm:p-3 ${
              window.innerWidth > 768 ? "lg:w-1/4" : "md:w-auto"
            }`}
            labelPlacement="outside"
            label="Hora Inicio"
            value={horaInicio}
            onChange={setHoraInicio}
          />
          <TimeInput
            className={`sm:p-3 ${
              window.innerWidth > 768 ? "lg:w-1/4" : "md:w-auto"
            }`}
            labelPlacement="outside"
            label="Hora Fin"
            value={horaFin}
            onChange={setHoraFin}
          />
          <DatePicker
            className={`sm:p-3 ${
              window.innerWidth > 768 ? "lg:w-1/4" : "md:w-md"
            }`}
            labelPlacement="outside"
            label="Fecha"
            fullWidth
            value={fecha}
            onChange={setFecha}
          />
        </div>
        <div className="">
          <Select
            className={`sm:p-5 p-2`}
            labelPlacement="outside"
            fullWidth
            label="Aulas"
            placeholder="Seleccione las aulas"
            selectionMode="multiple"
            onSelectionChange={setAulasSeleccionadas}
          >
            {aulas.length > 0
              ? aulas.map((aula: any) => (
                  <SelectItem key={aula}>{String(aula)}</SelectItem>
                ))
              : null}
          </Select>
        </div>
        <div className="flex justify-end">
          <Button
            className={`my-2 ${window.innerWidth > 768 ? "" : "p-3"} ml-auto`}
            color="primary"
            variant="shadow"
            onClick={() => setModalOpen(true)}
            isLoading={cancelando}
          >
            {cancelando ? "Notificando..." : "Notificar Aulas"}
          </Button>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent className="">
          <ModalHeader>¿Esta seguro de cancelar las reservas?</ModalHeader>
          <ModalBody>
            Se cancelaran las reservas de las aulas seleccionadas
          </ModalBody>
          <ModalFooter className="">
            <Button color="danger" variant="shadow" onClick={cambiarEstado}>
              Sí, cancelar
            </Button>
            <Button onClick={() => setModalOpen(false)}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
