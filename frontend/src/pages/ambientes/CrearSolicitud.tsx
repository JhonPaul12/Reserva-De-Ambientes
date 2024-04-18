import React from 'react'
import { Toaster } from 'sonner';
import { FormSolicitud } from '../../components/index.ts';
import './CrearSolicitud.css';
export const CrearSolicitud = () => {
  return (
    <div className='pagCrearSol'>
        <Toaster
        position='top-right'
        richColors
        closeButton
        style={{position: "absolute"}}
      />
      <div className='formReg'>
        <h2 className="titulo" >CREAR SOLICITUD</h2>
        <FormSolicitud/>
      </div>
      
    </div>
  )
}
