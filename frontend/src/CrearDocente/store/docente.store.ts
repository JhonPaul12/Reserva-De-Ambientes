import { StateCreator, create } from "zustand";
import { ISimpleDocente } from "../../CrearSolicitud/interfaces/simple-docente";
import { reservasDB } from "../../RegistrarAmbientes/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";

interface DocenteState {
    docentes: ISimpleDocente[];
  }
  interface Actions {
    createDocente: (
        name: string,
        apellidos: string,
        telefono: string,
        codigo_sis: string,
        email: string,
        materias_grupos: object
    ) => Promise<void>;
    
    deleteAmbiente: ( id:number ) => Promise<void>;
  }
  
  const storeApi: StateCreator<DocenteState & Actions> = () => ({
    docentes: [],
  
    createDocente: async (inputName, inputApellidos, inputTel, inputCod, inputEmail, inputMaterias) => {
      try {
        const { data } = await reservasDB.post<{ message: string }>("/docente", {
            inputName,
            inputApellidos,
            inputTel,
            inputCod,
            inputEmail,
            inputMaterias
        });
        console.log(data);
        toast.success("Guardado", { description: data.message });
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error("El ambiente ya existe");
        }
      }
    },
    
    deleteAmbiente: async (id) => {
      try {
        const { data } = await reservasDB.delete<{ message: string }>(`/ambiente/${id}`);
        console.log(data);
        toast.success("Eliminado", { description: data.message });
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error("Error al eliminar el ambiente");
        }
      }
    },
  
  });
  
  export const useDocenteStore = create<DocenteState & Actions>()(storeApi);