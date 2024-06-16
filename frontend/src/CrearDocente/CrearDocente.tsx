
import { Toaster } from 'sonner'
import { FormCrearDocente } from './components/FormCrearDocente'

export const CrearDocente = () => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ position: "absolute" }}
      />
        <FormCrearDocente/>
    </div>
  )
}
