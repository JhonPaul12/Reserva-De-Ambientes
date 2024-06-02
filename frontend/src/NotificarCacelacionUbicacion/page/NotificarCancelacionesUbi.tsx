import { Toaster } from 'sonner'
import { NotificarCanUbi } from '../components/NotificarCanUbi'

export const NotificarCancelacionesUbi = () => {
    return (
        <div style={{width:'100%'}}>
          <Toaster
          position="top-right"
          richColors
          closeButton
        />
          <NotificarCanUbi/>
        </div>
    )
}
