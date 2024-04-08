import React from 'react'
import './AmbientesRegistroPage.css';
import SlideBar from '../../components/ui/SlideBar.tsx';
import Form from '../../components/ui/Form.tsx';
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
export default AmbientesRegistroPage;