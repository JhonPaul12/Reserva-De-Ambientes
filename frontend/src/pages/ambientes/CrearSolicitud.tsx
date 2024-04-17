import React from 'react'
import { Toaster } from 'sonner';
import { FormSolicitud } from '../../components/index.ts';
import { SlideBar } from '../../components/index.ts';
import './AmbientesRegistroPage.css';
export const CrearSolicitud = () => {
  return (
    <div className='pag'>
        <Toaster
        position='top-right'
        richColors
        closeButton
        style={{position: "absolute"}}
      />

      <SlideBar/>
      <div className='formReg'>
        <h2 className="titulo" >CREAR SOLICITUD</h2>
        <FormSolicitud/>

      </div>
      
    </div>
  )
}
