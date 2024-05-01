import { toast } from "sonner";
import { StateCreator, create } from "zustand";
import { IAmbienteSimple } from "../interfaces/ambientes/ambiente-simple";
import { reservasDB } from "../api";
import { isAxiosError } from "axios";

interface AmbienteState {
  ambientes: IAmbienteSimple[];
}
interface Actions {
  createAmbiente: (
    nombre: string,
    tipo: string,
    ubicacion: string,
    capacidad: number
  ) => Promise<void>;
}

const storeApi: StateCreator<AmbienteState & Actions> = () => ({
  ambientes: [],

  createAmbiente: async (nombre, tipo, ubicacion, capacidad) => {
    try {
      const { data } = await reservasDB.post<{ message: string }>("/ambiente", {
        nombre,
        tipo,
        ubicacion,
        capacidad,
      });

      toast.success("Guardado", { description: data.message });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("El ambiente ya existe");
      }
    }
  },
});

export const useAmbienteStore = create<AmbienteState & Actions>()(storeApi);
