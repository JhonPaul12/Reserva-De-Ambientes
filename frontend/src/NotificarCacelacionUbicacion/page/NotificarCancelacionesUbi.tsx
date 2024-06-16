import { Toaster } from 'sonner'
import { NotificarCanUbi } from '../components/NotificarCanUbi'

export const NotificarCancelacionesUbi = () => {
    return (
        <div className='w-full' style={{overflowY:'auto'}}>
          <Toaster
          position="top-right"
          richColors
          closeButton
        />
          <NotificarCanUbi/>
        </div>
    )
}
