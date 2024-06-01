import { useState, useEffect } from "react";
import {
  Button,
  CalendarDate,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
  TimeInputValue,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "sonner";
import { IDS } from "../interfaces/IDS";

export const NotificarCanUbi = () => {
  const [horaInicio, setHoraInicio] = useState<TimeInputValue | null>(null);
  const [horaFin, setHoraFin] = useState<TimeInputValue | null>(null);
  const [fecha, setFecha] = useState<CalendarDate | null>(null);
  const [ubicaciones, setUbicaciones] = useState<any>([]);
  const [ubicacionesSeleccionadas, setUbicacionesSeleccionadas] = useState<any>([]);
  const [ids, setIDS] = useState<IDS[]>([]);
  const [descripcionNotificacion, setDescripcionNotificacion] =
    useState<string>("");
  const [tituloNotificacion, setTituloNotificacion] = useState<string>("");

  const handleChange = async () => {
    const horaInicioStr = horaInicio ? horaInicio.toString() : "";
    const horaFinStr = horaFin ? horaFin.toString() : "";
    const fechaStr = fecha ? fecha.toString() : "";

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/obtenerUbicacionDeSolicitudesAceptadas/${fechaStr}/${horaInicioStr}/${horaFinStr}`
      );
      setUbicaciones(response.data);
    } catch (error) {
      setUbicaciones([]);
      toast.error("No hay Aulas en la fecha");
    }
  };

  const cambiarEstado = async () => {
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
            const response = await axios.post(
              `http://127.0.0.1:8000/api/cambiarEstadoPorUbicacionAmbienteYHorario/${aula}/${fechaStr}/${horaInicioStr}/${horaFinStr}`
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
                      await axios.post(`http://127.0.0.1:8000/api/notificacion`, {
                        id_usuario: usuario,
                        id_solicitud: id.id_solicitud,
                        titulo: tituloNotificacion,
                        contenido: descripcionNotificacion,
                        visto: 1,
                      });
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
    <div className="container p-8">
      <div className="m-5">
        <h2 className="text-3xl font-bold text-gray-900">
          Descripcion de la Notificacion
        </h2>
        <form action="">
          <Input
            fullWidth
            labelPlacement="outside"
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
        <h2 className="text-3xl font-bold text-gray-900">Seleccionar Ubicaciones</h2>
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
        <div className="dbtn">
          <Button
            color="primary"
            variant="shadow"
            onClick={cambiarEstado}
            fullWidth
          >
            Notificar
          </Button>
        </div>
      </div>
    </div>
  );
};

