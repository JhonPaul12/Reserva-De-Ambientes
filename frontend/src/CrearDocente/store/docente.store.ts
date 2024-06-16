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
        materias_grupos: number[][]
    ) => Promise<void>;
    
    deleteAmbiente: ( id:number ) => Promise<void>;
  }
  
  const storeApi: StateCreator<DocenteState & Actions> = () => ({
    docentes: [],
  
    createDocente: async (name, apellidos, telefono, codigo_sis, email, materias_grupos) => {
      try {
        const { data } = await reservasDB.post<{ message: string }>("/docente", {
          name,
          apellidos,
          telefono,
          codigo_sis,
          email,
          materias_grupos
        });
        console.log(data);
        toast.success("Guardado", { description: data.message });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error("El docente ya existe", { description: error.message });
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