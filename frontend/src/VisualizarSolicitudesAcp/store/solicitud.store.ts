import { StateCreator, create } from "zustand";
import { reservasDB } from "../api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
// import { ISolicitudesResponse } from "../interfaces/solicitudes-response";
// import { ISimpleDocente } from "../interfaces/simple-deocente";
interface ISimpleDocente {
  id: number;
  name: string;
  apellidos: string;
  telefono: string;
  codigo_sis: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

interface ISolicitudesResponse {
  solicitudes: ISimpleDocente[];
}

interface SolicitudState {
  solicitudes: ISimpleDocente[];
}

interface Actions {
  getSolicitudes: () => Promise<void>;
  createSolicitud: (
    motivo: string,
    fecha: string,
    hora_inicio: string,
    hora_fin: string,
    estado: string,
    numero_estudiantes: number,
    ambiente_id: number
  ) => Promise<void>;
}

const storeApi: StateCreator<SolicitudState & Actions> = (set) => ({
  solicitudes: [],

  getSolicitudes: async () => {
    try {
      const { data } = await reservasDB.get<ISolicitudesResponse>(
        "/usuario/docentes"
      );

      console.log(data.solicitudes);
      set(() => ({
        solicitudes: data.solicitudes,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  /*
   getSolicitudes:async () => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/AllDocentes/`);
    set(() => ({
      solicitudes: respuesta.data,
  }));
  },*/
  createSolicitud: async (
    motivo,
    fecha_solicitud,
    hora_inicio,
    hora_fin,
    estado,
    numero_estudiantes,
    ambiente_id
  ) => {
    try {
      const { data } = await reservasDB.post<{ message: string }>(
        "/solicitud",
        {
          motivo,
          fecha_solicitud,
          hora_inicio,
          hora_fin,
          estado,
          numero_estudiantes,
          ambiente_id,
        }
      );

      toast.success("Guardado", { description: data.message });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Ocurrio un error", {
          description: error.response?.data.message,
        });
      }
    }
  },
});

export const useSolicitudStore = create<SolicitudState & Actions>()(storeApi);
