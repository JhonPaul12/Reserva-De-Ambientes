import { toast } from "sonner";
import { StateCreator, create } from "zustand";
import { IAmbienteSimple } from '../../interfaces/ambientes/ambiente-simple';
import { IAmbientesResponse } from "../../interfaces/ambientes/ambientes-response";
import { reservasDB } from "../../api/reservasDB";
import { isAxiosError } from "axios";


interface AmbienteState{
    ambientes: IAmbienteSimple[];
}
interface Actions {
    createAmbiente:(nombre: string, capacidad: number, ubicacion: string, tipoAmbiente: string, horario: string[], token: string) => Promise<void>;
}

const storeApi : StateCreator<AmbienteState & Actions> = (set, get) =>({

    ambientes:[],

    createAmbiente:  async ( nombre, capacidad, ubicacion, tipoAmbiente, horario, token ) => {
        try{
            const { data } = await reservasDB.get<IAmbientesResponse>('/ambientes', {

            })
            toast.success('Guardado con exito')

        } catch ( error ){
            if( isAxiosError(error)){
                toast.error('Ocurrio un error')
            }
        }
    }

})

export const useAmbienteStore = create<AmbienteState & Actions>()(
    storeApi,

)