import { StateCreator, create } from "zustand";
import { ISolicitudResponse } from "../interfaces/solicitud-response";
import { solicitudesDB } from "../api/solicitudesDB";
import { ISimpleSolicitud } from "../interfaces/simple-solicitud";

interface SolicitudState {
  solicitudes: ISimpleSolicitud[];
}

interface Actions {
  getSolicitudes: () => Promise<void>;
}

const storeApi: StateCreator<SolicitudState & Actions> = (set) => ({
  solicitudes: [],

  getSolicitudes: async () => {
    try {
      const { data } = await solicitudesDB.get<ISolicitudResponse>(
        "/solicitud"
      );
      // console.log("Datos de data");
      // console.log(data);

      // Verifica si data.solicitudes es un arreglo
      if (!Array.isArray(data.solicitudes)) {
        console.log(
          "El formato de los datos recibidos no es un arreglo de solicitudes."
        );
        return;
      }

      // Mapea los datos de data.solicitudes a objetos ISimpleSolicitud
      const solicitudes: ISimpleSolicitud[] = data.solicitudes.map(
        (solicitud: ISimpleSolicitud) => {
          return {
            id: solicitud.id,
            motivo: solicitud.motivo,
            fecha_solicitud: new Date(solicitud.fecha_solicitud),
            hora_inicio: solicitud.hora_inicio,
            hora_fin: solicitud.hora_fin,
            estado: solicitud.estado,
            numero_estudiantes: solicitud.numero_estudiantes,
            ambiente_id: solicitud.ambiente_id,
            created_at: new Date(solicitud.created_at),
            updated_at: new Date(solicitud.updated_at),
            ambiente: {
              id: solicitud.ambiente.id,
              nombre: solicitud.ambiente.nombre,
              tipo: solicitud.ambiente.tipo,
              ubicacion: solicitud.ambiente.ubicacion,
              capacidad: solicitud.ambiente.capacidad,
              created_at: new Date(solicitud.ambiente.created_at),
              updated_at: new Date(solicitud.ambiente.updated_at),
            },
          };
        }
      );
      // console.log("solicitudes");
      // console.log(solicitudes);
      set(() => ({
        solicitudes: solicitudes,
      }));
    } catch (error) {
      console.log(error);
    }
  },
});

export const useSolicitudesStore = create<SolicitudState & Actions>()(storeApi);
