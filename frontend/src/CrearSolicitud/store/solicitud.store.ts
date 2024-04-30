import { StateCreator, create } from "zustand";
import { reservasDB } from "../api";
import { ISimpleSolicitud } from "../interfaces/simple-solicitud";
import { toast } from "sonner";
import { isAxiosError } from "axios";


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
    id_materia:number, 
    id_grupo:number, 
    ambiente_id:number,
    docentes:number[],
    ) => Promise<void>;
  }
  
  const storeApi: StateCreator<SolicitudState & Actions> = (set) => ({
    solicitudes: [],
  
    getSolicitudes: async () => {
      try {
        const { data } = await reservasDB.get<ISolicitudesResponse>("/solicitud");
        
        
        set(() => ({
            solicitudes: data.solicitudes,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    createSolicitud: async (motivo,fecha_solicitud,hora_inicio, hora_fin, estado, numero_estudiantes,id_materia, id_grupo, ambiente_id, docentes) => {
      try {
        console.log(typeof motivo);
        console.log( motivo);
        console.log(typeof fecha_solicitud);
        console.log(fecha_solicitud);
        console.log(typeof hora_inicio);
        console.log( hora_inicio);
        console.log(typeof docentes);
        console.log( docentes);

        const { data } = await reservasDB.post<{ message: string }>("/solicitud/guardar", {
          motivo,
          fecha_solicitud,
          hora_inicio,
          hora_fin,
          estado,
          numero_estudiantes,
          id_materia, 
          id_grupo, 
          ambiente_id,
          docentes

        });
  
        toast.success("Enviado", { description: data.message });
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