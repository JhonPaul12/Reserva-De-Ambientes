import { StateCreator, create } from "zustand";
import { reservasDB } from "../api";
import { ISimpleDocente } from "../interfaces/simple-docente";
import { IDocentesResponse } from "../interfaces/docentes-response";

interface DocenteState {
    docentes: ISimpleDocente[];
  }
  
  interface Actions {
    getDocentes: () => Promise<void>;
  }
  
  const storeApi: StateCreator<DocenteState & Actions> = (set) => ({
    docentes: [],
  
    getDocentes: async () => {
      try {
        const { data } = await reservasDB.get<IDocentesResponse>("/usuario");
        console.log(data);
        console.log(data.docentes);
        set(() => ({
            docentes: data.docentes,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    
  });
  
  export const useDocenteStore = create<DocenteState & Actions>()(storeApi);