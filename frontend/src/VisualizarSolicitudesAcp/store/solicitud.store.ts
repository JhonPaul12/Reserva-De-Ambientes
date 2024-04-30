import { StateCreator, create } from "zustand";
import { reservasDB } from "../api";
import { ISimpleSolicitud } from "../interfaces/simple-solicitud";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { ISolicitudesResponse } from "../interfaces/solicitudes-response";


interface SolicitudState {
    solicitudes: ISimpleSolicitud[];
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
    ambiente_id:number,
    ) => Promise<void>;
  }
  
  const storeApi: StateCreator<SolicitudState & Actions> = (set) => ({
    solicitudes: [],
  
    getSolicitudes: async () => {
      try {
        const { data } = await reservasDB.get<ISolicitudesResponse>("/solicitud");
        
        console.log(data.solicitudes);
        set(() => ({
            solicitudes: data.solicitudes,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    createSolicitud: async (motivo,fecha_solicitud,hora_inicio, hora_fin, estado, numero_estudiantes,ambiente_id) => {
      try {
        const { data } = await reservasDB.post<{ message: string }>("/solicitud", {
          motivo,
          fecha_solicitud,
          hora_inicio,
          hora_fin,
          estado,
          numero_estudiantes,
          ambiente_id

        });
  
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