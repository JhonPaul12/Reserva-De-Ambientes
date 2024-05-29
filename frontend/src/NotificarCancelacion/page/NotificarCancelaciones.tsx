import { Toaster } from "sonner"
import { NotificarCan } from "../components/NotificarCan"

export const NotificarCancelaciones = () => {
  return (
      <div style={{width:'100%'}}>
        <Toaster
        position="top-right"
        richColors
        closeButton
      />
        <NotificarCan/>
      </div>
  )
}
