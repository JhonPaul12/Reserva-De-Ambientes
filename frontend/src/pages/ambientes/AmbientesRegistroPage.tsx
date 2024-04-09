import React from 'react'
import './AmbientesRegistroPage.css';
import { SlideBar, Form } from '../../components/index.ts';
export const AmbientesRegistroPage = () => {
  return (
    <div className='pag'>
      <SlideBar/>
      <div className='formReg'>
      <h2 className="titulo" >REGISTRO DE AMBIENTE</h2>
      <Form/>
      </div>
    </div>
  )
}