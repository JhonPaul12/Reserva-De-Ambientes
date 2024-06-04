import { Toaster } from 'sonner'
import { Header } from '../components/Header'

export const HeaderUsers = () => {
  return (
    <div>
        <Toaster
        position="top-right"
        richColors
        closeButton
      />
        <Header/>
    </div>
  )
}
