import React from 'react'
import './AmbientesRegistroPage.css';
import { SlideBar, Form } from '../../components/index.ts';
import { Toaster } from 'sonner';
export const AmbientesRegistroPage = () => {
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
      <h2 className="titulo" >REGISTRO DE AMBIENTE</h2>
      <Form/>
      </div>
    </div>
  )
}