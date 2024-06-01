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
import "./esstilosNotificar.css";
import axios from "axios";
import { toast } from "sonner";
import { IDS } from "../interface/IDS";

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

  const handleChange = async () => {
    const horaInicioStr = horaInicio ? horaInicio.toString() : "";
    const horaFinStr = horaFin ? horaFin.toString() : "";
    const fechaStr = fecha ? fecha.toString() : "";

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/obtenerSolicitudesPorFechaYHorario2/${fechaStr}/${horaInicioStr}/${horaFinStr}`
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
    console.log(aulasSeleccionadas);
    const aulasArray = Array.from(aulasSeleccionadas);
    console.log(aulasArray);
    if (aulasArray.length > 0) {
      await Promise.all(
        aulasArray.map(async (aula: any) => {
          try {
            const response = await axios.post(
              `http://127.0.0.1:8000/api/cambiarEstadoPorNombreAmbienteYHorario/${aula}/${fechaStr}/${horaInicioStr}/${horaFinStr}`
            );
            console.log(ids);
            const idsActualizados = response.data;
            setIDS(idsActualizados);
            console.log(idsActualizados);
            await Promise.all(
              idsActualizados.map(async (id: any) => {
                await Promise.all(
                  id.id_usuario.map(async (usuario: any) => {
                    try {
                      await axios.post(
                        `http://127.0.0.1:8000/api/notificacion`,
                        {
                          id_usuario: usuario,
                          id_solicitud: id.id_solicitud,
                          titulo: tituloNotificacion,
                          contenido: descripcionNotificacion,
                          visto: 1,
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
          } catch (error) {
            console.error(`Error al cambiar estado del aula ${aula}: ${error}`);
          }
        })
      );
      toast.success("Notificaciones Enviadas");
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
    <div className="container p-8">
      <div className="m-5">
        <h2 className="text-3xl font-bold text-gray-900">
          Descripcion de la Notificacion
        </h2>
        <form action="">
          <Input
            labelPlacement="outside"
            fullWidth
            label="Motivo"
            className="my-2 p-2"
            value={tituloNotificacion}
            onChange={(e) => setTituloNotificacion(e.target.value)}
          />
          <Textarea
            labelPlacement="outside"
            fullWidth
            placeholder=""
            label="Descripcion del motivo"
            className="p-2"
            value={descripcionNotificacion}
            onChange={(e) => setDescripcionNotificacion(e.target.value)}
          />
        </form>
      </div>
      <div className="m-5">
        <h2 className="text-3xl font-bold text-gray-900">Seleccionar Aulas</h2>
        <div className="container-aulas">
          <TimeInput
            className="m-5"
            labelPlacement="outside"
            label="Hora Inicio"
            value={horaInicio}
            onChange={setHoraInicio}
          />
          <TimeInput
            className="m-5"
            labelPlacement="outside"
            label="Hora Fin"
            value={horaFin}
            onChange={setHoraFin}
          />
          <DatePicker
            className="m-5"
            labelPlacement="outside"
            label="Fecha"
            fullWidth
            value={fecha}
            onChange={setFecha}
          />
        </div>
        <Select
          className="m-5"
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
        <div className="dbtn">
          <Button
            color="primary"
            variant="shadow"
            onClick={() => setModalOpen(true)}
            fullWidth
          >
            Notificar Aulas
          </Button>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent className="">
          <ModalHeader>¿Esta seguro de cancelar las reservas?</ModalHeader>
          <ModalBody>Se cancelaran</ModalBody>
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
