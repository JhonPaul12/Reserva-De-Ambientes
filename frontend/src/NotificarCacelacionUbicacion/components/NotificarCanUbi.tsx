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

export const NotificarCanUbi = () => {
  const [horaInicio, setHoraInicio] = useState<TimeInputValue | null>(null);
  const [horaFin, setHoraFin] = useState<TimeInputValue | null>(null);
  const [fecha, setFecha] = useState<CalendarDate | null>(null);
  const [ubicaciones, setUbicaciones] = useState<any>([]);
  const [ubicacionesSeleccionadas, setUbicacionesSeleccionadas] = useState<any>(
    []
  );
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
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/obtenerUbicacionDeSolicitudesAceptadas/${fechaStr}/${horaInicioStr}/${horaFinStr}`
      // );
      const response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/api/obtenerUbicacionDeSolicitudesAceptadas/" +
          fechaStr +
          "/" +
          horaInicioStr +
          "/" +
          horaFinStr
      );
      setUbicaciones(response.data);
    } catch (error) {
      setUbicaciones([]);
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
    console.log(ubicacionesSeleccionadas);
    const aulasArray = Array.from(ubicacionesSeleccionadas);
    console.log(aulasArray);
    if (aulasArray.length > 0) {
      await Promise.all(
        aulasArray.map(async (aula: any) => {
          try {
            // const response = await axios.post(
            //   `http://127.0.0.1:8000/api/cambiarEstadoPorUbicacionAmbienteYHorario/${aula}/${fechaStr}/${horaInicioStr}/${horaFinStr}`
            // );
            const response = await axios.post(
              import.meta.env.VITE_API_URL +
                "/api/cambiarEstadoPorUbicacionAmbienteYHorario/" +
                aula +
                "/" +
                fechaStr +
                "/" +
                horaInicioStr +
                "/" +
                horaFinStr
            );
            console.log(ids);
            const idsActualizados = response.data;
            setIDS(idsActualizados);
            console.log(idsActualizados);
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
    setUbicaciones([]);
    setUbicacionesSeleccionadas([]);
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
        <h2 className="text-3xl font-bold text-gray-900">
          Descripcion de la Notificacion
        </h2>
        <Input
          fullWidth
          labelPlacement="outside"
          label="Motivo"
          className={`my-5 px-5 ${window.innerWidth > 768 ? "" : "p-3"}`}
          value={tituloNotificacion}
          onChange={(e) => setTituloNotificacion(e.target.value)}
        />
        <Textarea
          labelPlacement="outside"
          fullWidth
          label="Descripcion del motivo"
          className={`my-5 px-5 ${window.innerWidth > 768 ? "" : "p-3"}`}
          value={descripcionNotificacion}
          onChange={(e) => setDescripcionNotificacion(e.target.value)}
        />
      </div>
      <div className="my-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Seleccionar Ubicaciones
        </h2>
        <div
          className={`flex flex-wrap justify-between items-center ${
            window.innerWidth > 768 ? "" : "px-2"
          }`}
        >
          <TimeInput
            className={`p-3 ${
              window.innerWidth > 768 ? "lg:w-1/4" : "md:w-auto"
            }`}
            labelPlacement="outside"
            label="Hora Inicio"
            value={horaInicio}
            onChange={setHoraInicio}
          />
          <TimeInput
            className={`p-3 ${
              window.innerWidth > 768 ? "lg:w-1/4" : "md:w-auto"
            }`}
            labelPlacement="outside"
            label="Hora Fin"
            value={horaFin}
            onChange={setHoraFin}
          />
          <DatePicker
            className={`p-3 ${
              window.innerWidth > 768 ? "lg:w-1/4" : "md:w-auto"
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
            className={`p-5 ${window.innerWidth > 768 ? "" : "p-3"}`}
            labelPlacement="outside"
            fullWidth
            label="Ubicaciones"
            placeholder="Seleccione las ubicaciones"
            selectionMode="multiple"
            onSelectionChange={setUbicacionesSeleccionadas}
          >
            {ubicaciones.length > 0
              ? ubicaciones.map((ubicacion: any) => (
                  <SelectItem key={ubicacion}>{String(ubicacion)}</SelectItem>
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
          >
            Notificar Ubicaciones
          </Button>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent className="">
          <ModalHeader>¿Esta seguro de cancelar las reservas?</ModalHeader>
          <ModalBody>
            Se cancelaran las reservas de las ubicaciones seleccionadas
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
