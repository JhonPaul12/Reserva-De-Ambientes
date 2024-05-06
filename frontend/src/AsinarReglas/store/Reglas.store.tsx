import { StateCreator, create } from "zustand";
import { ISimpleRegla } from "../interface/regla-simple";
//import { IReglasResponse } from "../interface/reglas-response";
import { ReglasDB } from "./RegasDB";
import { isAxiosError } from "axios";

interface ReglaState {
  reglas: ISimpleRegla[];
}

interface Actions {
  crearRegla: (
    ambiente_id: number,
    fecha_inicial: Date,
    fecha_final: Date
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
        console.log(error.response?.data.message);
      }
    }
  },
});

export const useReglaStore = create<ReglaState & Actions>()(storeApi);
