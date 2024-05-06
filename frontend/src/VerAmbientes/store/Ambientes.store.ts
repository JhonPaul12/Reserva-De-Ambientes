import { StateCreator, create } from "zustand";
import { ISimpleAmbiente } from "../interfaces/simple-ambientes";
import { ambientesDB } from "../api/ambientesDB";
import { IAmbientesResponse } from "../interfaces/ambientes-response";

interface AmbienteState {
  ambientes: ISimpleAmbiente[];
}

interface Actions {
  getAmbientes: () => Promise<void>;
}

const storeApi: StateCreator<AmbienteState & Actions> = (set) => ({
  ambientes: [],

  getAmbientes: async () => {
    try {
      const { data } = await ambientesDB.get<IAmbientesResponse>("/ambiente");
      // Mapear la data a una lista de ISimpleAmbiente
      const ambientes: ISimpleAmbiente[] = Array.isArray(data)
        ? data.map((ambiente: ISimpleAmbiente) => ({
            id: ambiente.id,
            nombre: ambiente.nombre,
            tipo: ambiente.tipo,
            ubicacion: ambiente.ubicacion,
            capacidad: ambiente.capacidad,
            created_at: new Date(ambiente.created_at),
            updated_at: new Date(ambiente.updated_at),
          }))
        : [];

      // Actualizar el estado con la lista de ambientes
      set(() => ({
        ambientes: ambientes,
      }));
    } catch (error) {
      console.log(error);
    }
  },
});

export const useAmbienteStore = create<AmbienteState & Actions>()(storeApi);
