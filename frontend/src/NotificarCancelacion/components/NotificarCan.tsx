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
            await axios.post(
              `http://127.0.0.1:8000/api/cambiarEstadoPorNombreAmbienteYHorario/${aula}/${fechaStr}/${horaInicioStr}/${horaFinStr}`
            );
          } catch (error) {
            console.error(`Error al cambiar estado del aula ${aula}: ${error}`);
          }
        })
      );
      toast.success("Notificaciones Enviadas");
    }
    notificar();
    limpiarCampos();
  };

  const notificar = async () => {
    const horaInicioStr = horaInicio ? horaInicio.toString() : "";
    const horaFinStr = horaFin ? horaFin.toString() : "";
    const fechaStr = fecha ? fecha.toString() : "";
    const aulasArray = Array.from(aulasSeleccionadas);
    console.log("despues de notificar")
    console.log(aulasArray);
    await Promise.all(
      aulasArray.map(async (aula: any) => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/mostrarSolicitudPorNombreAmbienteYHorario/${aula}/${fechaStr}/${horaInicioStr}/${horaFinStr}`
          );
          setIDS(response.data);
          console.log(response.data);
        } catch (error) {
          setIDS([]);
          toast.error("Error al obtener IDS");
        }
      })
    );
  }

  const limpiarCampos = () => {
    setHoraInicio(null);
    setHoraFin(null);
    setFecha(null);
    setAulas([]);
    setAulasSeleccionadas([]);
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
          />
          <Textarea
            labelPlacement="outside"
            fullWidth
            placeholder=""
            label="Descripcion del motivo"
            className="p-2"
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
