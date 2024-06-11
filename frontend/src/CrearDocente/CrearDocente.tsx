
import { Toaster } from 'sonner'
import { FormCrearDocente } from './components/FormCrearDocente'

export const CrearDocente = () => {
  return (
    <div className="mt-10 sm:mx-auto w-4/5 max-w-screen-md">
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
