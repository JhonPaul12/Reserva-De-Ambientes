import React, { useState } from 'react';
import { toast } from 'sonner';
import './FormSolicitud.css';
import { Calendario } from '../index.ts';


export const FormSolicitud = () => {
    const [inputMotivo, setInputMotivo] = useState('');
    const [inputNEst, setInputNEst] = useState('');
    const [buttonSave, setInputSave] = useState(false);
    const [mostrarSelect, setMostrarSelect] = useState(false);


    const onInputChangeMotivo = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <30) {
          setInputMotivo(inputValue);
          console.log(inputValue);
        } else {
          toast.error('El motivo debe tener como maximo 150 caracteres');
          console.log("El motivo debe tener como maximo 150 caracteres");
        }
      }
      const onInputChangeNEst = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <6) {
          if (!isNaN(inputValue)) {
            setInputNEst(inputValue);
            console.log(inputValue);
          } else {
            toast.error('El numero de estudiantes debe expresarse numericamente');
            console.log("El numero de estudiantes debe expresarse numericamente");
          }
        } else {
          toast.error('El numero de estudiantes no debe superar los 5 caracteres');
          console.log("El numero de estudiantes no debe superar los 5 caracteres");
        }
      }

      const onInputChangeSave = (event) => {
        event.preventDefault();
        if (inputMotivo !== '' && inputNEst !== '') {
          setInputSave(true);
          console.log('true');
        } else {
          toast.error('El motivo y el nro de estudiantes son obligatorios');
          console.log('l motivo y el nro de estudiantes son obligatorios');
        }
    }

    const handleClick = (event) => {
      event.preventDefault();
      setMostrarSelect(!mostrarSelect);
    }


  return (
    <div className='contenedor'>
    <form className='formSol'>
        <div className="columnaSol">
        <label>Docente:</label>
        <br />
        <span style={{marginRight:'50px'}}>Nombre del docente</span>
        <button 
          onClick={handleClick}
          className='more'>Añadir docente</button>
          {mostrarSelect && (
            <select
            className='selectSoli'>
            </select>
          )}
          <br />
          <label>Materia:</label>
          <br />
          <select 
            className='selectSoli'
          >

          </select>
        <br />
        <label>Motivo:</label>
        <br />
        <textarea 
            value={inputMotivo}
            className='textASoli'
            style={{
              fontSize: '16px', 
              padding: '20px', 
    
            }}
            onChange={onInputChangeMotivo}
          />
        <br />
        <label>Nro Est:</label>
        <input  
            type='number'
            value={inputNEst}
            className='solicitud'
            style={{
              fontSize: '10px', 
              padding: '20px', 
              marginLeft: '10px'
            }}
            onChange={onInputChangeNEst}
          />
          <br />
          <label>Grupo:</label>
          <select 
            className='selectSoli'
          >

          </select>
        </div>
        <div className="columnaSol">
            <label>Ambiente:</label>
            <br />
            <select 
              className='selectSoli'
            >

            </select>
            <br />
            <label>Fecha de reserva:</label>
            <br />
            <Calendario/>
            <br />
            <label>Horario de inicio:</label>
            <br />
            <select 
              className='selectSoli'
            >

            </select>
            <br />
            <label>Horario de fin:</label>
            <br />
            <select 
              className='selectSoli'
            >

            </select>
            <br />
            <div className='opcionsSoli'>
            <button className="cancelar" >Cancelar</button>
            <button 
              className="guardar"
              onClick={onInputChangeSave}>Guardar</button>
            </div>
        </div>

    </form>
  </div>
  )
}


