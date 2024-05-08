import { StateCreator, create } from "zustand";
import { ISimpleRegla } from "../interface/regla-simple";
//import { IReglasResponse } from "../interface/reglas-response";
import { ReglasDB } from "./RegasDB";
import { isAxiosError } from "axios";
import { toast } from "sonner";

interface ReglaState {
  reglas: ISimpleRegla[];
}

interface Actions {
  crearRegla: (
    ambiente_id: number,
    fecha_inicial: string,
    fecha_final: string
  ) => Promise<void>;
}

const storeApi: StateCreator<ReglaState & Actions> = () => ({
  reglas: [],
  crearRegla: async (ambiente_id, fecha_inicial, fecha_final) => {
    try {
      const { data } = await ReglasDB.post<ISimpleRegla>("/regla", {
        ambiente_id,
        fecha_inicial,
        fecha_final,
      });
      console.log(data);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data.message === "The given data was invalid.") {
          toast.error("El ambiente seleccionado ya cuenta con una regla");
        }
        //toast.error(error.response?.data.message);
      }
    }
  },
});

export const useReglaStore = create<ReglaState & Actions>()(storeApi);
