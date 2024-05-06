
import { Toaster } from 'sonner'
import { FormRA } from './components/FormRA'

export const RegistroAmbiente = () => {
  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Toaster
        position='top-right'
        richColors
        closeButton
        style={{position: "absolute"}}
      />
      
      <FormRA/>
    </div>
  )
}
