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
    estado: string,
    numero_estudiantes: number,
    id_materia:number, 
    grupos:number[], 
    ambiente_id:number,
    docentes:number[],
    periodos:number[]
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
    createSolicitud: async (motivo,fecha_solicitud, estado, numero_estudiantes,id_materia, grupos, ambiente_id, docentes, periodos) => {
      try {
        console.log(typeof motivo);
        console.log( motivo);
        console.log(typeof fecha_solicitud);
        console.log(fecha_solicitud);
        
        console.log(typeof estado);
        console.log(estado);
        console.log(typeof numero_estudiantes);
        console.log(numero_estudiantes);
        
        console.log(typeof id_materia);
        console.log(id_materia);
        console.log(typeof grupos[0]);
        console.log(grupos);
        console.log(typeof ambiente_id);
        console.log(ambiente_id);
        console.log(typeof docentes);
        console.log( docentes);
        console.log(typeof periodos);
        console.log( periodos);

        const { data } = await reservasDB.post<{ message: string }>("/solicitud/guardar", {
          motivo,
          fecha_solicitud,
          estado,
          numero_estudiantes,
          ambiente_id,
          docentes,
          id_materia, 
          grupos, 
          periodos

        });
        
        for (const periodo of periodos) {
        const dataToSend = {
          id: periodo,
          estado: 'Reservado',
        };
        const { data } = await reservasDB.put<{ message: string }>("/updateEstado", dataToSend);
      }
  
        toast.success("Su reserva fue creada exitosamente", { description: data.message });
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